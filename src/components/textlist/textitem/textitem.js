import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authcontext";

const TextItem = (props) => {
  const { text } = props;
  const context = useContext(AuthContext);

  const authorized =
    context.userId === props.text.creator ||
    (props.text.authorized &&
      props.text.authorized.includes(context.userEmail));

  return (
    <li key={text.id}>
      <Link to={`/${text.id}`}>{text.name}</Link>
      <span className="font-italic">
        {" "}
        ({authorized ? "authorized" : "unauthorized"} to edit, type:{" "}
        {text.code ? "code" : "text"})
      </span>
    </li>
  );
};

export default TextItem;
