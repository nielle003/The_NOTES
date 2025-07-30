"use server";
import { handleError } from "@/lib/utils";
import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";

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