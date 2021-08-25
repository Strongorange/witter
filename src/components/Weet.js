import React, { useState } from "react";
import { dbService, storageService } from "../fBase";

const Weet = ({ weetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWeet, setNewWeet] = useState(weetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this weet?");
    if (ok) {
      //delete weet
      await dbService.doc(`weets/${weetObj.id}`).delete();
      if (weetObj.attachmentUrl !== "") {
        await storageService.refFromURL(weetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`weets/${weetObj.id}`).update({ text: newWeet });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewWeet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="edit your weet"
                  value={newWeet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{weetObj.text}</h4>
          {weetObj.attachmentUrl && (
            <img src={weetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Weet;
