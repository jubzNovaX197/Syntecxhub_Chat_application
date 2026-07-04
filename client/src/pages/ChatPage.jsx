import { useEffect, useRef, useState } from "react";
import { LogOut, Send } from "lucide-react";

import Button from "../components/Button/Button";
import { useAuth } from "../context/AuthContext";

import { getUsers } from "../services/userService";
import {
  getConversations,
  createConversation,
} from "../services/conversationService";
import {
  getMessages,
  sendMessage,
} from "../services/messageService";

import {
  connectSocket,
  getSocket,
} from "../services/socketService";

import "./ChatPage.css";

const ChatPage = () => {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    loadInitialData();
    connectSocket();
  }, []);

  const loadInitialData = async () => {
    try {
      const userList = await getUsers();
      const conversationList = await getConversations();

      setUsers(userList);
      setConversations(conversationList);
    } catch (err) {
      console.error(err);
    }
  };
  const openConversation = async (selectedUser) => {
    try {
      let conversation = conversations.find((conv) =>
        conv.participants.some(
          (participant) => participant._id === selectedUser._id
        )
      );

      if (!conversation) {
        conversation = await createConversation(selectedUser._id);

        setConversations((prev) => [conversation, ...prev]);
      }

      setSelectedConversation(conversation);

      const chatMessages = await getMessages(conversation._id);

      setMessages(chatMessages);

      const socket = getSocket();

      socket.emit("conversation:join", {
        conversationId: conversation._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!selectedConversation) return;

    try {
      const message = await sendMessage(
        selectedConversation._id,
        text
      );

      // setMessages((prev) => [...prev, message]);

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    socket.on("message:new", (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) {
          return prev;
        }

        return [...prev, message];
      });
    });

    return () => {
      socket.off("message:new");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  return (
    <main className="chat-shell">
      <aside className="chat-sidebar">
        <div className="profile-card">
          <div className="userName">{user?.name}</div>
          {/* <div className="userId">@{user?.username}</div> */}
        </div>

        <h3>Users</h3>

        <div className="user-list">
          {users.map((u) => (
            <div
              key={u._id}
              className={`user-card ${selectedConversation?.participants.some(
                (p) => p._id === u._id
              )
                ? "active-user"
                : ""
                }`}
              onClick={() => openConversation(u)}
            >
              <strong>{u.name}</strong>
              <p>@{u.username}</p>
            </div>
          ))}
        </div>
        <Button className="logout-button" onClick={logout}>
          <LogOut size={18} />
          Logout
        </Button>
      </aside>

      <section className="chat-stage">
        {!selectedConversation ? (
          <div className="empty-conversation">
            <h2>Select a user to start chatting</h2>
          </div>
        ) : (
          <>
            <div className="message-list">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message-row ${message.sender._id === user._id ? "own" : "other"
                    }`}
                >
                  <div className="message-bubble">
                    <p>{message.content}</p>

                    <span className="message-time">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            <div className="message-input">
              <input
                type="text"
                placeholder="Type message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <Button onClick={handleSend}>
                <Send size={18} />
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default ChatPage;