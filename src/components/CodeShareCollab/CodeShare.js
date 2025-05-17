import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import "../CodeShareCollab/CodeShare.css";

const socket = io("https://multi-lang-compiler-backend-mudafbi5i.vercel.app//run");

function CodeShare() {
  const [code, setCode] = useState("// Share code with your friends..");
  const [roomId, setRoomId] = useState("");
  const [userRoomId, setUserRoomId] = useState("");
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  const editorRef = useRef(null);
  const isRemoteChange = useRef(false);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (userRoomId && !hasJoinedRoom) {
      socket.emit("join-room", userRoomId);
      setRoomId(userRoomId);
      setHasJoinedRoom(true);
    }
  }, [userRoomId, hasJoinedRoom]);

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(newRoomId);
    socket.emit("join-room", newRoomId);
    setHasJoinedRoom(true);
  };

  const handleJoinRoom = () => {
    if (userRoomId.trim() !== "") {
      socket.emit("join-room", userRoomId);
      setRoomId(userRoomId);
      setHasJoinedRoom(true);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);

    if (!isRemoteChange.current && roomId) {
      socket.emit("code-change", { roomId, code: value });
    }
  };

  useEffect(() => {
    socket.on("code-change", (newCode) => {
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        isRemoteChange.current = true;
        editorRef.current.setValue(newCode);
        setCode(newCode);
        isRemoteChange.current = false;
      }
    });

    return () => {
      socket.off("code-change");
    };
  }, []);

  return (
    <div className="Codeshare-main-container">
      <div className="Codeshare-main-container-glob-container">
        <Editor
          height="80vh"
          defaultLanguage="cpp"
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
        <div className="main-container-button-control">
          <div className="button-container-codeshare">
            <button button className="get-started" onClick={handleCreateRoom}>Create Room</button>
            <div>
              <h4>Share this Room ID with your friend:</h4>
              <p>{roomId}</p>
            </div>
          </div>

          <div className="join-button-for-codeshare">
            <h4>Or, join an existing room:</h4>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={userRoomId}
              onChange={(e) => setUserRoomId(e.target.value)}
            />
            <button button className="get-started" onClick={handleJoinRoom}>Join Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeShare;
