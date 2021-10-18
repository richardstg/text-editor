import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authcontext";

const AddComment = (props) => {
  const [error, setError] = useState(null);
  const [row, setRow] = useState("");
  const [content, setContent] = useState("");
  const context = useContext(AuthContext);

  const saveHandler = async (event) => {
    event.preventDefault();
    setError(null);
    props.setFetchError(null);
    if (!row || !content) {
      return setError("You need to fill in row and content.");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({ row, content, textId: props.textId }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      props.setComments((state) => {
        if (state && state.length > 0) {
          return [...state, data];
        }
        return [data];
      });
      setRow("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <input
        onChange={(event) => setRow(event.target.value)}
        placeholder="Enter the row number..."
        value={row}
        type="number"
        className="mt-3 mb-3 w-100 p-2"
      />
      <textarea
        onChange={(event) => setContent(event.target.value)}
        className="w-100 p-2"
        placeholder="Type your comment..."
        value={content}
      ></textarea>
      <button
        className="btn btn-success mt-3"
        type="submit"
        onClick={saveHandler}
      >
        Add Comment
      </button>
      {error && <p className="text-danger mt-3 mb-1">{error}</p>}
    </>
  );
};

export default AddComment;
