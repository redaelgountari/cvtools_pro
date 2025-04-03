from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import fitz  # PyMuPDF
import os
import shutil
import uuid
import asyncio

app = FastAPI()

# ✅ CORS Configuration (Comprehensive CORS setup)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# ✅ Folder Setup
TEMP_FOLDER = "temp"
OUTPUT_FOLDER = "output_images"
os.makedirs(TEMP_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.post("/extract-images/")
async def extract_images(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    # ✅ Generate unique filename to prevent conflicts
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    pdf_path = os.path.join(TEMP_FOLDER, unique_filename)

    # ✅ Save uploaded PDF file
    try:
        # Use shutil to save file and close file handles immediately
        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Use context manager to ensure document is closed
        with fitz.open(pdf_path) as doc:
            extracted_files = []

            # ✅ Extract images from PDF
            for page_number in range(len(doc)):
                for img_index, img in enumerate(doc[page_number].get_images(full=True)):
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]
                    image_ext = base_image["ext"]
                    
                    # ✅ Generate unique image filename
                    image_filename = f"page_{page_number + 1}_img_{img_index + 1}_{uuid.uuid4()}.{image_ext}"
                    full_image_path = os.path.join(OUTPUT_FOLDER, image_filename)

                    with open(full_image_path, "wb") as img_file:
                        img_file.write(image_bytes)

                    extracted_files.append(image_filename)

        return {"message": "Images extracted successfully!", "files": extracted_files}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        # ✅ Safely remove the temporary PDF file
        try:
            # Add a small delay to ensure file handles are closed
            await asyncio.sleep(0.1)
            if os.path.exists(pdf_path):
                # Use os.unlink for more robust file deletion
                os.unlink(pdf_path)
        except PermissionError:
            # Log the error or handle it gracefully
            print(f"Could not delete temporary file: {pdf_path}")
        except Exception as e:
            print(f"Error deleting temporary file: {e}")

# ✅ Add an endpoint to serve images directly
@app.get("/extract-images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")

# Optional: Startup event to ensure folders exist
@app.on_event("startup")
async def startup_event():
    os.makedirs(TEMP_FOLDER, exist_ok=True)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)