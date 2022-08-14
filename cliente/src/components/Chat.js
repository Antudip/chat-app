import React, { useState, useEffect, useRef } from "react";
import socket from '../socket/Socket'
import style from './Chat.module.css'
export default function Chat({ name }) {
    let [message, setMessage] = useState('');
    let [messageArray, setMessageArray] = useState([]);
    let divRef = useRef(null);

    
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    useEffect(() => {
        socket.emit('onLine', name);
    }, [name]);
    useEffect(() => {
        socket.on('toMessageArray', (messageAndAuthor) => {
            setMessageArray([...messageArray, messageAndAuthor]);
        });
        return () => {


            socket.off()
        }
    }, [messageArray]);

    function sendMessage(e) {
        if (message) {
            e.preventDefault();
            socket.emit('message', name, message);
            setMessage('');
        } else {
            e.preventDefault();
        }
    }

    return < >
        <div className={style.Chat}>
            {messageArray.map((e, i) => <div key={i}>{e.message}</div>)}
            <div ref={divRef}></div>
        </div>
        <form name="sendMessage" onSubmit={(e) => { sendMessage(e) }}>
            <textarea name="textArea" value={message} onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value)
            }}></textarea>
            <button type="submit">submit</button>
        </form>
    </>
}