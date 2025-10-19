import { type NextRequest, NextResponse } from "next/server"
import { promisify } from "util"
import { inflate as zlibInflate } from "zlib"
import { PDFDocument } from "pdf-lib"
import { v2 as cloudinary } from 'cloudinary';

const inflate = promisify(zlibInflate)

export const maxDuration = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF." }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
    const pageCount = pdfDoc.getPageCount()

    const images = await extractImagesFromPDF(pdfDoc, buffer)

    const extractedFiles: { filename: string; url: string; mimeType: string }[] = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const filename = `${file.name.replace(".pdf", "")}_image_${i + 1}.${image.ext}`
      const mimeType = `image/${image.ext === "jpg" ? "jpeg" : image.ext}`

      try {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "pdf_extracted_images",
              public_id: filename.replace(/\.[^/.]+$/, ""),
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result as { secure_url: string })
            }
          ).end(image.data)
        })

        extractedFiles.push({
          filename,
          url: uploadResult.secure_url,
          mimeType,
        })

      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError)
      }
    }

    return NextResponse.json({
      message:
        images.length === 0
          ? "PDF processed successfully, but no images were found."
          : `Successfully extracted ${extractedFiles.length} image(s).`,
      files: extractedFiles,
      debug: {
        totalPages: pageCount,
        totalImagesFound: images.length,
        successfulProcessing: extractedFiles.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error processing PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

async function extractImagesFromPDF(
  pdfDoc: any,
  buffer: Buffer,
): Promise<Array<{ data: Buffer; ext: string; width?: number; height?: number }>> {
  const images: Array<{ data: Buffer; ext: string; width?: number; height?: number }> = []

  try {
    const indirectObjects = pdfDoc.context.indirectObjects
    let objectsChecked = 0
    let imagesFoundInObjects = 0

    for (const [ref, obj] of indirectObjects.entries()) {
      objectsChecked++

      try {
        if (obj && typeof obj === "object" && "dict" in obj && "contents" in obj) {
          const stream = obj as any
          const dict = stream.dict

          if (dict && dict.get) {
            const subtype = dict.get(pdfDoc.context.obj("Subtype"))

            if (subtype && subtype.toString() === "/Image") {
              imagesFoundInObjects++

              try {
                const width = dict.get(pdfDoc.context.obj("Width"))
                const height = dict.get(pdfDoc.context.obj("Height"))
                const filter = dict.get(pdfDoc.context.obj("Filter"))
                const colorSpace = dict.get(pdfDoc.context.obj("ColorSpace"))
                const imageData = stream.contents

                const filterStr = filter ? filter.toString() : ""

                if (filterStr.includes("DCTDecode")) {
                  const format = detectImageFormat(imageData)
                  if (format === "jpg") {
                    images.push({
                      data: Buffer.from(imageData),
                      ext: "jpg",
                      width: width ? Number(width.toString()) : undefined,
                      height: height ? Number(height.toString()) : undefined,
                    })
                  }
                } else if (filterStr.includes("FlateDecode")) {
                  try {
                    const decompressed = await inflate(Buffer.from(imageData))
                    const pngData = await convertRawToPNG(
                      decompressed,
                      width ? Number(width.toString()) : 0,
                      height ? Number(height.toString()) : 0,
                      colorSpace?.toString(),
                    )

                    if (pngData) {
                      images.push({
                        data: pngData,
                        ext: "png",
                        width: width ? Number(width.toString()) : undefined,
                        height: height ? Number(height.toString()) : undefined,
                      })
                    }
                  } catch (decompressError) {
                  }
                } else if (filterStr.includes("JPXDecode")) {
                  images.push({
                    data: Buffer.from(imageData),
                    ext: "jp2",
                    width: width ? Number(width.toString()) : undefined,
                    height: height ? Number(height.toString()) : undefined,
                  })
                } else if (!filter || filterStr === "/null") {
                  try {
                    const pngData = await convertRawToPNG(
                      imageData,
                      width ? Number(width.toString()) : 0,
                      height ? Number(height.toString()) : 0,
                      colorSpace?.toString(),
                    )

                    if (pngData) {
                      images.push({
                        data: pngData,
                        ext: "png",
                        width: width ? Number(width.toString()) : undefined,
                        height: height ? Number(height.toString()) : undefined,
                      })
                    }
                  } catch (convertError) {
                  }
                }
              } catch (imageError) {
              }
            }
          }
        }
      } catch (objError) {
      }
    }

    if (images.length === 0) {
      const binaryImages = extractImagesByPattern(buffer)
      images.push(...binaryImages)
    }
  } catch (error) {
  }

  return images
}

async function convertRawToPNG(
  rawData: Uint8Array,
  width: number,
  height: number,
  colorSpace?: string,
): Promise<Buffer | null> {
  try {
    const { createCanvas } = await import("canvas")

    let channels = 3
    let isGrayscale = false

    if (colorSpace?.includes("DeviceGray") || colorSpace?.includes("Gray")) {
      channels = 1
      isGrayscale = true
    } else if (colorSpace?.includes("DeviceCMYK") || colorSpace?.includes("CMYK")) {
      channels = 4
    } else if (colorSpace?.includes("DeviceRGB") || colorSpace?.includes("RGB")) {
      channels = 3
    }

    const expectedSize = width * height * channels

    if (rawData.length < expectedSize * 0.9 || rawData.length > expectedSize * 1.1) {
      return null
    }

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")
    const imageData = ctx.createImageData(width, height)

    if (isGrayscale) {
      for (let i = 0; i < width * height; i++) {
        const gray = rawData[i]
        imageData.data[i * 4] = gray
        imageData.data[i * 4 + 1] = gray
        imageData.data[i * 4 + 2] = gray
        imageData.data[i * 4 + 3] = 255
      }
    } else if (channels === 3) {
      for (let i = 0; i < width * height; i++) {
        imageData.data[i * 4] = rawData[i * 3]
        imageData.data[i * 4 + 1] = rawData[i * 3 + 1]
        imageData.data[i * 4 + 2] = rawData[i * 3 + 2]
        imageData.data[i * 4 + 3] = 255
      }
    } else if (channels === 4) {
      if (colorSpace?.includes("CMYK")) {
        for (let i = 0; i < width * height; i++) {
          const c = rawData[i * 4] / 255
          const m = rawData[i * 4 + 1] / 255
          const y = rawData[i * 4 + 2] / 255
          const k = rawData[i * 4 + 3] / 255

          imageData.data[i * 4] = Math.round(255 * (1 - c) * (1 - k))
          imageData.data[i * 4 + 1] = Math.round(255 * (1 - m) * (1 - k))
          imageData.data[i * 4 + 2] = Math.round(255 * (1 - y) * (1 - k))
          imageData.data[i * 4 + 3] = 255
        }
      } else {
        for (let i = 0; i < rawData.length; i++) {
          imageData.data[i] = rawData[i]
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
    const pngBuffer = canvas.toBuffer("image/png")
    return pngBuffer
  } catch (error) {
    return null
  }
}

function detectImageFormat(data: Uint8Array | Buffer): string | null {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data)

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg"
  }
  if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "png"
  }
  if (buffer.length >= 3 && buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return "gif"
  }
  if (buffer.length >= 2 && buffer[0] === 0x42 && buffer[1] === 0x4d) {
    return "bmp"
  }
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return "webp"
  }

  return null
}

function extractImagesByPattern(buffer: Buffer): Array<{ data: Buffer; ext: string }> {
  const images: Array<{ data: Buffer; ext: string }> = []

  for (let i = 0; i < buffer.length - 3; i++) {
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd8 && buffer[i + 2] === 0xff) {
      for (let j = i + 3; j < buffer.length - 1; j++) {
        if (buffer[j] === 0xff && buffer[j + 1] === 0xd9) {
          const imageData = buffer.slice(i, j + 2)
          if (imageData.length > 1000) {
            images.push({ data: imageData, ext: "jpg" })
          }
          i = j + 2
          break
        }
      }
    }
  }

  for (let i = 0; i < buffer.length - 8; i++) {
    if (buffer[i] === 0x89 && buffer[i + 1] === 0x50 && buffer[i + 2] === 0x4e && buffer[i + 3] === 0x47) {
      for (let j = i + 8; j < buffer.length - 8; j++) {
        if (
          buffer[j] === 0x49 && buffer[j + 1] === 0x45 && buffer[j + 2] === 0x4e && buffer[j + 3] === 0x44 &&
          buffer[j + 4] === 0xae && buffer[j + 5] === 0x42 && buffer[j + 6] === 0x60 && buffer[j + 7] === 0x82
        ) {
          const imageData = buffer.slice(i, j + 8)
          if (imageData.length > 1000) {
            images.push({ data: imageData, ext: "png" })
          }
          i = j + 8
          break
        }
      }
    }
  }

  return images
}