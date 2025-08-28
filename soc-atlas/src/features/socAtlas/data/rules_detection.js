// Purpose: Rules & detection tools (Sigma, YARA)
// TODO: Add more converters and rule sample generators
import { ShieldCheck } from 'lucide-react'
import { genSigmaSysmon, genYara } from './generators'

export const RULES_DETECTION_TOOLS = [
  {
    id: 'sigma',
    icon: ShieldCheck,
    name: { en: 'Sigma', tr: 'Sigma' },
    category: 'Rules & Detection',
    tags: ['rules', 'detection', 'splunk', 'elk'],
    summary: { en: 'Generic detection rule format.', tr: 'Genel tespit kural formatı.' },
    details: { en: 'Write once, convert to SIEM queries (Splunk/ELK).', tr: "Bir kez yaz, SIEM sorgularına çevir (Splunk/ELK)." },
    usecases: { en: ['Rule portability'], tr: ['Kural taşınabilirliği'] },
    examplesText: { en: ['Convert Sysmon rule to Splunk, scan evtx'], tr: ["Sysmon kuralını Splunk'a çevir, evtx tara"] },
    commands: [
      { title: 'Usage', entries: [
        { label: 'Convert to Splunk', cmd: 'sigmac -t splunk -c sysmon_windows rules/sysmon_powershell_download.yml' },
        { label: 'Scan EVTX dir', cmd: 'sigma scan -t windows -e ./evtx/ --rules ./rules/' },
      ]},
    ],
    examples: [ { filename: 'sysmon_powershell_download.yml', mime: 'text/yaml', generate: genSigmaSysmon } ],
  },
  {
    id: 'yara',
    icon: ShieldCheck,
    name: { en: 'YARA', tr: 'YARA' },
    category: 'Rules & Detection',
    tags: ['rules', 'malware'],
    summary: { en: 'Pattern matching for malware.', tr: 'Kötü amaçlı yazılım için desen eşleme.' },
    details: { en: 'Hunt with textual/hex patterns against files or memory.', tr: 'Dosya/belekte metin/hex desenleriyle avlan.' },
    usecases: { en: ['Malware triage', 'IOC sweeping'], tr: ['Zararlı triyaj', 'IOC tarama'] },
    examplesText: { en: ['Compile rules and scan samples'], tr: ['Kuralları derle, örnekleri tara'] },
    commands: [
      { title: 'Run', entries: [
        { label: 'Recursive scan', cmd: 'yara -r rules/malware.yar samples/' },
        { label: 'Compile rules', cmd: 'yarac rules/malware.yar rules/malware.compiled' },
      ]},
    ],
    examples: [ { filename: 'malware.yar', mime: 'text/plain', generate: genYara } ],
  },
]


