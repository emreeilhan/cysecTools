// Purpose: Sample file content generators used by tool examples

export const genYara = (lang) => `// ${lang === "tr" ? "Basit YARA kuralı" : "Simple YARA rule"}
rule Suspicious_PowerShell {
  meta:
    author = "SOC Atlas"
    description = "Detects embedded PowerShell keywords"
  strings:
    $ps = "powershell -enc" nocase
    $iex = "IEX (New-Object Net.WebClient).DownloadString" nocase
  condition:
    any of them
}`;

export const genSigmaSysmon = (lang) => `title: Possible PowerShell Download
id: 7f0b9b2a-5f1e-4f23-9d0a-psdl
status: experimental
description: ${lang === "tr" ? "PowerShell ile şüpheli internetten indirme girişimini tespit eder" : "Detect suspicious download via PowerShell"}
logsource:
  product: windows
  service: sysmon
  definition: EventID 1 (Process Create)
detection:
  sel:
    Image|endswith: '\\powershell.exe'
    CommandLine|contains|all:
      - 'Net.WebClient'
      - 'DownloadString'
  condition: sel
level: high`;

export const genSysmonConfig = (lang) => `<!-- ${lang === "tr" ? "Minimum Sysmon konfig (örnek)" : "Minimal Sysmon config (example)"} -->
<Sysmon schemaversion="4.50">
  <EventFiltering>
    <ProcessCreate onmatch="include">
      <Image condition="end with">powershell.exe</Image>
    </ProcessCreate>
  </EventFiltering>
</Sysmon>`;

export const genSuricataRule = (lang) => `alert http any any -> any any (msg:"${lang === "tr" ? "Şüpheli User-Agent" : "Suspicious User-Agent"}"; content:"curl/"; http_header; classtype:policy-violation; sid:1000001; rev:1;)`;

export const genINetSimConf = (lang) => `# ${lang === "tr" ? "INetSim örnek konfig" : "INetSim sample config"}
start_service http 80
start_service https 443
service_bind_address 0.0.0.0
log_dir /var/log/inetsim
`;

export const genIOCList = (lang) => `# ${lang === "tr" ? "Gözlenecek IOC'ler" : "IOCs to watch"}
8.8.8.8
1.2.3.4
malicious.example.com
hxxp://bad[.]example/door
`;


