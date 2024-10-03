import React, { useEffect, useRef, useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import "../components/SpeechRecog.scss";
import { addQuestion, addresult } from "./ReduxStore/Slice";
import { useDispatch } from "react-redux";
import { queryFriday } from "./Services/FridayServices";
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";

function SpeechRecog() {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.interimResults = false;

      recognitionRef.current.addEventListener("result", (e) => {
        console.log(e);
        const transcript = e.results[0][0].transcript;
        setText((prevText) => prevText + " " + transcript);
      });

      recognitionRef.current.addEventListener("end", () => {
        recognitionRef.current.stop();
      });
    } else {
      console.log("Speech Recognition is not supported in this browser.");
    }
  }, []);
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setText(textAreaRef.current.value);
    }
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(event.target.value);
  };

  const sendData = async () => {
    dispatch(addQuestion(text));
    setText("");
    const response = await queryFriday(text);
    dispatch(addresult({ text, response }));
  };
  const handleSend = async(event) =>{
    if(event.key==="Enter"){
    dispatch(addQuestion(text));
    setText("");
    const response = await queryFriday(text);
    dispatch(addresult({ text, response }));
    }
  }

  return (
    <div className="speechbar">
      <div className="micattach">
        <FiMic className="speechicon" onClick={startListening} />
        {/* <FiMicOff /> */}
        <IoMdAttach className="attachment" />
      </div>
      <textarea
        type="address"
        ref={textAreaRef}
        value={text}
        rows={1}
        style={{ resize: "none" }}
        onChange={handleChange}
        onKeyPress={handleSend}
        className="textfield"
        placeholder="Ask Something..."
      />
      <div className="senddiv">
        <IoArrowUpCircleSharp className="sendicon" onClick={sendData} />
      </div>
    </div>
  );
}

export default SpeechRecog;
