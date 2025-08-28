// Purpose: Web security tools (Burp Suite, Gobuster, SQLMap)
// TODO: Add ffuf and dirsearch variants
import { ShieldCheck } from 'lucide-react'

export const WEB_SECURITY_TOOLS = [
  {
    id: 'burp',
    icon: ShieldCheck,
    name: { en: 'Burp Suite', tr: 'Burp Suite' },
    category: 'Web',
    tags: ['proxy', 'scanner', 'intruder'],
    summary: { en: 'Web security testing platform.', tr: 'Web güvenliği test platformu.' },
    details: { en: 'Intercept, fuzz, and scan HTTP(S) traffic.', tr: 'HTTP(S) trafiğini yakala, fuzz et ve tara.' },
    usecases: { en: ['Auth flows, input testing'], tr: ['Yetkilendirme akışları, girdi testleri'] },
    examplesText: { en: ['Proxy setup and scope'], tr: ['Proxy kurulumu ve scope'] },
    commands: [
      { title: 'Tips', entries: [
        { label: 'Proxy PAC tip', cmd: 'Use FoxyProxy with Burp listening on 127.0.0.1:8080' },
        { label: 'Scope hygiene', cmd: 'Limit target scope before active scans' },
      ]},
    ],
    recipe: [
      // Purpose: Intercept and test within defined scope
      { title: { en: 'Set proxy', tr: 'Proxy ayarla' }, description: { en: 'Configure browser to 127.0.0.1:8080.', tr: "Tarayıcıyı 127.0.0.1:8080'a yönlendir."}, command: 'Browser → Proxy 127.0.0.1:8080' },
      { title: { en: 'Define scope', tr: 'Kapsamı tanımla' }, description: { en: 'Add target host to scope before active scans.', tr: 'Aktif taramadan önce hedefi scope’a ekle.'}, command: 'Burp → Target → Scope' },
      { title: { en: 'Intercept & replay', tr: 'Yakala ve yeniden gönder' }, description: { en: 'Use Proxy and Repeater to test inputs.', tr: 'Proxy ve Repeater ile girdileri test et.'}, command: 'Send to Repeater' }
    ],
  },
  {
    id: 'gobuster',
    icon: ShieldCheck,
    name: { en: 'Gobuster', tr: 'Gobuster' },
    category: 'Web',
    tags: ['discovery', 'dirs', 'dns'],
    summary: { en: 'Directory/DNS brute‑force discovery.', tr: 'Dizin/DNS brute‑force keşfi.' },
    details: { en: 'Wordlist‑based enumeration for files, dirs, vhosts.', tr: 'Dosya, dizin ve sanal host keşfi için wordlist tabanlı tarama.' },
    usecases: { en: ['Find hidden paths'], tr: ['Gizli patikaları bul'] },
    examplesText: { en: ['Dir scan and vhost enum'], tr: ['Dizin tarama ve vhost enum'] },
    commands: [
      { title: 'Modes', entries: [
        { label: 'Directories', cmd: 'gobuster dir -u https://target -w /usr/share/wordlists/dirb/common.txt -x php,txt,js' },
        { label: 'Vhost', cmd: 'gobuster vhost -u https://target -w vhosts.txt -k' },
      ]},
    ],
    recipe: [
      // Purpose: Controlled enumeration
      { title: { en: 'Wordlist selection', tr: 'Wordlist seçimi' }, description: { en: 'Pick reasonable list to avoid noise.', tr: 'Gürültüyü azaltmak için makul bir wordlist seç.'}, command: '/usr/share/wordlists/dirb/common.txt' },
      { title: { en: 'Run directory enum', tr: 'Dizin taraması' }, description: { en: 'Enumerate dirs/extensions carefully.', tr: 'Dizin/uzantı taramasını kontrollü yap.'}, command: 'gobuster dir -u https://target -w ... -x php,txt,js' }
    ],
  },
  {
    id: 'sqlmap',
    icon: ShieldCheck,
    name: { en: 'SQLMap', tr: 'SQLMap' },
    category: 'Web',
    tags: ['sql', 'injection', 'dbms'],
    summary: { en: 'Automatic SQL injection tool.', tr: 'Otomatik SQL enjeksiyon aracı.' },
    details: { en: 'Detect and exploit SQL injection flaws.', tr: 'SQL enjeksiyon zafiyetlerini tespit ve sömürü.' },
    usecases: { en: ['Lab vuln scans'], tr: ['Lab zafiyet taramaları'] },
    examplesText: { en: ['Basic test'], tr: ['Basit test'] },
    commands: [
      { title: 'Basic', entries: [
        { label: 'Test URL', cmd: 'sqlmap -u "https://target/item.php?id=1" --batch --dbs' },
      ]},
    ],
    recipe: [
      // Purpose: Lab-only safe testing flow
      { title: { en: 'Confirm consent', tr: 'İzin teyidi' }, description: { en: 'Ensure explicit lab authorization.', tr: 'Açık lab yetkilendirmesi olduğundan emin ol.'}, command: 'Check authorization' },
      { title: { en: 'Fingerprint DBMS', tr: 'DBMS parmak izi' }, description: { en: 'Run detection with minimal impact.', tr: 'Minimum etkili tespit çalıştır.'}, command: 'sqlmap -u "https://target/item.php?id=1" --batch --dbs' }
    ],
  },
]


