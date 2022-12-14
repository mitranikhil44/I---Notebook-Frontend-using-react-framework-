import noteContext from "../context/notes/noteContext";
import React, { useContext, useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNotes] = useState({title: "", description: "", tag: ""})
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNotes({title: "", description: "", tag: ""})
    props.showAlert("Your note has added successfully", "success");
  }
  const onChange = (e) => {
    setNotes({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container my-3">
        <h2>Add a note</h2>
        <div className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text"className="form-control" id="title" value={note.title} name="title" onChange={onChange} minLength={5} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={10} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" value={note.description} name="description" rows="3" onChange={onChange} minLength={3} required
            ></textarea>
            <button disabled={note.title.length<5 || note.description.length<10} type="submit" className="btn my-2 btn-primary" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default AddNote;
