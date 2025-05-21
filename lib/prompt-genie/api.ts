export interface PromptConversionResponse {
  englishPrompt: string;
}

/**
 * Converts Roman Urdu text to a polished English prompt using OpenRouter API
 */
export async function convertRomanUrduToEnglishPrompt(
  romanUrduText: string
): Promise<PromptConversionResponse> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured");
  }


  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // OpenRouter requires this
        "X-Title": "PromptGenie"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // You can change to a preferred model
        messages: [
          {
            role: "system",
            content: "Convert the following Roman Urdu idea into a professional, polished English prompt suitable for design generation. Return only the converted prompt without any explanations."
          },
          {
            role: "user",
            content: romanUrduText
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      englishPrompt: data.choices[0].message.content.trim()
    };
  } catch (error) {
    console.error("Error converting prompt:", error);
    throw error;
  }
}

// This is a mock function to use during development if OpenRouter API is not set up
export async function mockConvertRomanUrduToEnglishPrompt(
  romanUrduText: string
): Promise<PromptConversionResponse> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Check for common Roman Urdu patterns and return mock responses
      if (romanUrduText.includes("logo")) {
        resolve({
          englishPrompt: "Design a professional logo using blue and white colors with a modern, minimalist aesthetic."
        });
      } else if (romanUrduText.includes("website")) {
        resolve({
          englishPrompt: "Create a responsive website design with a clean interface, intuitive navigation, and appealing visuals."
        });
      } else {
        resolve({
          englishPrompt: "I've converted your idea into a professional English prompt for better results."
        });
      }
    }, 1500);
  });
}