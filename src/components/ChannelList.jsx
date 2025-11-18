function Divider({ label }) {
  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300/70">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
        <span className="bg-slate-800/70 px-2 py-0.5 rounded-full border border-white/10 shadow-sm">{label}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
      </div>
    </div>
  )
}

function ChannelList({ channels, activeChannelId, onSelectChannel }) {
  const groups = {
    text: channels.filter(c => c.type === 'text'),
    announcement: channels.filter(c => c.type === 'announcement'),
    voice: channels.filter(c => c.type === 'voice'),
  }

  const Item = ({ ch }) => (
    <button
      onClick={() => onSelectChannel(ch.id)}
      className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors group ${
        activeChannelId === ch.id ? 'bg-slate-700/50 text-white' : 'text-slate-300 hover:bg-slate-800/60'
      }`}
    >
      <span className="text-slate-400">#</span>
      <span className="truncate">
        {ch.name}
      </span>
      {ch.topic && (
        <span className="ml-auto text-[10px] text-slate-400/70 group-hover:text-slate-300/70">
          {ch.topic}
        </span>
      )}
    </button>
  )

  return (
    <div className="w-64 bg-slate-900/60 backdrop-blur border-r border-white/10 flex flex-col">
      <div className="p-3 border-b border-white/10">
        <div className="text-sm font-semibold text-white truncate">Channels</div>
      </div>
      <div className="flex-1 overflow-y-auto py-2 space-y-2">
        {groups.text.length > 0 && (
          <>
            <Divider label="Text" />
            {groups.text.map(ch => <Item key={ch.id} ch={ch} />)}
          </>
        )}
        {groups.announcement.length > 0 && (
          <>
            <Divider label="Announcements" />
            {groups.announcement.map(ch => <Item key={ch.id} ch={ch} />)}
          </>
        )}
        {groups.voice.length > 0 && (
          <>
            <Divider label="Voice" />
            {groups.voice.map(ch => <Item key={ch.id} ch={ch} />)}
          </>
        )}
      </div>
    </div>
  )
}

export default ChannelList
