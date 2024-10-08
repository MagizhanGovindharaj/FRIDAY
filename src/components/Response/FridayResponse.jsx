import React, { useEffect, useRef, useState } from "react";
import "../Response/FridayResponse.scss";
import SpeechRecog from "../SpeechRecog";
import { useSelector, useDispatch } from "react-redux";
import { TbPresentationAnalytics } from "react-icons/tb";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { FaGamepad } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { GiBowlOfRice } from "react-icons/gi";
import { MdCamera } from "react-icons/md";
import { addQuestion, addresult } from "../ReduxStore/Slice";
import { queryFriday } from "../Services/FridayServices";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import fridayimage from "../../assets/Robot_F.png";
import fridayjpg from "../../assets/Robot.jpg"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function FridayResponse() {
  const queryData = [
    {
      icon: <TbPresentationAnalytics color="white" />,
      content: "Help me with my Presentation",
    },
    {
      icon: <LiaFlagUsaSolid color="rgb(0, 238, 255)" />,
      content: "What's in the news in Tokyo Today",
    },
    {
      icon: <FaGamepad color="rgb(130, 255, 101)" />,
      content: "Design a fun coding game",
    },
    {
      icon: <CiImageOn color="rgb(0, 238, 255)" />,
      content: "Count the number of items in this image?",
    },
    {
      icon: <GiBowlOfRice color="#08ff9c" />,
      content: "How to Make a Biriyani",
    },
    {
      icon: <MdCamera color="violet" />,
      content: "Pick outfit to look good on camera",
    },
  ];
  const messageEndRef = useRef(null);
  const [initialQuery, setInitialQuery] = useState(
    queryData.sort(() => 0.5 - Math.random()).slice(0, 4)
  );

  const utterence = new SpeechSynthesisUtterance(
    "Hello There, I am Friday, Developed by Magilan How can i help You"
  );
  utterence.pitch = 1.2;
  utterence.rate = 0.9;

  const allData = useSelector((state) => state.questionData);
  const dispatch = useDispatch();
  const responseData = Object.entries(allData);

  // Function to adjust the number of items based on screen size
  function adjustLayoutBasedOnScreenSize(e) {
    if (e.matches) {
      setInitialQuery(initialQuery.slice(0, 2));
    } else {
      setInitialQuery(initialQuery.slice(0, 4));
    }
  }

  useEffect(() => {
    const matchQuery = window.matchMedia("(max-width: 500px)");
    adjustLayoutBasedOnScreenSize(matchQuery);

    matchQuery.addListener(adjustLayoutBasedOnScreenSize);

    return () => {
      matchQuery.removeListener(adjustLayoutBasedOnScreenSize);
    };
  }, []);

  const getQuery = async (text) => {
    dispatch(addQuestion(text));
    const response = await queryFriday(text);
    dispatch(addresult({ text, response }));
  };

  useEffect(() => {
    if (responseData.length === 0) {
      setTimeout(() => {
        window.speechSynthesis.speak(utterence);
      }, 2000);
    }
  }, []);

  useEffect(()=>{
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({Behavior:"smooth"});
    }
  },[responseData])

  return (
    <div className="responsetab">
      <div className="aicontent">
        {responseData.length !== 0 ? (
          responseData.map((element, index) => {
            return (
              <div className="innerdiv" key={index}>
                <section className="usersection">
                  <p className="query">{element[0]}</p>
                </section>
                <section className="ai section" ref={messageEndRef}>
                  <img src={fridayimage} alt="FRIDAY" />
                  {element[1].includes("```") ? (
                    <div className="result">
                      <p className="codeheader">
                        {element[1].split("\n", 1)[0].replace("```", "")}
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={okaidia}
                        className="texthighlighter"
                      >
                        {element[1]
                          .slice(0, element[1].indexOf("```", 3))
                          .split("\n")
                          .slice(1)
                          .join("\n")}
                      </SyntaxHighlighter>
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        className="code-content"
                      >
                        {element[1].slice(element[1].indexOf("```", 3) + 3)}
                      </Markdown>
                    </div>
                  ) : (
                    <pre className="alternatepara">{element[1]}</pre>
                  )}
                </section>
              </div>
            );
          })
        ) : (
          <div className="initial">
            <img src={fridayjpg} alt="Friday" />
            <section>
              {initialQuery.map((element, index) => {
                return (
                  <div
                    className="articlediv"
                    key={index}
                    onClick={() => {
                      getQuery(element.content);
                    }}
                  >
                    {element.icon}
                    <article>{element.content}</article>
                  </div>
                );
              })}
            </section>
          </div>
        )}
        <SpeechRecog/>
        {/* <section className="emptyspace"></section> */}
      </div>
    </div>
  );
}

export default FridayResponse;
