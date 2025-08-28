// Purpose: Guided recipe vertical timeline inside ToolCard
// TODO: Make steps expandable and add step-level notes
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function GuidedRecipe({ recipe, toolName, lang }) {
  const [copiedStep, setCopiedStep] = useState(null)
  if (!Array.isArray(recipe) || recipe.length === 0) return null

  return (
    <div className="mt-6">
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Guided recipe</span>
      <ol className="relative mt-2 ml-3" role="list" aria-label={`${toolName} recipe`}>
        <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-emerald-300 to-sky-300 dark:from-emerald-500/70 dark:via-teal-400/70 dark:to-emerald-500/70" />
        {recipe.map((step, idx) => (
          <li key={idx} className="relative pl-6 pr-2 py-3">
            <span className="absolute left-[-6px] top-4 h-3 w-3 rounded-full ring-4 ring-emerald-300 bg-emerald-400 dark:ring-emerald-600" aria-hidden />
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold leading-snug text-neutral-800 dark:text-neutral-200">{step.title?.[lang] || step.title?.en || step.title}</h4>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{step.description?.[lang] || step.description?.en || step.description}</p>
                {step.command ? (
                  <div className="mt-3 flex items-center gap-2">
                    <code className="block w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-100 shadow-inner" aria-label={`Command for step ${idx + 1}`}>
                      {step.command}
                    </code>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(step.command)
                          setCopiedStep(idx)
                          setTimeout(() => setCopiedStep(null), 1200)
                        } catch {}
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-semibold border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40"
                      aria-label={`Copy command for step ${idx + 1}`}
                    >
                      {copiedStep === idx ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                      {copiedStep === idx ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default GuidedRecipe


