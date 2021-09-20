import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddText = (props) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const { setTexts } = props;

  const saveHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
      });
      const data = await response.json();

      setTexts((state) => {
        if (state.length > 0) {
          return [data, ...state];
        }
        return [data];
      });
      setName("");
      setContent("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <input
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter name of the text..."
        value={name}
        class="mt-3 mb-3 w-100 p-2"
      />
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
      <button
        class="btn btn-success mt-3 mb-3"
        type="submit"
        onClick={saveHandler}
      >
        Add Text
      </button>
    </>
  );
};

export default AddText;
