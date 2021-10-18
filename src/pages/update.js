import React, { useState, useEffect, useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../context/authcontext";
import Comment from "../components/comment/comment";
import Invite from "../components/invite/invite";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const Update = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(props.text.id);
  const [name, setName] = useState(props.text.name);
  const [content, setContent] = useState(props.text.content);
  const [updated, setUpdated] = useState(false);
  const [output, setOutput] = useState("");
  const context = useContext(AuthContext);

  const saveHandler = async (event) => {
    if (!name || !content) {
      return;
    }
    setUpdated(false);
    setError(null);
    setLoading(true);
    setOutput("");
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
          body: JSON.stringify({
            name,
            content,
            code: props.text.code || false,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUpdated(true);
      setLoading(false);

      const editedText = {
        id,
        name,
        content,
        creator: props.text.creator,
        authorized: props.text.authorized,
        code: props.text.code || false,
      };
      const texts = props.texts.map((t) =>
        t.id !== editedText.id ? t : editedText
      );
      props.setTexts(texts);
      // props.socket.emit("text update", editedText);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const executeCodeHandler = async () => {
    setError(null);
    setOutput("");
    setLoading(true);
    setUpdated(false);

    try {
      const response = await fetch("https://execjs.emilfolino.se/code", {
        body: JSON.stringify({
          code: btoa(content),
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      let decodedOutput = atob(result.data);

      setOutput(decodedOutput);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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
    setId(props.text.id);
  }, [props.text.name, props.text.content, props.text.id]);

  return (
    <>
      <h3 className="mt-3">Update</h3>
      <input
        onChange={(event) => setName(event.target.value)}
        value={name}
        className="mt-3 mb-3 w-100 p-2"
      />
      {content &&
        (props.text.code ? (
          <CodeMirror
            value={content}
            height="200px"
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
              setContent(value);
            }}
          />
        ) : (
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
          />
        ))}
      <button
        className="btn btn-success mt-3 mb-3"
        type="submit"
        onClick={saveHandler}
        name="Update Text"
        data-testid="update-button"
        disabled={
          !(
            context.userId === props.text.creator ||
            props.text.authorized.includes(context.userEmail)
          )
        }
      >
        Update
      </button>
      {props.text.code && (
        <button
          className="btn btn-outline-success mb-3 d-block"
          type="submit"
          onClick={executeCodeHandler}
          name="Run"
          data-testid="run-button"
        >
          Run
        </button>
      )}
      {loading && (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {props.text.code && output && (
        <>
          <h6>Output</h6>
          <p className="mb-3">{output}</p>
        </>
      )}
      {!(
        context.userId === props.text.creator ||
        props.text.authorized.includes(context.userEmail)
      ) && <p className="mt-1">You are not authorized to make updates.</p>}
      {error && <p className="text-danger mt-1 mb-3">{error}</p>}
      {updated && (
        <p className="text-success" data-testid="feedback">
          Updated successfully!
        </p>
      )}
      {(context.userId === props.text.creator ||
        props.text.authorized.includes(context.userEmail)) && (
        <>
          <Comment textId={props.text.id} />
          <Invite textId={id} />
        </>
      )}
    </>
  );
};

export default Update;
