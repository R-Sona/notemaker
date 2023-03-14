import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen.js";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/notesActions.js";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage.js";
import { useNavigate } from "react-router-dom";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      Navigate("/");
    }
  }, [dispatch, successCreate, successUpdate, userInfo, successDelete]);

  return (
    <MainScreen title={`Welcome  ${userInfo.name}..`}>
      <h4></h4>
      <br />
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
      {loading && <Loading />}

      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textdecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {note.title}
                </span>

                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>

                <blockquote class="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created On{" "}
                    <city title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </city>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Accordion>
        ))}
      {notes && notes.length === 0 && (
        <h2 style={{ textAlign: "center" }}>Result not found.</h2>
      )}
    </MainScreen>
  );
};

export default MyNotes;
