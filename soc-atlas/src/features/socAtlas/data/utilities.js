// Purpose: Utility tools (CyberChef, INetSim)
// TODO: Consider adding hash utilities and encoders
import { ShieldCheck } from 'lucide-react'
import { } from './generators'

export const UTILITY_TOOLS = [
  {
    id: 'cyberchef',
    icon: ShieldCheck,
    name: { en: 'CyberChef', tr: 'CyberChef' },
    category: 'Utility',
    tags: ['convert', 'decode', 'regex'],
    summary: { en: 'Swiss‑Army knife for data transforms.', tr: 'Veri dönüşümleri için İsviçre çakısı.' },
    details: { en: 'Drag‑drop operations for Base64, URL, XOR, etc.', tr: 'Base64, URL, XOR vb. için sürükle‑bırak işlemleri.' },
    usecases: { en: ['Decode payloads', 'Extract IOCs'], tr: ['Yükleri decode et', 'IOC çıkar'] },
    examplesText: { en: ['Base64 ➜ From Base64 ➜ Strings'], tr: ['Base64 ➜ From Base64 ➜ Strings'] },
    commands: [
      { title: 'Tips', entries: [
        { label: 'Recipe idea', cmd: 'From Base64 → Gunzip → Extract URLs' },
        { label: 'Regex IOC', cmd: '/https?:\\/\\/[\\w.-]+\\/[^\\n\\r\\s]*/g' },
      ]},
    ],
    recipe: [
      // Purpose: Decode and pivot to IOCs
      { title: { en: 'Load sample', tr: 'Örneği yükle' }, description: { en: 'Drag-and-drop the payload into CyberChef.', tr: 'Payload dosyasını CyberChef içine sürükle-bırak.'}, command: 'Open CyberChef → Load file' },
      { title: { en: 'Apply operations', tr: 'Operasyonları uygula' }, description: { en: 'From Base64 → Gunzip → Strings.', tr: 'From Base64 → Gunzip → Strings.'}, command: 'Add: From Base64 → Gunzip → Extract URLs' }
    ],
  },
  {
    id: 'inetsim',
    icon: ShieldCheck,
    name: { en: 'INetSim', tr: 'INetSim' },
    category: 'Utility',
    tags: ['sandbox', 'honeynet', 'simulation'],
    summary: { en: 'Simulate internet services safely.', tr: 'İnternet servislerini güvenle simüle eder.' },
    details: { en: 'Fake HTTP/DNS/FTP etc. for dynamic malware tests.', tr: 'Dinamik zararlı testleri için sahte HTTP/DNS/FTP vb.' },
    usecases: { en: ['Dynamic analysis lab'], tr: ['Dinamik analiz lab'] },
    examplesText: { en: ['Start HTTP/HTTPS and inspect logs'], tr: ['HTTP/HTTPS başlat, logları incele'] },
    commands: [
      { title: 'Run', entries: [
        { label: 'Start default', cmd: 'inetsim' },
        { label: 'With conf', cmd: 'inetsim --conf ./inetsim.conf' },
      ]},
    ],
    recipe: [
      // Purpose: Safe dynamic analysis network sinkhole
      { title: { en: 'Start services', tr: 'Servisleri başlat' }, description: { en: 'Launch INetSim with defaults.', tr: 'INetSim’i varsayılanlarla başlat.'}, command: 'inetsim' },
      { title: { en: 'Review logs', tr: 'Logları incele' }, description: { en: 'Inspect HTTP/DNS logs for callbacks.', tr: 'Geri çağrılar için HTTP/DNS loglarını incele.'}, command: 'ls -l /var/log/inetsim' }
    ],
  },
]


