// Purpose: Commands list section inside ToolCard with copy-all and per-entry copy
// TODO: Add search within section and collapse groups
import React, { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton'
import CodeRow from '../../components/CodeRow'

function CommandsSection({ sections, t }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  const combinedCommands = useMemo(() => {
    const lines = []
    sections.forEach((sec) => {
      lines.push(`# ${sec.title}`)
      sec.entries.forEach((e) => lines.push(e.cmd))
      lines.push('')
    })
    return lines.join('\n')
  }, [sections])

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{t('common_commands')}</span>
        <CopyButton label={t('copy_all')} text={combinedCommands} />
      </div>

      <div className="grid gap-3">
        {sections.map((sec, idx) => (
          <div key={idx} className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-900/70 flex items-center justify-between">
              <span className="text-sm font-medium">{sec.title}</span>
              <CopyButton text={sec.entries.map((e) => e.cmd).join('\n')} />
            </div>
            <div className="p-3 space-y-2 bg-white/60 dark:bg-neutral-950/40">
              {sec.entries.map((e, i) => (
                <CodeRow
                  key={i}
                  label={e.label}
                  cmd={e.cmd}
                  onCopy={() => setCopiedIdx(`${idx}-${i}`)}
                  copied={copiedIdx === `${idx}-${i}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommandsSection


