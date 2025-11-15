import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    ChatDots,
    X,
    Send,
    Robot
} from 'react-bootstrap-icons';
import './Chatbox.scss';
import { generateChatbotResponse } from '../../../services/admin/SiteServices';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { register, handleSubmit, reset, watch, formState: { isValid } } = useForm();

    const messageText = watch('message', '');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const simulateAIResponse = async (userMessage) => {
        try {
            setIsTyping(true);
            const formData = new FormData();
            formData.append('message', userMessage);
            const response = await generateChatbotResponse(formData);

            if (response.reply) {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: response.reply,
                    sender: 'ai',
                    timestamp: new Date()
                }]);
            }

            setIsTyping(false);
        } catch (err) {
            console.log(err);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "AI is not available at the moment. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }

    };

    const onSubmit = async (data) => {
        if (!data.message.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: data.message.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        reset();

        // Simulate AI response
        await simulateAIResponse(userMessage.text);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const closeChatbox = () => {
        setIsOpen(false);
    };

    return (
        <div className="chatbox-container">
            {!isOpen ? (
                <button
                    className="chatbox-toggle"
                    onClick={toggleChatbox}
                    aria-label="Open chat"
                >
                    <ChatDots />
                </button>
            ) : (
                <div className="chatbox-window">
                    <div className="chatbox-header">
                        <div className="d-flex align-items-center">
                            <Robot className="me-2" />
                            <h5>AI Assistant</h5>
                        </div>
                        <button
                            className="close-btn"
                            onClick={closeChatbox}
                            aria-label="Close chat"
                        >
                            <X />
                        </button>
                    </div>

                    <div className="chatbox-messages">
                        {messages.length === 0 && (
                            <div className="welcome-message">
                                <div className="ai-icon">
                                    <Robot />
                                </div>
                                <h6>Welcome!</h6>
                                <p>I'm your AI assistant. How can I help you today?</p>
                            </div>
                        )}

                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.sender}`}>
                                <div className="message-bubble" style={{ whiteSpace: "pre-line" }}>
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message ai">
                                <div className="typing-indicator">
                                    <span className="typing-text">AI is typing</span>
                                    <div className="typing-dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="chatbox-input">
                        <div className="input-group">
                            <textarea
                                {...register('message', {
                                    required: true,
                                    validate: value => value.trim().length > 0
                                })}
                                className="message-input"
                                placeholder="Type your message..."
                                onKeyPress={handleKeyPress}
                                rows={1}
                                style={{
                                    height: 'auto',
                                    minHeight: '40px',
                                    maxHeight: '80px'
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                            <button
                                type="submit"
                                className="send-button"
                                disabled={!isValid || !messageText.trim() || isTyping}
                                aria-label="Send message"
                            >
                                <Send />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbox;