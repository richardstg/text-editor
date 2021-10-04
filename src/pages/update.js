import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../context/authcontext";

const Update = (props) => {
  const [error, setError] = useState(null);
  const [id, setId] = useState(props.text.id);
  const [name, setName] = useState(props.text.name);
  const [content, setContent] = useState(props.text.content);
  const [updated, setUpdated] = useState(false);
  const context = useContext(AuthContext);

  const saveHandler = async (event) => {
    if (!name || !content) {
      return;
    }
    setUpdated(false);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({ name, content }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUpdated(true);

      const editedText = { id, name, content, creator: props.text.creator };
      const texts = props.texts.map((t) =>
        t.id !== editedText.id ? t : editedText
      );
      props.setTexts(texts);
      // props.socket.emit("text update", editedText);
    } catch (err) {
      setError(err.message);
    }
  };

  // Save the text every time name or content is changed
  // useEffect(() => {
  //   saveHandler();
  // }, [name, content]);

  /* Listen for text updates from other clients and set the updated
  text to the state */
  // useEffect(() => {
  //   props.socket.on("text updated", function (updatedText) {
  //     const updatedTexts = props.texts.map((t) =>
  //       t.id !== updatedText.id ? t : updatedText
  //     );
  //     props.setTexts(updatedTexts);
  //   });
  // }, []);

  // Update the local state when the state of App is uppdated, in order
  // to get the updates from other clients through Socket
  useEffect(() => {
    setName(props.text.name);
    setContent(props.text.content);
  }, [props.text.name, props.text.content]);

  return (
    <>
      <h3 className="mt-3">Update</h3>
      <input
        onChange={(event) => setName(event.target.value)}
        value={name}
        className="mt-3 mb-3 w-100 p-2"
      />
      {content && (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      )}
      <button
        className="btn btn-success mt-3 mb-3"
        type="submit"
        onClick={saveHandler}
        name="Update Text"
        data-testid="update-button"
        disabled={context.userId !== props.text.creator}
      >
        Update Text
      </button>
      {context.userId !== props.text.creator && (
        <p className="mt-1">
          You cannot update this text since you did not create it.
        </p>
      )}
      {error && <p className="text-danger mt-1 mb-1">{error}</p>}
      {updated && (
        <p className="text-success" data-testid="feedback">
          Text updated successfully!
        </p>
      )}
      <Link to="/">
        <p className="mt-0 mb-1" data-testid="back">
          Back
        </p>
      </Link>
    </>
  );
};

export default Update;
