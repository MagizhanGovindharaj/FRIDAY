import React, { useEffect, useRef, useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, addresult } from "./ReduxStore/Slice";
import { queryFriday } from "./Services/FridayServices";
import "../components/SpeechRecog.scss";

function SpeechRecog({ day }) {
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState({ listen: true });
  const textAreaRef = useRef(null);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();
  
  // Get the value of toggleBoolean from Redux state
  const toggleBoolean = useSelector((state) => state.toggleMenu);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.interimResults = false;

      recognitionRef.current.addEventListener("result", (e) => {
        const transcript = e.results[0][0].transcript;
        setText((prevText) => prevText + " " + transcript);
      });

      recognitionRef.current.addEventListener("end", () => {
        recognitionRef.current.stop();
        setToggle({ ...toggle, listen: true });
      });
    } else {
      console.log("Speech Recognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setToggle({ ...toggle, listen: false });
      setText(textAreaRef.current.value);
    }
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setToggle({ ...toggle, listen: true });
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const sendData = async () => {
    dispatch(addQuestion(text));
    setText("");
    const response = await queryFriday(text);
    dispatch(addresult({ text, response }));
  };

  const handleSend = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (text.trim()) {
        dispatch(addQuestion(text));
        setText("");
        const response = await queryFriday(text);
        dispatch(addresult({ text, response }));
      }
    }
  };

  return (
    <div 
      className={`speechbar ${!toggleBoolean ? 'responsive' : ''}`} 
      style={day ? { backgroundColor: "#f0f7ff" } : { backgroundColor: "#e4e4e4" }}
    >
      <div className="micattach">
        {toggle.listen ? (
          <FiMic className="speechicon" onClick={startListening} />
        ) : (
          <FiMicOff className="speechicon" onClick={stopListening} />
        )}
        <IoMdAttach className="attachment" />
      </div>
      <textarea
        type="text"
        ref={textAreaRef}
        value={text}
        rows={1}
        style={{ resize: "none", backgroundColor: "transparent" }}
        onChange={handleChange}
        onKeyDown={handleSend}
        className="textfield"
        placeholder="Ask Something..."
      />
      <div className="senddiv">
        <IoArrowUpCircleSharp
          className="sendicon"
          onClick={sendData}
          color={text ? "black" : "grey"}
        />
      </div>
    </div>
  );
}

export default SpeechRecog;
