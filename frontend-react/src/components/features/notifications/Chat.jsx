import { useState, useEffect, useRef } from 'react';
import { Button } from '../../common/Button';

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Disconnected');
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setStatus('Connecting...');
    const token = localStorage.getItem('access_token');
    if (!token) {
        setStatus('Unauthenticated');
        return;
    }
    socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${token}`);

    socketRef.current.onopen = () => setStatus('Connected 🟢');
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'history') {
        setMessages(data.messages);
      } else if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      }
    };
    socketRef.current.onclose = () => setStatus('Disconnected 🔴');
    socketRef.current.onerror = () => setStatus('Error 🔴');

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socketRef.current?.readyState === WebSocket.OPEN && newMessage.trim()) {
      socketRef.current.send(JSON.stringify({ message: newMessage }));
      setNewMessage('');
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 mt-12 shadow-xl border border-gray-800 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-[#bb86fc]"></div>
      
      <div className="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-3">
        <h2 className="text-[#bb86fc] text-lg font-bold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
          Live Intercom
        </h2>
        <span className="text-gray-400 text-xs uppercase tracking-wider px-3 bg-gray-800 rounded-full py-1 font-semibold">{status}</span>
      </div>
      
      <div className="h-64 overflow-y-auto bg-background rounded-lg p-4 mb-4 space-y-4 custom-scrollbar shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className="p-3.5 rounded-xl text-sm w-fit max-w-[85%] leading-relaxed bg-gray-800 text-gray-200 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[#bb86fc] text-xs uppercase tracking-wide">{msg.author || 'System'}</span>
              <span className="text-xs text-gray-500 font-mono">{msg.timestamp}</span>
            </div>
            <p className="text-[15px] opacity-90">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && <div className="text-center text-gray-600 italic mt-12 text-sm">No historical messages found...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-3 relative">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={status !== 'Connected 🟢'}
          placeholder="Secure Broadcast..."
          className="flex-1 bg-gray-800 border border-gray-700 p-3.5 rounded-lg text-white focus:ring-2 focus:ring-[#bb86fc]/50 focus:border-[#bb86fc] outline-none disabled:opacity-50 transition-all font-medium"
        />
        <Button type="submit" disabled={status !== 'Connected 🟢'} className="bg-[#bb86fc] text-black hover:bg-purple-400 px-6 font-bold shadow-lg shadow-purple-900/40">
          Transmit
        </Button>
      </form>
    </div>
  );
};
