import React, { useState, useEffect } from "react";
import AddText from "../components/addtext/addtext";
import TextList from "../components/textlist/textlist";

const Home = (props) => {
  const [texts, setTexts] = useState(null);
  // console.log(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
        const data = await response.json();
        setTexts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AddText setTexts={setTexts} />
      {texts && texts.length > 0 && <TextList texts={texts} />}
    </>
  );
};

export default Home;
