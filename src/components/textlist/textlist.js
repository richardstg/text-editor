import React from "react";
import TextItem from "./textitem/textitem";

const TextList = (props) => {
  const { texts } = props;

  return (
    <ul>
      {texts.map((text) => (
        <TextItem key={text.id} text={text} />
      ))}
    </ul>
  );
};

export default TextList;
