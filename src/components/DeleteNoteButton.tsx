"use client";
import { Trash2, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { DeleteNoteAction } from "@/actions/notes"
    ;
type Props = {
    noteId: string;
    deleteNoteLocally: (noteId: string) => void;
}

function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
    const router = useRouter();
    const noteIdParam = useSearchParams().get("noteId") || "";

    const [isPending, startTransition] = useTransition()
    const handleDeleteNote = () => {

        startTransition(async () => {
            const { errorMessage } = await DeleteNoteAction(noteId);
            if (!errorMessage) {
                toast.success("Note deleted successfully", { description: "Your note has been deleted." });
                deleteNoteLocally(noteId);

                if (noteId === noteIdParam) {
                    router.replace("/");
                } else {
                    toast.error("There was an error deleting the note", { description: errorMessage });
                }
            }
        });
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="absolute right-2 top-1/2  -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-4"
                    variant="ghost"
                ><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you want to delete this note?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note from our server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteNote} className="w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteNoteButton