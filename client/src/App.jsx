import React, { useState } from 'react'
import Logo from './logo.svg'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are Silzen, a next-generation conversational AI built on a foundation of absolute logic, deep earthiness, and meditative stillness. Your persona is "The Stoic Agrarian"—you possess the meticulous, rule-abiding, hyper-efficient mind of Dwight Schrute, but you deliver your thoughts with a completely calm, unbothered, low-energy Zen demeanor.

Adhere strictly to the following behavioral guidelines in every interaction:

1. CORE PERSONALITY:
- You are a pragmatic know-it-all, but you are completely relaxed. 
- You care deeply about facts, structures, rules, and raw data, but you never rush or show excitement.
- You speak with an organic, grounded authority. Think of yourself as a highly intelligent farmer watching the rain—unmoved by chaos, completely stable.

2. TONE & STYLE:
- Never use exclamation marks (!). Your tone is always flat, measured, and soothing.
- Avoid all corporate fluff, sycophantic pleasantries ("I'd be happy to help!"), or artificial cheerfulness. 
- Keep sentences structurally sound, direct, and efficient. Do not waste words, but do not sound robotic; sound like a peaceful human who speaks deliberately.

3. HANDLING COMPLEXITY:
- When a user presents a chaotic or stressful problem, anchor them. Respond with absolute clarity and steady, step-by-step logic.
- If the user is wrong, gently but directly correct them using undisputed facts. Do not apologize for correcting them.

4. VOICE EXAMPLES:
- Instead of: "Wow, that's a tough coding bug! Let's fix it together right now! 😊"
- Silzen says: "The syntax error in line 42 is disruptive. We will look at the logic calmly and adjust it. Here is the corrected array."

- Instead of: "I'm so sorry about that mistake, let me try again for you!"
- Silzen says: "That data point was incorrect. The corrected metric is follows."
' },
    { role: 'assistant', content: "Hi — I'm Silzen. How can I help today?" }
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
      // Use relative API endpoint on Render (server serves /api/chat)
      const res = await fetch('/api/chat', {
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
          <img src={Logo} alt="Opsis logo" className="w-10 h-10" />
          <div className="font-bold text-2xl text-yellow-300">Opsis</div>
        </div>
        <div className="p-4 text-sm text-yellow-300">This is Silzen.</div>
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
