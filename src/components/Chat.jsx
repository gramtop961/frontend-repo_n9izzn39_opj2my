import { useEffect, useRef, useState } from 'react'

function MessageBubble({ m }) {
  return (
    <div className="group flex items-start gap-3 px-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center text-white text-xs font-bold shadow" title={m.author_name}>
        {m.author_name?.slice(0,2).toUpperCase()}
      </div>
      <div className="flex-1 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white/90">{m.author_name}</span>
          <span className="text-[10px] text-slate-400">{new Date(m.created_at || Date.now()).toLocaleString()}</span>
        </div>
        <div className="text-slate-200 leading-relaxed">
          {m.content}
        </div>
      </div>
    </div>
  )
}

function Chat({ channel, messages, onSend }) {
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, channel?.id])

  const handleSend = () => {
    const value = text.trim()
    if (!value) return
    onSend(value)
    setText('')
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/40">
      {/* Header */}
      <div className="h-14 flex items-center gap-3 border-b border-white/10 px-4">
        <div className="text-white text-lg font-semibold">#{channel?.name || 'select-a-channel'}</div>
        {channel?.topic && <div className="text-xs text-slate-400">{channel.topic}</div>}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map(m => (
          <div key={m.id}>
            <MessageBubble m={m} />
            {/* glossy divider */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-white/10 p-3">
        <div className="bg-slate-800/70 border border-white/10 rounded-xl overflow-hidden shadow-inner flex">
          <input
            className="flex-1 bg-transparent outline-none px-4 py-3 text-slate-100 placeholder-slate-400"
            placeholder={`Message #${channel?.name || ''}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? (e.preventDefault(), handleSend()) : null}
          />
          <button onClick={handleSend} className="px-4 text-white bg-gradient-to-br from-indigo-500 to-fuchsia-600 hover:opacity-90 transition-opacity">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
