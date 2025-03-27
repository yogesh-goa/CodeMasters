import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import { formatDistanceToNow } from 'date-fns';

// Define message type for better type safety
interface Message {
  id?: string;
  username: string;
  text: string;
  timestamp?: Date;
}

const Community: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<any>(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
        });

        // Fetch previous messages
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`);
                if (!res.ok) throw new Error('Failed to fetch messages');
                const data: Message[] = await res.json();
                
                // Add timestamps if not present
                const processedMessages = data.map(msg => ({
                    ...msg,
                    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
                }));

                setMessages(processedMessages);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load chat history.");
                setIsLoading(false);
            }
        };

        fetchMessages();

        // Listen for real-time messages
        socketRef.current.on("message", (msg: Message) => {
            const newMsg = {
                ...msg,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, newMsg]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        // Auto-scroll to the latest message
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission
        
        if (!newMessage.trim() || !user) return;

        const msgData: Message = { 
            username: user.username || "Guest", 
            text: newMessage.trim(),
            timestamp: new Date()
        };

        try {
            socketRef.current.emit("message", msgData);
            setNewMessage(""); // Clear input
        } catch (err) {
            setError("Message failed to send.");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage(e as any);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">💬 Community Chat</h1>

                <div className="h-[500px] overflow-y-auto bg-gray-700 p-4 rounded-lg mb-4 space-y-3">
                    {messages.length === 0 ? (
                        <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-3 rounded-lg ${
                                    msg.username === user?.username 
                                    ? 'bg-blue-800 self-end' 
                                    : 'bg-gray-600'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-blue-300">
                                        {msg.username}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatDistanceToNow(msg.timestamp || new Date(), { addSuffix: true })}
                                    </span>
                                </div>
                                <p>{msg.text}</p>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} /> 
                </div>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                {user ? (
                    <form onSubmit={sendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={500} // Prevent overly long messages
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </form>
                ) : (
                    <p className="text-gray-400 text-center">Log in to join the chat.</p>
                )}
            </div>
        </div>
    );
};

export default Community;