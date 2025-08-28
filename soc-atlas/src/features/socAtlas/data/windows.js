// Purpose: Windows telemetry and detection tools (Sysmon)
// TODO: Add Windows Event Forwarding and ETW consumers
import { ShieldCheck } from 'lucide-react'
import { genSysmonConfig } from './generators'

export const WINDOWS_TOOLS = [
  {
    id: 'sysmon',
    icon: ShieldCheck,
    name: { en: 'Sysmon', tr: 'Sysmon' },
    category: 'Windows',
    tags: ['telemetry', 'eventid', 'process'],
    summary: { en: 'Windows telemetry driver (EventID goldmine).', tr: 'Windows telemetri sürücüsü (EventID hazinesi).' },
    details: { en: 'Captures process/file/registry/network events to Event Log.', tr: "Süreç/dosya/kayıt/network olaylarını Event Log'a yazar." },
    usecases: { en: ['Detection rules', 'Hunting'], tr: ['Tespit kuralları', 'Hunting'] },
    examplesText: { en: ['Install minimal config and query EID 1'], tr: ['Minimal config yükle, EID 1 sorgula'] },
    commands: [
      { title: 'Install & query', entries: [
        { label: 'Install with config', cmd: 'Sysmon64.exe -i sysmonconfig.xml -accepteula' },
        { label: 'Query EID 1 (ProcessCreate)', cmd: 'wevtutil qe Microsoft-Windows-Sysmon/Operational /q:"*[System/EventID=1]" /f:text | more' },
      ]},
    ],
    examples: [ { filename: 'sysmonconfig.xml', mime: 'application/xml', generate: genSysmonConfig } ],
    recipe: [
      // Purpose: Sysmon hunting steps aligned with Event IDs
      { title: { en: 'Baseline your config', tr: 'Konfigürasyonu baz al' }, description: { en: 'Use sane config capturing process/DNS/network/image loads.', tr: 'Süreç/DNS/ağ/image yüklerini kaydeden makul bir konfig kullan.' }, command: 'Sysmon64.exe -i sysmonconfig.xml -accepteula' },
      { title: { en: 'Process ancestry checks', tr: 'Süreç soy ağacı kontrolleri' }, description: { en: 'Hunt LOLBins spawning unusual children.', tr: "Olağan dışı çocuk süreçler üreten LOLBin'leri ara." }, command: 'EventID=1 (ProcessCreate)' },
      { title: { en: 'Outbound beacons', tr: "Dışa giden beacon'lar" }, description: { en: 'Correlate ProcessGuid to EventID=3 for rare dest IPs/ports.', tr: "Nadir hedef IP/portlar için ProcessGuid'i EventID=3 ile ilişkilendir." }, command: 'EventID=3 (NetworkConnect)' },
      { title: { en: 'Persistence touches', tr: 'Kalıcılık temasları' }, description: { en: 'Check EventID 11/13/14 for Run keys/services/WMI.', tr: 'Run anahtarları/servisler/WMI için 11/13/14 olaylarını kontrol et.' }, command: 'EventID in (11,13,14)' },
    ],
  },
]


