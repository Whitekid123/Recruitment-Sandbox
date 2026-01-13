
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { JobDetails } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';
const THINKING_BUDGET = 32768;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateRecruitmentMaterials(rawNotes: string, useThinking: boolean): Promise<JobDetails> {
    const prompt = `
      You are a world-class executive recruiter and HR strategist.
      Based on the following raw notes about a job role, generate two distinct sections:
      
      1. A polished, high-converting LinkedIn Job Description. It should include:
         - A punchy "Why join us?" opening.
         - Clear "Key Responsibilities" and "Required Qualifications".
         - Use emojis for readability.
         - Correct LinkedIn formatting.
      
      2. An Interview Guide containing exactly 10 behavioral interview questions.
         - These must specifically target the soft and hard skills derived from the JD.
         - Use the STAR (Situation, Task, Action, Result) methodology framework for evaluation.

      Raw Notes:
      ${rawNotes}
    `;

    const config: any = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobDescription: { type: Type.STRING, description: "The LinkedIn Job Description in Markdown." },
          interviewGuide: { type: Type.STRING, description: "The Interview Guide with 10 behavioral questions in Markdown." }
        },
        required: ["jobDescription", "interviewGuide"]
      }
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingBudget: THINKING_BUDGET };
    }

    try {
      const response = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ parts: [{ text: prompt }] }],
        config
      });

      const result = JSON.parse(response.text || '{}');
      return {
        jobDescription: result.jobDescription || "Failed to generate JD.",
        interviewGuide: result.interviewGuide || "Failed to generate Interview Guide."
      };
    } catch (error) {
      console.error("Gemini Error:", error);
      throw new Error("Failed to generate recruitment materials. Please try again.");
    }
  }

  async chatWithGemini(message: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> {
    try {
      const chat = this.ai.chats.create({
        model: MODEL_NAME,
        config: {
          systemInstruction: "You are a recruitment assistant. You help users refine their job descriptions and interview strategies based on the current context."
        }
      });

      // Simple implementation: Send message with history context isn't directly supported in the same way 
      // as generateContent without a wrapper, so we'll use a standard chat interface.
      const response: GenerateContentResponse = await chat.sendMessage({ message });
      return response.text || "No response received.";
    } catch (error) {
      console.error("Chat Error:", error);
      throw new Error("Chat failed.");
    }
  }
}

export const geminiService = new GeminiService();
