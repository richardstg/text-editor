import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authcontext";

import UpdateComment from "./updatecomment/updatecomment";

const CommentRow = (props) => {
  const { comment, setComments } = props;
  const [deleteError, setDeleteError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const toggleShowUpdate = () => setShowUpdate(!showUpdate);
  const context = useContext(AuthContext);

  const deleteHandler = async () => {
    setDeleteError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({
            id: comment.id,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setComments((state) => {
        return [
          ...state.filter((item) => {
            return item.id !== comment.id;
          }),
        ];
      });
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  return (
    <>
      <UpdateComment
        comment={comment}
        setComments={setComments}
        modal={showUpdate}
        toggle={toggleShowUpdate}
      />
      <tr>
        <th scope="row">{comment.row}</th>
        <td>{comment.content}</td>
        <td>
          <a
            onClick={() => toggleShowUpdate()}
            className="m-1"
            href="javascript:void(0);"
          >
            Update
          </a>
          <a
            onClick={() => deleteHandler()}
            className="m-1"
            href="javascript:void(0);"
          >
            Delete
          </a>
          {deleteError && <p className="text-danger">{deleteError}</p>}
        </td>
      </tr>
    </>
  );
};

export default CommentRow;
