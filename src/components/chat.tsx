import { useState, useEffect, useRef } from 'react';
import { getSocket } from '../utils/socket';

export default function Chat({ senderEmail, recipientEmail }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const bottomRef             = useRef(null);
  const socket                = getSocket();

  useEffect(() => {
    socket.emit('join', { senderEmail, recipientEmail });
    socket.on('message', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('message');
  }, [senderEmail, recipientEmail]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const send = () => {
    if (!input.trim()) return;
    socket.emit('message', { senderEmail, recipientEmail, content: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m,i) => (
          <div key={i} className={m.senderEmail===senderEmail? 'text-right':'text-left'}>
            <span className="inline-block bg-gray-100 rounded px-3 py-1 m-1">
              <strong>{m.senderEmail.split('@')[0]}:</strong> {m.content}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 flex">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Type a message..."
        />
        <button onClick={send} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}