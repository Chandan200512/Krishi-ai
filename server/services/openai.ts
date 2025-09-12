import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  organicSolutions: string[];
  chemicalSolutions: string[];
  description: string;
}

export async function detectCropDisease(base64Image: string): Promise<DiseaseDetectionResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert agricultural pathologist. Analyze the crop image and provide a detailed disease diagnosis. 
          Respond with JSON in this format: {
            "diseaseName": "string",
            "confidence": number (0-100),
            "organicSolutions": ["solution1", "solution2", "solution3"],
            "chemicalSolutions": ["solution1", "solution2", "solution3"],
            "description": "detailed description of the disease and symptoms"
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this crop image for diseases. Provide organic and chemical treatment solutions."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      diseaseName: result.diseaseName || "Unknown Disease",
      confidence: Math.max(0, Math.min(100, result.confidence || 0)),
      organicSolutions: result.organicSolutions || [],
      chemicalSolutions: result.chemicalSolutions || [],
      description: result.description || "No description available"
    };
  } catch (error) {
    throw new Error("Failed to analyze crop disease: " + (error as Error).message);
  }
}

export async function generateFarmingAdvice(question: string, language: string = "en"): Promise<string> {
  try {
    const languagePrompt = language === "en" ? "" : ` Respond in ${getLanguageName(language)}.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert agricultural advisor with deep knowledge of Indian farming practices, crops, weather patterns, and sustainable agriculture. Provide practical, actionable advice that is suitable for Indian farmers.${languagePrompt}`
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I couldn't provide advice at this time. Please try again.";
  } catch (error) {
    throw new Error("Failed to generate farming advice: " + (error as Error).message);
  }
}

function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    "ka": "Kannada",
    "hi": "Hindi", 
    "ta": "Tamil",
    "te": "Telugu",
    "en": "English"
  };
  return languages[code] || "English";
}
