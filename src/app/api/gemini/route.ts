import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: Request) {
  try {
    const { userData } = await request.json()
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-001' })
    
    const result = await model.generateContent(userData)
    const response = await result.response
    
    return Response.json({ text: response.text() })
  } catch (error) {
    console.error('Gemini API error:', error)
    return Response.json(
      { error: error },
      { status: 500 }
    )
  }
}