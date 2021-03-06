import React, { Component } from "react";
import axios from "axios";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote: {
        content: "",
        title: "",
        user_id: localStorage.getItem("userID")
      }
    };
    this.api = "http://localhost:9000/api/notes";
  }
  handleNoteFormChange = e => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [e.target.name]: e.target.value
      }
    });
  };

  addNewNote = e => {
    e.preventDefault();
    axios
      .post(this.api, this.state.newNote, this.props.options)
      .then(this.props.setNotes);

    this.props.history.push("/");
  };
  render() {
    return (
      <div className="note-form">
        <h1>Create New Note:</h1>
        <form onSubmit={this.addNewNote}>
          <input
            type="text"
            placeholder="Note Title"
            value={this.state.newNote.title}
            onChange={this.handleNoteFormChange}
            name="title"
          />
          <textarea
            name="content"
            id="create-note-body"
            cols="30"
            rows="20"
            onChange={this.handleNoteFormChange}
            value={this.state.newNote.content}
            placeholder="Note comment"
          />
          <input type="submit" id="create-submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default NoteForm;
