import React, { useState, useEffect } from "react";
import Weet from "../components/Weet";
import { dbService } from "../fBase";

const Home = ({ userObj }) => {
  const [weet, setWeet] = useState("");
  const [weets, setWeets] = useState([]);

  useEffect(() => {
    dbService.collection("weets").onSnapshot((snapshot) => {
      const weetsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeets(weetsArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("weets").add({
      text: weet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
          <Weet
            key={weet.id}
            weetObj={weet}
            isOwner={weet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
