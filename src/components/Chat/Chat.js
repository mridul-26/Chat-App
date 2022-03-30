import React,{ useState, useEffect } from "react";
import { useLocation } from "react-router";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
    const data = useLocation().search;
    const [room,setRoom] = useState('');
    const [name,setName] = useState('');

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(data);
    
        socket = io(ENDPOINT,{
            withCredentials:false
        })
    
        setName(name);
        setRoom(room);

        // console.log(socket);
        socket.emit('join', { name, room }, () => {

        });
        // console.log(name);
        // console.log(room);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    },[ENDPOINT, data]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();


        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    // console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room = {room}/>
                <Messages 
                    messages={messages}
                    name={name}    
                />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
                {/* <input 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null} /> */}
            </div>
        </div>
    )
}

export default Chat;