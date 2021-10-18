import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../../context/authcontext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UpdateComment = (props) => {
  const { comment, setComments, modal, toggle } = props;
  const [row, setRow] = useState(comment.row);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const context = useContext(AuthContext);

  const updateHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({
            row,
            content,
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
          ...state.map((item) => {
            return item.id === comment.id ? data : item;
          }),
        ];
      });
      setUpdateSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setRow(comment.row);
    setContent(comment.content);
  }, [comment]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        <input
          onChange={(event) => setRow(event.target.value)}
          value={row}
          type="number"
          className="mt-3 mb-3 w-100 p-2"
        />
        <textarea
          onChange={(event) => setContent(event.target.value)}
          className="w-100 p-2"
        >
          {content}
        </textarea>
        {error && <p className="text-danger">{error}</p>}
        {updateSuccess && <p className="text-success">Comment updated.</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => updateHandler()}>
          Save
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            toggle();
            setUpdateSuccess(false);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateComment;
