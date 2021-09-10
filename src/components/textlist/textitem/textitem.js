import React from "react";
import { Link } from "react-router-dom";

const TextItem = (props) => {
  const { text } = props;

  return (
    <li key={text.id}>
      <Link to={`/${text.id}`}>{text.name}</Link>
    </li>
  );
};

export default TextItem;
