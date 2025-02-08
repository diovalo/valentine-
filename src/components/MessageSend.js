import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './styles/message.css';

export default function MessageSend() {
    const templateId = process.env.REACT_APP_API_EMAIL_JS_templateId;
    const serviceId = process.env.REACT_APP_API_EMAIL_JS_serviceId;
    const publicKey = process.env.REACT_APP_API_EMAIL_JS_publicKey;

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isSent, setIsSent] = useState("Send");
    const [messageInput, setMessageInput] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const navigate2 = useNavigate();

    useEffect(() => {
        setIsButtonDisabled(!(messageInput !== '' && date && time));
    }, [date, time, messageInput]);

    const handleSubmitMessage = (event) => {
        event.preventDefault();
        setIsSent("Sent");
        setIsButtonDisabled(true);

        const templateParams = {
            message: messageInput,
            date: date,
            time: time
        }

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                setTimeout(() => {
                    navigate2('/endpage')
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                setIsSent("Error");
                setIsButtonDisabled(false);
            });
    }

    return (
        <div className="message-form w-full max-w-md mx-auto mt-8 mb-12"> {/* Added mb-12 for bottom margin */}
            <div className="flex flex-col gap-6"> {/* Increased gap from 4 to 6 */}
                <div className="flex flex-row gap-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="flex-1 p-3 rounded-lg bg-white shadow-sm border border-pink-200"
                        placeholder="dd/mm/yyyy"
                    />
                    <div className="flex-1 relative">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white shadow-sm border border-pink-200"
                            placeholder="12:-- pm"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <textarea
                    className="w-full p-3 rounded-lg bg-white shadow-sm border border-pink-200 resize-none h-40" // Increased height from h-32 to h-40
                    placeholder="Message here..."
                    onChange={(e) => setMessageInput(e.target.value)}
                    value={messageInput}
                />
                <button
                    className={`px-6 py-2 rounded-lg bg-pink-400 text-white font-semibold mt-2
                        ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-500 active:bg-pink-600'} 
                        transition-all duration-200 ease-in-out`}
                    disabled={isButtonDisabled}
                    onClick={handleSubmitMessage}
                >
                    {isSent}
                </button>
            </div>
        </div>
    );
}