import React from "react";
import AddText from "../components/addtext/addtext";
import TextTable from "../components/texttable/texttable";

const Home = (props) => {
  const { texts, setTexts, textsError, setTextsError } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Home
      </h3>
      <AddText setTexts={setTexts} setTextsError={setTextsError} />
      {texts && texts.length > 0 && <TextTable texts={texts} />}
      {textsError && <p className="text-danger mt-1 mb-1">{textsError}</p>}
    </>
  );
};

export default Home;
