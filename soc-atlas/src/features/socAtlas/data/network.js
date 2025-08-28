// Purpose: Network category tools subset
import { ShieldCheck } from 'lucide-react'
import { genIOCList } from './generators'

export const NETWORK_TOOLS = [
  {
    id: 'wireshark',
    icon: ShieldCheck,
    name: { en: 'Wireshark / TShark', tr: 'Wireshark / TShark' },
    category: 'Network',
    tags: ['pcap', 'network', 'http', 'dns'],
    summary: { en: 'Deep packet inspection GUI/CLI for PCAPs.', tr: 'PCAP derin paket analizi için GUI/CLI.' },
    details: { en: 'Wireshark offers interactive packet analysis; TShark provides the same engine in CLI for automation.', tr: 'Wireshark etkileşimli paket analizi sunar; TShark aynı motoru CLI ile otomasyon için sağlar.' },
    usecases: { en: ['Extract credentials, hosts, URIs', 'Follow TCP streams', 'Filter attack flows quickly'], tr: ['Kimlik bilgileri, host ve URI çıkarımı', 'TCP akışlarını takip', 'Saldırı akışlarını hızlı filtreleme'] },
    examplesText: { en: ['Load PCAP, filter http.request, export objects'], tr: ['PCAP yükle, http.request filtrele, objeleri dışa aktar'] },
    commands: [
      { title: 'TShark', entries: [
        { label: 'HTTP requests (host + URI)', cmd: 'tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri' },
        { label: 'Resolve DNS queries', cmd: 'tshark -r capture.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name' },
      ]},
      { title: 'Display filters (Wireshark)', entries: [
        { label: 'Only HTTP reqs to 10.0.0.5', cmd: 'http.request && ip.dst == 10.0.0.5' },
        { label: 'TLS ClientHello (JA3 hunting)', cmd: 'tls.handshake.type == 1' },
      ]},
    ],
    examples: [ { filename: 'ioc_list.txt', mime: 'text/plain', generate: genIOCList } ],
    recipe: [
      { title: { en: 'Open PCAP and apply filters', tr: 'PCAP aç ve filtre uygula' }, description: { en: 'Load capture and narrow with display filters (http, dns, tls).', tr: 'Yakalamayı yükle ve görüntü filtreleri ile daralt (http, dns, tls).' }, command: 'http or tls or dns or tcp.port == 4444' },
      { title: { en: 'Follow suspicious streams', tr: 'Şüpheli akışları takip et' }, description: { en: 'Right-click a candidate packet → Follow stream; look for payloads, beacons, creds.', tr: 'Aday pakete sağ tık → Follow stream; payload, beacon, kimlik bilgileri ara.' }, command: 'Right-click → Follow → TCP Stream' },
      { title: { en: 'Export objects', tr: 'Objeleri dışa aktar' }, description: { en: 'Use Export Objects, hash artifacts and check intel.', tr: 'Export Objects kullan, artefaktları hashle ve intel ile karşılaştır.' }, command: 'File → Export Objects → HTTP…' },
      { title: { en: 'Pivot to IOCs', tr: "IOC'lara pivot" }, description: { en: 'Copy IPs/domains/hashes to your notes and build quick SIEM queries.', tr: 'IP/domain/hash değerlerini notlarına al, hızlı SIEM sorguları üret.' }, command: 'IOC set → feed to SIEM' },
    ],
  },
  {
    id: 'nmap',
    icon: ShieldCheck,
    name: { en: 'Nmap', tr: 'Nmap' },
    category: 'Network',
    tags: ['scanner', 'ports', 'service'],
    summary: { en: 'Network scanner and service enumerator.', tr: 'Ağ tarayıcı ve servis belirleyici.' },
    details: { en: 'Discovers hosts, open ports, and services; NSE for scripts.', tr: 'Host, açık port ve servis bulur; NSE ile script desteği.' },
    usecases: { en: ['Lab recon', 'Baseline mapping'], tr: ['Lab keşif', 'Baz haritalama'] },
    examplesText: { en: ['Top ports, service detection, vuln scripts'], tr: ['Popüler portlar, servis tespiti, zafiyet scriptleri'] },
    commands: [
      { title: 'Common scans', entries: [
        { label: 'Top 1000 TCP', cmd: 'nmap -Pn -sS -T4 target' },
        { label: 'Service + versions', cmd: 'nmap -sV -sC -O target' },
        { label: 'Scripted vuln check', cmd: 'nmap --script vuln target' },
      ]},
    ],
    recipe: [
      // Purpose: Quick recon sequence with safe defaults
      { title: { en: 'Discover scope', tr: 'Kapsamı keşfet' }, description: { en: 'Ping sweep or ARP to find live hosts (lab).', tr: 'Canlı hostları bulmak için ping/ARP taraması (lab).'}, command: 'nmap -sn 10.10.0.0/24' },
      { title: { en: 'Top ports quick scan', tr: 'Popüler portları hızlı tara' }, description: { en: 'Scan common TCP ports to map services.', tr: 'Servisleri haritalamak için yaygın TCP portlarını tara.'}, command: 'nmap -Pn -sS -T4 target' },
      { title: { en: 'Version and scripts', tr: 'Versiyon ve scriptler' }, description: { en: 'Probe service versions and run default scripts.', tr: 'Servis versiyonlarını yokla, varsayılan scriptleri çalıştır.'}, command: 'nmap -sV -sC target' }
    ],
  },
  {
    id: 'zeek',
    icon: ShieldCheck,
    name: { en: 'Zeek', tr: 'Zeek' },
    category: 'Network',
    tags: ['pcap', 'logs', 'bro'],
    summary: { en: 'Network security monitor producing rich logs from PCAPs.', tr: "PCAP'ten zengin loglar üreten ağ güvenlik monitörü." },
    details: { en: 'Transforms PCAP into structured logs (http.log, dns.log, conn.log).', tr: "PCAP'i yapılandırılmış loglara (http.log, dns.log, conn.log) dönüştürür." },
    usecases: { en: ['Hunt by logs', 'Pivot faster than raw packets'], tr: ['Loglar üzerinden avcılık', 'Ham pakete göre daha hızlı pivot'] },
    examplesText: { en: ['Process PCAP then grep indicators in logs'], tr: ["PCAP'i işle, loglarda IOC ara"] },
    commands: [
      { title: 'PCAP ➜ logs', entries: [
        { label: 'Create logs', cmd: 'zeek -Cr capture.pcap' },
        { label: 'Summarize hosts', cmd: 'cut -f1 http.log | sort | uniq -c | sort -nr | head' },
      ]},
      { title: 'Quick fields', entries: [
        { label: 'Host & URI', cmd: 'cat http.log | zeek-cut id.orig_h host uri' },
        { label: 'DNS queries', cmd: 'cat dns.log | zeek-cut query qtype_name' },
      ]},
    ],
    recipe: [
      // Purpose: Turn PCAP to logs and triage quickly
      { title: { en: 'Generate logs', tr: 'Logları üret' }, description: { en: 'Convert PCAP into Zeek logs.', tr: "PCAP'i Zeek loglarına dönüştür."}, command: 'zeek -Cr capture.pcap' },
      { title: { en: 'Pivot HTTP/DNS', tr: 'HTTP/DNS pivotu' }, description: { en: 'Review http.log and dns.log for rare hosts/URIs.', tr: 'http.log ve dns.log içinde nadir host/URI ara.'}, command: 'cat http.log | zeek-cut host uri' },
      { title: { en: 'Extract IOCs', tr: 'IOC çıkar' }, description: { en: 'Collect suspicious domains/IPs from logs.', tr: 'Şüpheli domain/IP değerlerini topla.'}, command: 'cat dns.log | zeek-cut query | sort -u' }
    ],
  },
  {
    id: 'tcpdump',
    icon: ShieldCheck,
    name: { en: 'tcpdump', tr: 'tcpdump' },
    category: 'Network',
    tags: ['pcap', 'cli'],
    summary: { en: 'Classic packet sniffer CLI.', tr: 'Klasik paket yakalayıcı CLI.' },
    details: { en: 'Filter and capture traffic on the fly.', tr: 'Trafiği anlık filtreleyip yakalar.' },
    usecases: { en: ['Quick wins'], tr: ['Hızlı analiz'] },
    examplesText: { en: ['Read PCAP and filter'], tr: ['PCAP oku ve filtrele'] },
    commands: [
      { title: 'Read PCAP', entries: [
        { label: 'SYN packets on 80', cmd: "tcpdump -nn -r capture.pcap 'tcp port 80 and (tcp[tcpflags] & tcp-syn != 0)'" },
        { label: 'Only DNS', cmd: "tcpdump -nn -r capture.pcap 'udp port 53'" },
      ]},
    ],
    recipe: [
      // Purpose: Minimal read/triage loop
      { title: { en: 'List top talkers', tr: 'En çok konuşanları listele' }, description: { en: 'Summarize by endpoints/ports to spot anomalies.', tr: 'Uç noktalar/portlar bazında özetle, anomali ara.'}, command: "tcpdump -nn -r capture.pcap | awk '{print $3,$5}' | cut -d'.' -f1-4 | sort | uniq -c | sort -nr | head" },
      { title: { en: 'Focus protocol', tr: 'Protokole odaklan' }, description: { en: 'Filter to DNS/HTTP per hypothesis.', tr: 'Hipoteze göre DNS/HTTP filtrele.'}, command: "tcpdump -nn -r capture.pcap 'udp port 53'" }
    ],
  },
]


