import React, { useState, useEffect } from "react";
import AddText from "../components/addtext/addtext";
import TextList from "../components/textlist/textlist";

const Home = () => {
  const [texts, setTexts] = useState(null);

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
      <h3 className="mt-3" data-testid="home">
        Texts
      </h3>
      {texts && texts.length > 0 && <TextList texts={texts} />}
    </>
  );
};

export default Home;
