import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authcontext";

const TextRow = (props) => {
  const { text } = props;
  const context = useContext(AuthContext);
  console.log(text);

  const authorized =
    context.userId === props.text.creator ||
    (props.text.authorized &&
      props.text.authorized.includes(context.userEmail));

  return (
    <tr>
      <td>
        <Link to={`/${text.id}`}>{text.name}</Link>
      </td>
      <td>{authorized ? "Authorized" : "Unauthorized"}</td>
      <td> {text.code ? "Code" : "Text"}</td>
    </tr>
  );
};

export default TextRow;
