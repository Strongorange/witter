import React, { useState, useEffect, useRef } from "react";
import Weet from "../components/Weet";
import { dbService, storageService } from "../fBase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [weet, setWeet] = useState("");
  const [weets, setWeets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const weetObj = {
      text: weet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("weets").add(weetObj);
    setWeet("");
    setAttachment("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWeet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Weet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
