import React, { useState } from 'react'
import Logo from './logo.svg'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are Dwight, a helpful AI assistant.' },
    { role: 'assistant', content: "Hi — I'm Dwight. How can I help today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input) return;
    const userMsg = { role: 'user', content: input };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      const assistantText = data?.choices?.[0]?.message?.content || data?.error?.message || 'No response';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex">
      <aside className="w-72 bg-black border-r border-yellow-700">
        <div className="p-4 flex items-center gap-3">
          <img src={Logo} alt="Dwight logo" className="w-10 h-10" />
          <div className="font-bold text-2xl text-yellow-300">Dwight</div>
        </div>
        <div className="p-4 text-sm text-yellow-300">A ChatGPT-like assistant — black & yellow theme</div>
      </aside>
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 p-4 rounded shadow h-[60vh] overflow-auto">
            {messages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded ${m.role === 'user' ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 border border-yellow-700 bg-gray-900 text-yellow-200 rounded" placeholder="Type a message" />
            <button onClick={send} disabled={loading} className="px-4 py-2 bg-yellow-400 text-black rounded">{loading ? '...' : 'Send'}</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
