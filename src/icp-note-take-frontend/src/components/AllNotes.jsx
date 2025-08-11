/**
 * AllNotes.jsx
 *
 * Renders the list of notes and wires delete behavior to the Motoko canister.
 * Notes are displayed newest-first (matching List.push on the backend).
 *
 * Notes
 * -----
 * - All CRUD targets the stable `note.id` (never the array index).
 * - After a mutation, we refetch from the canister for authoritative state.
 */

import { moTimeStampFormat } from "./formatDate";
import OneNote from "./OneNote";

/**
 * @component
 * @param {Object[]}  currentNotes - Array of note objects from the canister.
 * @param {Function}  setCurrentNotes - React state setter for notes.
 * @param {Function}  moDeleteNote - Canister method: delete by stable id. () => Promise<void>
 * @param {Function}  moGetNotes - Canister method: read all notes. () => Promise<Note[]>
 */
function AllNotes({ currentNotes, setCurrentNotes, moDeleteNote, moGetNotes }) {
    /**
     * Delete a note by stable id, then refresh from the canister.
     *
     * @param {number} id - Stable Motoko-assigned note id.
     * @returns {Promise<void>}
     */
    async function deleteNote(id) {
        // Locate the note for confirmation text:
        const noteToDelete = currentNotes.find(
            (currentNote) => currentNote.id === id
        );
        if (!noteToDelete) return alert("Note not found?!");

        // Confirm intent before mutating:
        const confirmDelete = window.confirm(
            `Delete "${noteToDelete.title}": ${noteToDelete.content.slice(0, 10)}...?`
        );
        if (!confirmDelete) return;

        try {
            // Mutate backend, then refetch canonical list:
            await moDeleteNote(id);
            const moUpdatedNotes = await moGetNotes();
            setCurrentNotes(moUpdatedNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
            alert("Failed to delete note!");
        }
    }

    // --- Render ---
    return (
        <>
            {currentNotes.map((note) => (
                <OneNote
                    key={note.id}
                    id={note.id}
                    noteTitle={note.title}
                    noteDate={moTimeStampFormat(note.timeStamp, "abbr")}
                    noteContent={note.content}
                    deleteClick={() => deleteNote(note.id)}
                    setCurrentNotes={setCurrentNotes}
                />
            ))}
        </>
    );
}

export default AllNotes;
