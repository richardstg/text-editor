import React from "react";
import TextTable from "../components/texttable/texttable";

const Texts = (props) => {
  const { texts, textsError } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Texts
      </h3>
      {texts && texts.length > 0 && <TextTable texts={texts} />}
      {textsError && <p className="text-danger mt-1 mb-1">{textsError}</p>}
    </>
  );
};

export default Texts;
