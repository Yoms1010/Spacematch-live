'use server'

// --- Global API Constants and Helpers ---
const apiKey = process.env.GEMINI_TTS_API_KEY;
const GENERATE_CONTENT_URL = process.env.GENERATE_CONTENT_URL+`?key=${apiKey}`
const TTS_URL = process.env.TTS_URL+`?key=${apiKey}`



// Helper for Exponential Backoff
export const fetchWithExponentialBackoff = async (url: string, options: any, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 429 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw new Error(`API request failed with status ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};