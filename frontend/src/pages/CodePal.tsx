import { useEffect, useState, useRef } from "react";
import Markdown from "react-markdown";
import { Chat, Message, InteractRequest, ChatbotService } from "../api";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

export default function CodePal() {
  const { user } = useAuth();

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Fetch chats only when user is available.
  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  // When a chat is selected, load its messages.
  useEffect(() => {
    if (currentChatId) {
      fetchMessages(currentChatId);
    } else {
      setMessages([]);
    }
  }, [currentChatId]);

  // Auto-scroll to the bottom on messages change.
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chats from the backend.
  const fetchChats = async () => {
    try {
      const response = await ChatbotService.listChatsChatsGet();
      setChats(response);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch messages for a specific chat.
  const fetchMessages = async (chatId: string) => {
    try {
      const response =
        await ChatbotService.getChatMessagesChatsChatIdMessagesGet(chatId);
      setMessages(response);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Create a new chat by clearing the current chat.
  const createNewChat = () => {
    setCurrentChatId("");
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !user) return;
    setLoading(true);

    // Immediately update UI with the user's message.
    const userMessage: Message = {
      id: "", // Temporary id
      sender: "User",
      content: input,
      chatId: currentChatId,
      createdAt: "",
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Build payload for the merged interact endpoint.
    const payload: InteractRequest = {
      chat_id: currentChatId, // If empty, backend auto-creates a new chat.
      user_message: currentInput,
    };

    try {
      // Call the interact endpoint.
      const response = await ChatbotService.interactChatsInteractPost(payload);
      const botReply = response.response;

      // Append bot's reply.
      const botMessage: Message = {
        id: "",
        sender: "Bot",
        content: botReply,
        chatId: currentChatId,
        createdAt: "",
      };
      setMessages((prev) => [...prev, botMessage]);

      // Refresh the chat list.
      const updatedChats = await ChatbotService.listChatsChatsGet();
      setChats(updatedChats);

      // If no chat was previously selected (i.e. a new chat was auto-created),
      // update currentChatId to the newest chat based on updatedAt.
      if (!currentChatId && updatedChats.length > 0) {
        const sortedChats = updatedChats.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        setCurrentChatId(sortedChats[0].id);
      }
    } catch (error) {
      console.error("Error during interaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Background />
      <Navbar />
      {/* Main Chat Container */}
      <div className="flex flex-1 bg-gray-200 overflow-hidden">
        {/* Left Panel: Chat History */}
        <div className="w-1/4 flex flex-col bg-white p-4 border-r border-gray-300 overflow-hidden">
          <h2 className="text-2xl mt-8 mb-5">Your Chats</h2>
          <button
            onClick={createNewChat}
            className="w-full py-2 px-3 mb-3 text-left bg-green-600 text-white rounded"
          >
            + New Chat
          </button>
          {/* Chat list scrolls independently */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentChatId(chat.id);
                  if (chat.id) fetchMessages(chat.id);
                  else setMessages([]);
                }}
                className={`w-full py-2 px-3 mb-3 text-left rounded cursor-pointer ${
                  currentChatId === chat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Window */}
        <div className="w-3/4 flex flex-col overflow-hidden">
          {/* Message Display Area scrolls independently */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-white p-5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 p-3 max-w-[80%] rounded-lg ${
                  msg.sender === "User"
                    ? "self-end bg-blue-600 text-white"
                    : "self-start bg-gray-200 text-black"
                }`}
              >
                {msg.sender === "Bot" ? (
                  <Markdown>{msg.content}</Markdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
            {loading && (
              <div className="text-center mt-2 italic">Thinking...</div>
            )}
          </div>
          {/* Input Area fixed at bottom */}
          <div className="bg-gray-300 p-2 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded mr-3"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
