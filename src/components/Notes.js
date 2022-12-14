import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNotes] = useState({ id: "", updateTitle: "", updateDescription: "", updateTag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({ id: currentNote._id, updateTitle: currentNote.title, updateDescription: currentNote.description, updateTag: currentNote.tag });
  };

  const handleClick = (e) => {
    editNote(note.id, note.updateTitle, note.updateDescription, note.updateTag,);
    refClose.current.click();
    props.showAlert("Your note has updated successfully", "success");
  }
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  }


  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="d-none btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-3">
                <div className="mb-3">
                  <label htmlFor="updateTitle" className="form-label">
                    Title
                  </label>
                  <input type="text" value={note.updateTitle} className="form-control" id="updateTitle" name="updateTitle" onChange={onChange} minLength={3} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updatedescription" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" value={note.updateDescription} id="updateDescription" name="updateDescription" onChange={onChange} minLength={10} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="updateTag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" value={note.updateTag} id="updateTag" name="updateTag" onChange={onChange}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>
                Close
              </button>
              <button type="button" disabled={note.updateTitle.length<5 || note.updateDescription.length<10} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container my-3">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((notes, index) => {
          return <NoteItem key={index} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
