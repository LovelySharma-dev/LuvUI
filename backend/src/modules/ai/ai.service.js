import axios from "axios";

export const generateWithAI = async (prompt) => {
  // OpenRouter call will go here

  const { OPENROUTER_API_KEY, OPENROUTER_MODEL } = process.env;

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  if (!OPENROUTER_MODEL) {
    throw new Error("OPENROUTER_MODEL is not configured");
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: `
            You are an expert React UI engineer.
            
            Generate production-ready React components.
            
            Rules:
            - Return only Code.
            - Use React 19 fuctional components.
            - Use JSX only.
            - Do not use external libraries.
            - Use Tailwind CSS classes.
            - No markdown.
            - No explanations.
            - No Code fences.
            - Return exactly one component.
            - Export a default component.
            `.trim(),
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    const generatedCode = response.data?.choices?.[0]?.message?.content;

    if (!generatedCode) {
      throw new Error("Empty response from OpenRouter");
    }

    return generatedCode;
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);

    throw new Error("Failed to generate component");
  }
};
