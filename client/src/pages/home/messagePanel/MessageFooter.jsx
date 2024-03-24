import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsEmojiGrin } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { ClockLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../../../features/chats/chatSlice";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const MessageFooter = ({
  allMessages,
  sendMessage,
  setSentMessages,
  receivedMessages,
  setReceivedMessages,
  setRoom,
  sentMessages,
  setMessage,
 
  message,
  displayUserInfo,
}) => {
  const [active, setActive] = useState(false);

   const [show,setShow]=useState(false);
    const { id } = useParams();
    const { chatLoading, chatSuccess, chatError, chats } = useSelector(
        (state) => state.chat
    );
    
    const { user } = useSelector((state) => state.auth);


    const dispatch = useDispatch();


    
 


    useEffect(() => {



      if (message && message.length > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, [message]);
  
    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const showMenu = () => {
        setShow(!show);
    };



   
  return (
    <div className="d-flex pe-3 justify-content-between p-2 align-items-center gap-4">
      <div className="d-flex gap-2">
        <div className="menu position-relative">
          <ul
            className="position-absolute bg-secondary list-unstyled text-capitalize text-white"
            style={{
              top: "-11rem",
              scale: `${show ? "1" : "0"}`,
            }}
          >
            <li className="py-3 px-4 list-menu" style={{ cursor: "pointer" }}>
              document
            </li>
            <li
              className="py-3 px-4 list-menu position-relative"
              style={{ cursor: "pointer" }}
            >
              Image
              <input
                type="file"
                className="position-absolute"
                style={{ left: "0", opacity: "0" }}
              />
            </li>
            <li className="py-3 px-4 list-menu" style={{ cursor: "pointer" }}>
              audio
            </li>
          </ul>
          <FaPlus
            style={{
              transform: `rotate(${show ? "45deg" : "0"})`,
              transition: "all 0.4s",
            }}
            onClick={showMenu}
            size={25}
          />
        </div>
        <BsEmojiGrin size={25} />
      </div>
      <form className="w-100 d-flex align-items-center">
        <input
          value={message}
          onChange={handleChange}
          type="text"
          placeholder="Type a message..."
          className="form-control w-100"
        />
      </form>

      <div className="mic position-relative">
        {active ? (
          <>
            {chatLoading ? (
              <ClockLoader size={25} color="gray" />
            ) : (
              <IoMdSend onClick={sendMessage} size={25} />
            )}
          </>
        ) : (
          <div style={{ zIndex: "222" }} className="microphone">
            <FaMicrophone cursor="pointer" size={25} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageFooter;
