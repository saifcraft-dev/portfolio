const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

function getKeys(): string[] {
  const keys = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY_B,
    import.meta.env.VITE_GEMINI_API_KEY_C,
  ].filter(Boolean);
  return keys;
}

const STOP_ERRORS = new Set([400]);

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function geminiChat(
  history: ChatMessage[],
  userMessage: string,
  systemInstruction: string
): Promise<string> {
  const keys = getKeys();
  if (keys.length === 0) {
    throw new Error("No Gemini API keys configured.");
  }

  for (const key of keys) {
    for (const model of MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: systemInstruction }],
              },
              contents: [
                ...history,
                { role: "user", parts: [{ text: userMessage }] },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response."
          );
        }

        if (STOP_ERRORS.has(response.status)) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error?.message || "Bad request");
        }

        // 429, 401, 403, 500, 502, 503, 504 → try next key/model
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          (err.message.includes("Bad request") ||
            err.message.includes("400"))
        ) {
          throw err;
        }
        // network error or non-stop error → continue to next
      }
    }
  }

  throw new Error(
    "All Gemini API keys and models are currently unavailable. Please try again shortly."
  );
}
