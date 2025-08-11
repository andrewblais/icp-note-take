/**
 * NewNote.jsx
 *
 * Create new notes (typed), or generate from external APIs (joke/quote).
 * Delegates persistence to the parent via `onAddNewNote`.
 *
 * Notes
 * -----
 * - Motoko sets `id` and `timeStamp`; this component only collects title/content.
 * - In development, the quote button is functional via Vite's `/api` proxy
 *   (targeting a local backend or canister). For production, update the endpoint
 *   to point to a deployed backend or Motoko HTTP integration.
 */

import axios from "axios";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

/**
 * @component
 * @param {Object} props
 * @param {Function} props.onAddNewNote - Callback to persist a newly created note to the backend/canister.
 */
function NewNote({ onAddNewNote }) {
    // --- Local state ---

    /** Draft note fields bound to inputs. */
    const [newNoteObject, setNewNoteObject] = useState({
        title: "",
        content: "",
    });

    /** Controls the expand/collapse UI. */
    const [zoomIn, setZoomIn] = useState(false);

    // --- Handlers ---

    /** Sync text inputs into local draft. */
    function handleNewNoteInput(event) {
        const { value, name } = event.target;
        setNewNoteObject((prev) => ({ ...prev, [name]: value }));
    }

    /**
     * Expand when typing; collapse only if the draft is empty and focus leaves
     * the title/content/add-button cluster.
     */
    function onInputBlur(event) {
        if (newNoteObject.title.trim() || newNoteObject.content.trim()) {
            setZoomIn(true);
        } else if (
            !event.relatedTarget ||
            !["note-title", "note-content", "add-button"].some((cls) =>
                String(event.relatedTarget.className || "").includes(cls)
            )
        ) {
            setZoomIn(false);
        }
    }

    /**
     * Fetch a joke from icanhazdadjoke and create a note.
     * Uses Accept: application/json to avoid HTML responses.
     */
    async function handleJokeNote() {
        try {
            const response = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" },
            });
            const jokeContent = response.data.joke;
            const jokeTitle = jokeContent.split(" ").slice(0, 3).join(" ");
            const jokeNote = { title: `${jokeTitle}...`, content: jokeContent };

            onAddNewNote(new Event("submit"), jokeNote);
            setNewNoteObject({ title: "", content: "" });
            setZoomIn(false);
        } catch (error) {
            console.error("Error getting joke:", error);
            alert("Could not fetch a joke right now.");
        }
    }

    /**
     * Fetch a quote from FavQs and create a note.
     * Disabled via the button due to CORS from the browser.
     */
    async function handleQuoteNote() {
        try {
            const response = await axios.get("/api/quote");
            const quoteContent = response.data.quote.body;
            const quoteTitle = response.data.quote.author;
            const quoteNote = {
                title: `${quoteTitle}...`,
                content: quoteContent,
            };

            onAddNewNote(new Event("submit"), quoteNote);
            setNewNoteObject({ title: "", content: "" });
            setZoomIn(false);
        } catch (error) {
            console.error("Error fetching quote:", error);
            alert("Could not fetch a quote right now.");
        }
    }

    // --- Render ---

    return (
        <div
            className="note"
            style={{
                height: zoomIn ? "17rem" : "4rem",
                overflowY: zoomIn ? "auto" : "hidden",
            }}
        >
            {/* Zooming form container with title and content fields: */}
            <form>
                {zoomIn && (
                    <div className="note-title-date">
                        <input
                            type="text"
                            className="note-title"
                            name="title"
                            placeholder="Note Title"
                            value={newNoteObject.title}
                            onChange={handleNewNoteInput}
                            onFocus={() => setZoomIn(true)}
                            onBlur={onInputBlur}
                        />
                    </div>
                )}

                <textarea
                    className="note-content"
                    name="content"
                    placeholder={
                        zoomIn
                            ? "Type note text and click + button."
                            : "Click here to add new note."
                    }
                    rows={zoomIn ? 3 : 1}
                    value={newNoteObject.content}
                    onChange={handleNewNoteInput}
                    onFocus={() => setZoomIn(true)}
                    onBlur={onInputBlur}
                />

                <Zoom in={zoomIn} timeout={{ enter: 500, exit: 1 }}>
                    {/* Save user-typed note: */}
                    <Fab
                        className="add-button button-right"
                        onClick={(event) => {
                            onAddNewNote(event, { ...newNoteObject });
                            setNewNoteObject({ title: "", content: "" });
                            setZoomIn(false);
                        }}
                    >
                        <Tooltip title="Save Typed Note">
                            <AddIcon />
                        </Tooltip>
                    </Fab>
                </Zoom>

                <Zoom in={zoomIn} timeout={{ enter: 500, exit: 1 }}>
                    {/* Save joke note: */}
                    <Fab
                        className="add-button button-left"
                        onClick={handleJokeNote}
                    >
                        <Tooltip title="Save Joke Note">
                            <FontAwesomeIcon
                                icon={faFaceSmileWink}
                                fontSize="1.25rem"
                            />
                        </Tooltip>
                    </Fab>
                </Zoom>

                {/*
                // --- DISABLED: CORS ISSUE. RECTIFY IN VERSION 0.0.1 ---
                <Zoom in={zoomIn} timeout={{ enter: 500, exit: 1 }}>
                    <Fab
                        className="add-button button-middle"
                        onClick={handleQuoteNote}
                    >
                        <Tooltip title="Save Quote Note">
                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                fontSize="1.25rem"
                            />
                        </Tooltip>
                    </Fab>
                </Zoom>
                */}
            </form>
        </div>
    );
}

export default NewNote;
