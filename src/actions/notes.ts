"use server";

import { handleError } from "@/lib/utils";
import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const UpdateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");

        await prisma.note.update({
            where: { id: noteId },
            data: { text }
        });

        return { errorMessage: null };

    } catch (error) {
        return handleError(error);
    }
}

export const CreateNoteAction = async (noteId: string) => {
    console.log("=== CreateNoteAction started ===");
    console.log("Note ID:", noteId);

    try {
        console.log("Getting user...");
        const user = await getUser();
        console.log("User retrieved:", user ? { id: user.id, email: user.email } : "null");

        if (!user) {
            console.log("No user found, throwing error");
            throw new Error("You must be logged in to create a note");
        }

        // Check if user exists in database, create if not
        console.log("Checking if user exists in database...");
        const existingUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!existingUser) {
            console.log("User doesn't exist in database");
        }

        console.log("Creating note in database...");
        const newNote = await prisma.note.create({
            data: {
                id: noteId,
                authorId: user.id,
                text: "",
            }
        });
        console.log("Note created successfully:", newNote);

        console.log("=== CreateNoteAction completed successfully ===");
        return { errorMessage: null };

    } catch (error) {
        console.error("=== CreateNoteAction ERROR ===");
        console.error("Error details:", error);
        return handleError(error);
    }
}



export const DeleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to delete a note");

        await prisma.note.delete({
            where: { id: noteId, authorId: user.id },

        });

        return { errorMessage: null };

    } catch (error) {
        return handleError(error);
    }
}



export const askAIAboutNotesAction = async (
    newQuestions: string[],
    responses: string[],
) => {
    try {
        console.log("[askAIAboutNotesAction] Called with newQuestions:", newQuestions, "responses:", responses);
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to ask AI questions");

        const notes = await prisma.note.findMany({
            where: { authorId: user.id },
            orderBy: { createdAt: "desc" },
            select: { text: true, createdAt: true, updatedAt: true },
        });
        console.log("[askAIAboutNotesAction] Notes fetched:", notes.length);

        if (notes.length === 0) {
            console.log("[askAIAboutNotesAction] No notes found for user.");
            return "You don't have any notes yet.";
        }

        const formattedNotes = notes
            .map((note) =>
                `\nText: ${note.text}\nCreated at: ${note.createdAt}\nLast updated: ${note.updatedAt}`.trim(),
            )
            .join("\n");

        // Build the prompt for Gemini
        let prompt = `
        You are a helpful assistant that answers questions about a user's notes. 
        Assume all questions are related to the user's notes. 
        Make sure that your answers are not too verbose and you speak succinctly. 
        Your responses MUST be formatted in clean, valid HTML with proper structure. 
        Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
        Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
        Avoid inline styles, JavaScript, or custom attributes.Do NOT use Markdown code blocks.
        Only return valid HTML, not wrapped in triple backticks or any code block.

        Rendered like this in JSX:
        <p dangerouslySetInnerHTML={({ __html: YOUR_RESPONSE })} />

        Here are the user's notes:
        ${formattedNotes}
        `;

        // Add user questions and previous responses to the prompt
        for (let i = 0; i < newQuestions.length; i++) {
            prompt += `\n\nUser question: ${newQuestions[i]}`;
            if (responses.length > i) {
                prompt += `\nAssistant answer: ${responses[i]}`;
            }
        }

        // Call Gemini
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.log("[askAIAboutNotesAction] Gemini API key is missing!");
            return "Gemini API key is missing";
        }
        console.log("[askAIAboutNotesAction] Connecting to Gemini...");
        const genAi = new GoogleGenerativeAI(apiKey);
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        console.log("[askAIAboutNotesAction] Sending prompt to Gemini:", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();
        console.log("[askAIAboutNotesAction] Gemini output:", output);

        return output || "A problem has occurred";
    } catch (error) {
        console.error("[askAIAboutNotesAction] Error:", error);
        const handled = handleError(error);
        return typeof handled === "string"
            ? handled
            : handled?.errorMessage || "A problem has occurred";
    }
};
// End of askAiAboutNotesAction