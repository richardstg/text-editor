import React from "react";
import TextList from "../components/textlist/textlist";

const Texts = (props) => {
  const { texts, textsError } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Texts
      </h3>
      {texts && texts.length > 0 && <TextList texts={texts} />}
      {textsError && <p className="text-danger mt-1 mb-1">{textsError}</p>}
    </>
  );
};

export default Texts;
