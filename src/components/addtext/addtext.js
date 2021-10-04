import React, { useState, useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../../context/authcontext";

const AddText = (props) => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { setTexts } = props;
  const context = useContext(AuthContext);

  const saveHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        body: JSON.stringify({ name, content }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setTexts((state) => {
        if (state.length > 0) {
          return [data, ...state];
        }
        return [data];
      });
      setName("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <input
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter name of the text..."
        value={name}
        className="mt-3 mb-3 w-100 p-2"
      />
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!");
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
      <button
        className="btn btn-success mt-3 mb-3"
        type="submit"
        onClick={saveHandler}
      >
        Add Text
      </button>
      {error && <p className="text-danger mt-1 mb-1">{error}</p>}
    </>
  );
};

export default AddText;
