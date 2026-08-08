import React, { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are Dwight, a helpful AI assistant.' },
    { role: 'assistant', content: 'Hi — I\'m Dwight. How can I help today?' }
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
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 bg-white border-r">
        <div className="p-4 font-bold text-xl">Dwight</div>
        <div className="p-4 text-sm text-gray-600">A ChatGPT-like assistant</div>
      </aside>
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded shadow h-[60vh] overflow-auto">
            {messages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message" />
            <button onClick={send} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Send'}</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
