import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChannelList from './components/ChannelList'
import Chat from './components/Chat'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [servers, setServers] = useState([])
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])
  const [activeServerId, setActiveServerId] = useState(null)
  const [activeChannelId, setActiveChannelId] = useState(null)
  const activeChannel = useMemo(() => channels.find(c => c.id === activeChannelId), [channels, activeChannelId])

  // Load initial data
  useEffect(() => {
    const init = async () => {
      try {
        await fetch(`${API}/api/seed`, { method: 'POST' })
      } catch {}
      const res = await fetch(`${API}/api/servers`)
      const svs = await res.json()
      setServers(svs)
      const first = svs[0]
      if (first) {
        setActiveServerId(first.id)
      }
    }
    init()
  }, [])

  // When server changes, load channels
  useEffect(() => {
    const run = async () => {
      if (!activeServerId) return
      const res = await fetch(`${API}/api/servers/${activeServerId}/channels`)
      const ch = await res.json()
      setChannels(ch)
      setActiveChannelId(ch[0]?.id || null)
    }
    run()
  }, [activeServerId])

  // When channel changes, load messages
  useEffect(() => {
    const run = async () => {
      if (!activeChannelId) return
      const res = await fetch(`${API}/api/channels/${activeChannelId}/messages`)
      const ms = await res.json()
      setMessages(ms)
    }
    run()
  }, [activeChannelId])

  const sendMessage = async (text) => {
    if (!activeChannelId) return
    const payload = { author_id: 'demo', author_name: 'You', content: text }
    const res = await fetch(`${API}/api/channels/${activeChannelId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const saved = await res.json()
    setMessages((prev) => [...prev, saved])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* fancy background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.12]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-fuchsia-500 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500 blur-[140px]" />
      </div>

      <Sidebar servers={servers} activeServerId={activeServerId} onSelectServer={setActiveServerId} />
      <ChannelList channels={channels} activeChannelId={activeChannelId} onSelectChannel={setActiveChannelId} />
      <Chat channel={activeChannel} messages={messages} onSend={sendMessage} />
    </div>
  )
}

export default App
