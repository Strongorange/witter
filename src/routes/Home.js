import React, { useState, useEffect } from "react";
import { dbService } from "../fBase";

const Home = () => {
  const [weet, setWeet] = useState("");
  const [weets, setWeets] = useState([]);
  const getWeets = async () => {
    const dbWeets = await dbService.collection("weets").get();
    dbWeets.forEach((document) => {
      const weetObj = {
        ...document.data(),
        id: document.id,
      };
      setWeets((prev) => [weetObj, ...prev]);
    });
  };

  useEffect(() => {
    getWeets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("weets").add({
      weet,
      createdAt: Date.now(),
    });
    setWeet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWeet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={weet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Weet" />
      </form>
      <div>
        {weets.map((weet) => (
          <div key={weet.id}>
            <h4>{weet.weet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
