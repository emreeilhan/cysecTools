// Purpose: Small button to copy text to clipboard
// TODO: Add aria-live feedback for accessibility improvements
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyButton({ text, label }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setOk(true)
          setTimeout(() => setOk(false), 1200)
        } catch {}
      }}
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-emerald-400/60 hover:text-emerald-500"
    >
      {ok ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span>{ok ? 'Copied' : label ?? 'Copy'}</span>
    </button>
  )
}

export default CopyButton


