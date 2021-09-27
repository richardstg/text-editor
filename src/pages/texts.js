import React, { useState, useEffect } from "react";
import AddText from "../components/addtext/addtext";
import TextList from "../components/textlist/textlist";

const Texts = (props) => {
  const { texts } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Texts
      </h3>
      {texts && texts.length > 0 && <TextList texts={texts} />}
    </>
  );
};

export default Texts;
