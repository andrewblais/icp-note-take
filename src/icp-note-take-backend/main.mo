/**
 * main.mo
 *
 * Motoko canister backend for the d-note-take project.
 * Stores notes in a stable List<Note> with newest-first order.
 *
 * Notes
 * -----
 * - Each note has a stable `id` (Nat) assigned sequentially and never reused.
 * - `timeStamp` is stored as ns since epoch (Nat64) from Time.now().
 *   The frontend converts this to ms for display.
 * - All CRUD is keyed to the stable `id`, never the list index.
 */

import List "mo:base/List";
import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";

persistent actor DNoteTake {

  // --- Types ---

  /**
     * Note stored on the canister.
     *
     * @field id        Stable unique identity (never reused).
     * @field title     Note title text.
     * @field content   Note body content.
     * @field timeStamp Creation time (ns since epoch).
     */
  public type Note = {
    id : Nat;
    title : Text;
    content : Text;
    timeStamp : Nat64;
  };

  // --- Stable state ---
  /// Previous build used `stable` keyword since `actor`
  ///  didn't have `persistent` prefix. No longer needed,
  ///  but syntax indicated/commented out for clarity...

  /// Persistent list of notes (newest first).
  //   stable var notes : List.List<Note> = List.nil<Note>();
  var notes : List.List<Note> = List.nil<Note>();

  /// Monotonic ID counter; not reset on delete-all to avoid id reuse.
  //   stable var nextId : Nat = 0;
  var nextId : Nat = 0;

  // --- Methods ---

  /**
     * Create a new note and prepend it to the list.
     *
     * @param titleText   Note title.
     * @param contentText Note body content.
     * @returns {Note}    The created note with assigned id and timestamp.
     */
  public func moAddNewNote(titleText : Text, contentText : Text) : async Note {
    let note : Note = {
      id = nextId;
      title = titleText;
      content = contentText;
      timeStamp = Nat64.fromNat(Int.abs(Time.now())); // ns since epoch
    };
    notes := List.push(note, notes); // newest-first
    nextId += 1;
    return note;
  };

  /**
     * Read all notes in newest-first order.
     *
     * @returns {[Note]} Array of notes for frontend consumption.
     */
  public query func moGetNotes() : async [Note] {
    List.toArray(notes);
  };

  /**
     * Delete a note by its stable id.
     *
     * @param id Unique id assigned at creation.
     */
  public func moDeleteNote(id : Nat) : async () {
    notes := List.filter<Note>(notes, func(n : Note) : Bool { n.id != id });
  };

  /**
     * Delete all notes. The identity counter is not reset to avoid id reuse.
     */
  public func moDeleteAllNotes() : async () {
    notes := List.nil<Note>();
    // Uncomment if you *do* want to reset ids:
    // nextId := 0;
  };
};
