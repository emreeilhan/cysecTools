// Purpose: IDS/IPS category tools (Suricata, Snort)
// TODO: Extend with more signatures and sample rule generators
import { ShieldCheck } from 'lucide-react'
import { genSuricataRule } from './generators'

export const IDS_IPS_TOOLS = [
  {
    id: 'suricata',
    icon: ShieldCheck,
    name: { en: 'Suricata', tr: 'Suricata' },
    category: 'IDS/IPS',
    tags: ['ids', 'eve.json', 'rules'],
    summary: { en: 'IDS/NSM with JSON logging.', tr: 'JSON loglayan IDS/NSM.' },
    details: { en: 'Detects threats using rules and outputs eve.json.', tr: 'Kurallarla tehdit tespiti yapar, eve.json üretir.' },
    usecases: { en: ['Detect + hunt'], tr: ['Tespit + avcılık'] },
    examplesText: { en: ['Run on PCAP, parse eve.json'], tr: ["PCAP'te çalıştır, eve.json'u işle"] },
    commands: [
      { title: 'Run on PCAP', entries: [
        { label: 'With local rules', cmd: 'suricata -r capture.pcap -k none -S ./rules/local.rules -l ./logs' },
        { label: 'Parse alerts', cmd: `jq -r 'select(.event_type=="alert") | [.timestamp,.src_ip,.dest_ip,.alert.signature] | @tsv' logs/eve.json` },
      ]},
    ],
    examples: [ { filename: 'local.rules', mime: 'text/plain', generate: genSuricataRule } ],
    recipe: [
      // Purpose: Run on PCAP and triage alerts
      { title: { en: 'Run with local rules', tr: 'Yerel kurallar ile çalıştır' }, description: { en: 'Process PCAP and write eve.json.', tr: "PCAP'i işle ve eve.json üret."}, command: 'suricata -r capture.pcap -k none -S ./rules/local.rules -l ./logs' },
      { title: { en: 'Extract alerts', tr: 'Uyarıları çıkar' }, description: { en: 'Filter alerts for quick overview.', tr: 'Hızlı bir görünüm için uyarıları filtrele.'}, command: `jq -r 'select(.event_type=="alert") | [.timestamp,.src_ip,.dest_ip,.alert.signature] | @tsv' logs/eve.json` },
      { title: { en: 'Pivot by src/dst', tr: 'Kaynak/hedefe göre pivot' }, description: { en: 'Group on IP to spot noisy or rare entities.', tr: 'Gürültülü veya nadir varlıkları görmek için IP bazlı grupla.'}, command: `jq -r 'select(.event_type=="alert") | .src_ip' logs/eve.json | sort | uniq -c | sort -nr | head` }
    ],
  },
  {
    id: 'snort',
    icon: ShieldCheck,
    name: { en: 'Snort', tr: 'Snort' },
    category: 'IDS/IPS',
    tags: ['ids', 'pcap', 'rules'],
    summary: { en: 'Lightweight IDS engine.', tr: 'Hafif IDS motoru.' },
    details: { en: 'Signature‑based detection; console output or unified logs.', tr: 'İmzaya dayalı tespit; konsol veya birleşik log.' },
    usecases: { en: ['Lab signature tests'], tr: ['Lab imza testleri'] },
    examplesText: { en: ['Analyze PCAP with a rule'], tr: ['Kural ile PCAP analiz et'] },
    commands: [
      { title: 'PCAP analysis', entries: [
        { label: 'Basic run', cmd: 'snort -r capture.pcap -A console -k none -c /etc/snort/snort.conf' },
        { label: 'Rule test', cmd: 'snort -r capture.pcap -A console -k none -c ./snort.lua' },
      ]},
    ],
    recipe: [
      // Purpose: Quick console-based detection
      { title: { en: 'Baseline run', tr: 'Temel çalıştırma' }, description: { en: 'Parse PCAP using default config.', tr: 'Varsayılan konfig ile PCAP parse et.'}, command: 'snort -r capture.pcap -A console -k none -c /etc/snort/snort.conf' },
      { title: { en: 'Test custom rule', tr: 'Özel kuralı test et' }, description: { en: 'Validate rule firing on sample traffic.', tr: 'Örnek trafik üzerinde kural tetiklenmesini doğrula.'}, command: 'snort -r capture.pcap -A console -k none -c ./snort.lua' }
    ],
  },
]


