import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notebook-backend-kappa.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
   const getNotes = async()=> {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token:
          localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: Api Call
    // API Call
    const response = await fetch(`${host}/api/notes/add_note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token:
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete_note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth_token:
          localStorage.getItem("token")
      }
    });
    response.json();
    
    // TODO: Api Call
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a ntoe
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/update_note/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth_token:
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, deleteNote, addNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
