// Purpose: Single command row with copy action
// TODO: Support multi-line code wrapping toggle
import React from 'react'
import { Copy, Check } from 'lucide-react'

function CodeRow({ label, cmd, copied, onCopy }) {
  return (
    <div className="group relative">
      <div className="absolute right-2 top-2">
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(cmd)
              onCopy?.()
            } catch {}
          }}
          className="opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-emerald-400/60 hover:text-emerald-500 bg-white/80 dark:bg-neutral-900/70"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? 'OK' : 'Copy'}
        </button>
      </div>
      <div className="text-[11.5px] text-neutral-500 dark:text-neutral-400 mb-1">{label}</div>
      <pre className="text-sm p-3 rounded-lg bg-neutral-900 text-neutral-50 overflow-x-auto"><code>{cmd}</code></pre>
    </div>
  )
}

export default CodeRow


