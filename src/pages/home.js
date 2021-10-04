import React from "react";
import AddText from "../components/addtext/addtext";
import TextList from "../components/textlist/textlist";

const Home = (props) => {
  const { texts, setTexts, textsError } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Home
      </h3>
      <AddText setTexts={setTexts} />
      {texts && texts.length > 0 && <TextList texts={texts} />}
      {textsError && <p className="text-danger mt-1 mb-1">{textsError}</p>}
    </>
  );
};

export default Home;
