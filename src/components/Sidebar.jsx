import { useEffect } from 'react'

function Sidebar({ servers, activeServerId, onSelectServer }) {
  useEffect(() => {
    // noop for now
  }, [servers])

  return (
    <div className="w-20 bg-slate-950/60 backdrop-blur border-r border-white/10 flex flex-col items-center py-3 gap-3">
      {servers.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelectServer(s.id)}
          title={s.name}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white/80 shadow-inner transition-all hover:scale-105 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] ${
            activeServerId === s.id ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 ring-2 ring-fuchsia-400/60' : 'bg-slate-800/80'
          }`}
        >
          <span className="text-sm font-semibold truncate px-1">{s.name.slice(0,2).toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
