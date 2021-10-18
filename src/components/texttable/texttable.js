import React from "react";
import TextRow from "./textrow/textrow";

const TextTable = (props) => {
  const { texts } = props;

  return (
    <>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Authorized to edit</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {texts.map((text) => (
            <TextRow key={text.id} text={text} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TextTable;
