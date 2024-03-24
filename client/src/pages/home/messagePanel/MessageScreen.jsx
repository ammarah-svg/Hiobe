import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageHeader from "./MessageHeader";
import MessageFooter from "./MessageFooter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../../../features/chats/chatSlice";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const MessageScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { allUsers, user } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.chat);
    const [message, setMessage] = useState("");
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const displayUserInfo = () => {
        return allUsers?.find((myUser) => myUser?._id === id);
    };


    const sendMessage = (e) => {
        e.preventDefault();
        const chatData = {
            sender_id: user?._id,
            receiver_id: id,
            message,
        };
 socket.emit('send_message', { message, roomID: chats?._id });

        setSentMessages([
            ...sentMessages,
            { message, sent: true, sortID: Date.now(), roomID: chats?._id },
        ]);

        dispatch(addChatMessage(chatData));
        setMessage("");
    };


    useEffect(() => {
        socket.on("received_message", (data) => {
            console.log(data)
            setReceivedMessages([
                ...receivedMessages,
                {
                    message: data.message,
                    sent: false,
                    sortID: Date.now(),
                    voice: data?.voice,
                    roomID: chats?._id,
                    image: data.image,
                },
            ]);
        });
     
    }, [receivedMessages]);
    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => a.sortID - b.sortID);

    const setRoom = () => {
        socket.emit("join_room", { roomID: chats?._id });
    };

    return (
        <div
            className="w-100 position-relative d-flex flex-column justify-content-between"
            style={{
                backgroundImage: `url(https://t3.ftcdn.net/jpg/01/45/98/44/360_F_145984487_DL8iRAYW1urhGsEO1gSg0MmP9lya1oJ4.jpg)`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            <MessageHeader displayUserInfo={displayUserInfo} />
            <Messages allMessages={allMessages} />
            <MessageFooter message={message} setMessage={setMessage} sendMessage={sendMessage} sentMessages={sentMessages} setSentMessages={setSentMessages} receivedMessages={receivedMessages} />
        </div>
    );
};

export default MessageScreen;
