import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Update = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [updated, setUpdated] = useState(false);

  const saveHandler = async (event) => {
    event.preventDefault();
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
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/${props.match.params.id}`
        );
        const data = await response.json();
        const { id, name, content } = data;

        setId(id);
        setName(name);
        setContent(content);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [props.match.params.id]);

  return (
    <>
      <input
        onChange={(event) => setName(event.target.value)}
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
        Update Text
      </button>
      {updated && <p>Text updated succesfully!</p>}
    </>
  );
};

export default Update;
