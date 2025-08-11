/**
 * App.jsx
 *
 * Top-level component for the Note app. Manages app-wide state, talks to the
 * Motoko canister, and wires sorting + bulk delete UI actions.
 *
 * Notes
 * -----
 * - Source of truth for notes is the canister; we hydrate on mount (R)
 *   and prepend newly created notes (C). For deletes within list items,
 *   AllNotes handles the call then refetches (D).
 * - `timeStamp` may arrive as BigInt; comparators use relational ops to
 *   avoid Number/BigInt arithmetic issues.
 */

import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NewNote from "./components/NewNote";
import AllNotes from "./components/AllNotes";
import RadioSortButtons from "./components/RadioSortButtons";
import DeleteAllButton from "./components/DeleteAllButton";

import { icp_note_take_backend as icpBack } from "../../declarations/icp-note-take-backend";

function App() {
    // --- State ---

    /** Array of notes currently displayed in the UI (newest first). */
    const [currentNotes, setCurrentNotes] = useState([]);

    // --- Create ---

    /**
     * Create a new note via canister, then prepend to local state.
     *
     * @param {Event} event - Form/button event from NewNote.
     * @param {{title:string, content:string}} newNote - User-entered data.
     * @returns {Promise<void>}
     */
    async function addNewNote(event, newNote) {
        event.preventDefault();
        try {
            const created = await icpBack.moAddNewNote(newNote.title, newNote.content);
            // Prepend so the most recent note appears first:
            setCurrentNotes((prev) => [created, ...prev]);
        } catch (error) {
            console.error("Couldn't add note!", error);
        }
    }

    // --- Read (hydrate on mount) ---

    // Second param `[]` ensures this runs only once (no infinite loops):
    useEffect(() => {
        getNotes();
    }, []);

    /**
     * Fetch all notes from the canister and hydrate state.
     * Notes are returned newest-first (backend uses List.push).
     *
     * @returns {Promise<void>}
     */
    async function getNotes() {
        try {
            const moNotes = await icpBack.moGetNotes();
            setCurrentNotes(moNotes);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    }

    // --- Sorting helpers ---

    /** Ascending comparator for potentially BigInt timestamps. */
    const cmpBigIntAsc = (x, y) => (x === y ? 0 : x < y ? -1 : 1);
    /** Descending comparator for potentially BigInt timestamps. */
    const cmpBigIntDesc = (x, y) => (x === y ? 0 : x > y ? -1 : 1);

    /**
     * Sort notes locally based on selected radio value.
     * @param {Event} event - Change event from radio inputs.
     */
    function sortNotes(event) {
        const sortValue = event.target.value;

        setCurrentNotes((prevArr) => {
            const arrayToSort = [...prevArr];

            if (sortValue === "date-ascending") {
                arrayToSort.sort((a, b) => cmpBigIntAsc(a.timeStamp, b.timeStamp));
            } else if (sortValue === "date-descending") {
                arrayToSort.sort((a, b) => cmpBigIntDesc(a.timeStamp, b.timeStamp));
            } else if (sortValue === "title-descending") {
                arrayToSort.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortValue === "title-ascending") {
                arrayToSort.sort((a, b) => a.title.localeCompare(b.title));
            }

            return arrayToSort;
        });
    }

    // --- Delete all (persisted) ---

    /**
     * Permanently delete all notes from the canister after user confirmation.
     *
     * This method calls the Motoko `moDeleteAllNotes()` backend function
     * to clear the stable notes list, then refreshes the local state by
     * refetching from the backend.
     *
     * @returns {Promise<void>}
     */
    async function deleteAllNotes() {
        const confirmDelete = window.confirm("Delete All Notes?");
        if (!confirmDelete) return;

        try {
            await icpBack.moDeleteAllNotes();
            await getNotes();
        } catch (error) {
            console.error("Error deleting all notes:", error);
            alert("Failed to delete all notes!");
        }
    }

    // --- Render ---

    return (
        <>
            <Header />
            <div className="buttons-top">
                <RadioSortButtons onSort={sortNotes} />
                <DeleteAllButton deleteAllNotes={deleteAllNotes} />
            </div>
            <div className="notes-container">
                <NewNote onAddNewNote={addNewNote} setCurrentNotes={setCurrentNotes} />
                <AllNotes
                    currentNotes={currentNotes}
                    setCurrentNotes={setCurrentNotes}
                    moDeleteNote={icpBack.moDeleteNote}
                    moGetNotes={icpBack.moGetNotes}
                />
            </div>
            <Footer />
        </>
    );
}

export default App;
