import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Update = (props) => {
  const [id, setId] = useState(props.text.id);
  const [name, setName] = useState(props.text.name);
  const [content, setContent] = useState(props.text.content);
  const [updated, setUpdated] = useState(false);

  const saveHandler = async (event) => {
    if (!name || !content) {
      return;
    }

    setUpdated(false);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, content }),
        }
      );

      await response.json();

      setUpdated(true);

      const editedText = { id, name, content };
      const texts = props.texts.map((t) =>
        t.id !== editedText.id ? t : editedText
      );

      props.setTexts(texts);
      // props.socket.emit("text update", editedText);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Save the text every time name or content is changed
  // useEffect(() => {
  //   saveHandler();
  // }, [name, content]);

  /* Listen for text updates from other clients and set the updated
  text to the state */
  useEffect(() => {
    props.socket.on("text updated", function (updatedText) {
      const updatedTexts = props.texts.map((t) =>
        t.id !== updatedText.id ? t : updatedText
      );
      props.setTexts(updatedTexts);
      console.log(updatedText.name);
      // console.log("Text updated!!!!!!!");
    });
  }, []);

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
      >
        Update Text
      </button>
      {/* <p>Saves automatically.</p> */}
      <Link to="/">
        <span data-testid="back">Back</span>
      </Link>
      {/* {updated && (
        <div>
          <p data-testid="feedback">Text updated successfully!</p>
          <Link to="/">
            <span data-testid="back">Back</span>
          </Link>
        </div>
      )} */}
    </>
  );
};

export default Update;
