import React, { useContext } from "react";
import AddText from "../components/addtext/addtext";
import TextList from "../components/textlist/textlist";

const Home = (props) => {
  const { texts, setTexts } = props;

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Home
      </h3>
      <AddText setTexts={setTexts} />
      {texts && texts.length > 0 && <TextList texts={texts} />}
    </>
  );
};

export default Home;
