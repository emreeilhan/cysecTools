// Purpose: Offensive tooling referenced in THM 101 (Hydra, Metasploit)
// TODO: Gate with lab-only warning; add payload safety notes
import { ShieldCheck } from 'lucide-react'

export const ATTACK_TOOLS = [
  {
    id: 'hydra',
    icon: ShieldCheck,
    name: { en: 'Hydra', tr: 'Hydra' },
    category: 'Attack',
    tags: ['bruteforce', 'login'],
    summary: { en: 'Network login brute‑forcer.', tr: 'Ağ oturum brute‑force aracı.' },
    details: { en: 'Parallelized password guesses for many protocols.', tr: 'Birçok protokol için paralel parola tahmini.' },
    usecases: { en: ['Lab password testing'], tr: ['Lab parola testi'] },
    examplesText: { en: ['HTTP form brute‑force'], tr: ['HTTP form brute‑force'] },
    commands: [
      { title: 'Examples', entries: [
        { label: 'SSH', cmd: 'hydra -L users.txt -P passwords.txt ssh://10.10.10.10' },
        { label: 'HTTP form', cmd: 'hydra -l admin -P rockyou.txt 10.10.10.10 http-post-form "/login:username=^USER^&password=^PASS^:F=Invalid"' },
      ]},
    ],
  },
  {
    id: 'metasploit',
    icon: ShieldCheck,
    name: { en: 'Metasploit Framework', tr: 'Metasploit Framework' },
    category: 'Attack',
    tags: ['exploitation', 'modules'],
    summary: { en: 'Exploit and post‑exploitation framework.', tr: 'Exploit ve post‑exploitation çerçevesi.' },
    details: { en: 'Modular exploits, payloads, and auxiliary scanners.', tr: 'Modüler exploit, payload ve yardımcı tarayıcılar.' },
    usecases: { en: ['Lab exploitation'], tr: ['Lab exploitation'] },
    examplesText: { en: ['Search and run a module'], tr: ['Modül ara ve çalıştır'] },
    commands: [
      { title: 'Core', entries: [
        { label: 'Search', cmd: 'msfconsole -q -x "search vsftpd; exit"' },
        { label: 'Use module', cmd: 'msfconsole -q -x "use exploit/unix/ftp/vsftpd_234_backdoor; show options; exit"' },
      ]},
    ],
  },
]


