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
import fridayimage from "../../assets/Robot_F.png";
import fridayjpg from "../../assets/Robot.jpg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "../Navbar/Navbar";
import { CopyToClipboard } from "react-copy-to-clipboard";

function FridayResponse() {
  const queryData = [
    {
      icon: <TbPresentationAnalytics color="#d48907" />,
      content: "Help me with my Presentation",
    },
    {
      icon: <LiaFlagUsaSolid color="rgb(0, 238, 255)" />,
      content: "What's in the news in Tokyo Today",
    },
    {
      icon: <FaGamepad color="#438610" />,
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
  const [day, setDay] = useState(null);
  const [initialQuery, setInitialQuery] = useState(
    queryData.sort(() => 0.5 - Math.random()).slice(0, 4)
  );

  const utterence = new SpeechSynthesisUtterance(
    "Hello There, I am Friday, How can i help You"
  );
  utterence.pitch = 1.2;
  utterence.rate = 0.9;

  const allData = useSelector((state) => state.questionData);
  const dispatch = useDispatch();
  const responseData = Object.entries(allData);

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
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const currentHour = Number(new Date().getHours());

    if (currentHour >= 6 && currentHour < 18) {
      setDay(true);
      document.body.style.backgroundColor = "white"; 
    } else {
      setDay(false);
      document.body.style.backgroundColor = "#212121";
    }
  }, [responseData]);

  return (
    <div className="responsetab">
      <Navbar className="nav" day={day}/>
      <div className="aicontent">
        {responseData.length !== 0 ? (
          responseData.map((element, index) => {
            return (
              <div className="innerdiv" key={index}>
                <section className="usersection">
                  <p className={!day ? "queryday" : "querynight"}>
                    {element[0]}
                  </p>
                </section>
                <section className="ai section" ref={messageEndRef}>
                  <img src={fridayimage} alt="FRIDAY" />
                  <div className={!day ? "result" : "resultey"}>
                    <ReactMarkdown
                      children={element[1]}
                      remarkPlugins={[remarkGfm]}
                      className="displaycontent"
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");

                          const [isCopied, setIsCopied] = useState(false);

                          const handleCopy = () => {
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 3000);
                          };

                          return !inline && match ? (
                            <div
                              style={{
                                position: "relative",
                                marginBottom: "20px",
                              }}
                            >
                              <div
                                style={{
                                  color: "white",
                                  backgroundColor: "rgb(68, 68, 68)",
                                  padding: "10px",
                                  fontSize: "14px",
                                  fontFamily: '"Roboto Mono", monospace',
                                  fontWeight: 700,
                                  borderTopLeftRadius: "4px",
                                  borderTopRightRadius: "4px",
                                }}
                              >
                                {match[1].toUpperCase()} Code
                              </div>

                              <div style={{ position: "relative" }}>
                                <SyntaxHighlighter
                                  style={okaidia}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                  className="syntaxhighlighter"
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>

                                {/* Copy Button positioned within the SyntaxHighlighter */}
                                <CopyToClipboard text={String(children)}>
                                  <button
                                    onClick={handleCopy}
                                    style={{
                                      position: "absolute",
                                      top: "-41px",
                                      right: "10px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "0px 10px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {isCopied ? "Copied!" : "Copy"}
                                  </button>
                                </CopyToClipboard>
                              </div>
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        ul: ({ children }) => (
                          <ul
                            className={
                              !day
                                ? "list-disc pl-5 mb-4 text-gray-50"
                                : "list-disc pl-5 mb-4 text-zinc-950"
                            }
                          >
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol
                            className={
                              !day
                                ? "list-decimal pl-5 mb-4 text-white"
                                : "list-decimal pl-5 mb-4 text-zinc-950"
                            }
                          >
                            {children}
                          </ol>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    />
                  </div>
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
                    className={!day?"articlediv":"articledivday"}
                    key={index}
                    onClick={() => {
                      getQuery(element.content);
                    }}
                  >
                    {element.icon}
                    <article className={!day?"article":"articleday"} >{element.content}</article>
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </div>
      <SpeechRecog  day={day} />
    </div>
  );
}

export default FridayResponse;
