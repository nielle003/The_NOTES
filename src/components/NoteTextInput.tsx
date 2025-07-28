"use client";
import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { UpdateNoteAction } from "@/actions/notes";


type Props = {
    noteId: string;
    startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;



function NoteTextInput({ noteId, startingNoteText }: Props) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const { noteText, setNoteText } = useNote();

    useEffect(() => {
        if (noteIdParam === noteId) {
            setNoteText(startingNoteText);
        }

    }, [startingNoteText, setNoteText, noteIdParam, noteId]);

    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;

        setNoteText(text);
        clearTimeout(updateTimeout);

        updateTimeout = setTimeout(() => {
            UpdateNoteAction(noteId, text);
        }, debounceTimeout)
    };

    return (
        <Textarea
            value={noteText}
            onChange={handleUpdateNote}
            placeholder="Type your note here..."
            className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
    );
}

export default NoteTextInput