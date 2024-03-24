import React from "react";
import { useSelector } from "react-redux";

const Messages = ({ allMessages, audioBlob }) => {
    const { chats } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);

    const filteredMessage = () => {
        const myMessages = allMessages.filter((msgs) => {
            return msgs.roomID === chats?._id;
        });

        return myMessages;
    };

    return (
        <>
            <div
                style={{
                    height: "80%",
                    top: "10%",
                    overflowY: "scroll",
                }}
                className="position-absolute w-100 px-2"
            >
              
                {filteredMessage()?.map((msg, index) => {
                   console.log (msg)
                   return (
                        <>
                            {msg.sent ? (
                                <p
                                    className="bg-success p-3 text-white ms-auto rounded-3"
                                    style={{ width: "max-content" }}
                                >
                                    

                                    {msg.message}
                                </p>
                            ) : (
                                <p
                                    className="bg-secondary p-3 text-white me-auto rounded-3"
                                    style={{ width: "max-content" }}
                                >
                                    

                                    {msg.message}
                                </p>
                            )}
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default Messages;