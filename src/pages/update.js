import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    // console.log("Button clicked");

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
      <h3 className="mt-3">{name}</h3>
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
      {updated && (
        <div>
          <p data-testid="feedback">Text updated successfully!</p>
          <Link to="/">
            <span data-testid="back">Back</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Update;
