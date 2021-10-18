import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authcontext";
import AddComment from "./addcomment/addcomment";
import CommentTable from "./commenttable/commenttable";

const Comment = (props) => {
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);
  const context = useContext(AuthContext);
  const { token } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/comment/${props.textId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [props.textId, token]);

  return (
    <>
      <div className="row">
        <div className="col">
          <h5>Add Comment</h5>
          <AddComment
            textId={props.textId}
            setComments={setComments}
            setFetchError={setError}
          />
        </div>
        <div className="col">
          <h5>Comments</h5>
          {error && <p className="">{error}</p>}
          {comments && comments.length > 0 && (
            <CommentTable comments={comments} setComments={setComments} />
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
