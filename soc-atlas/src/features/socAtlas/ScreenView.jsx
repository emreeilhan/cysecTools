import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CopyButton from "./components/CopyButton";
import CodeRow from "./components/CodeRow";
import CyberGrid from "./components/CyberGrid";
import CommandsSection from "./components/CardView/CommandsSection";
import GuidedRecipe from "./components/CardView/GuidedRecipe";
import { TOOLS } from "./data";
import {
  ShieldCheck,
  Search,
  Moon,
  Sun,
  Languages,
  ChevronDown,
  Copy,
  Check,
  Download,
  Tag,
  Filter,
  Globe,
} from "lucide-react";

// ==========================
// SOC ATLAS — Single‑File React Site
// - TailwindCSS for styling (no imports needed here; add Tailwind in your app)
// - Framer Motion for silky expansions
// - Lucide icons
// - i18n (TR/EN), Dark/Light toggle, Search, Tag filters
// - Smooth accordion with copy buttons, sample file generator
// ==========================

export default function SOCToolsAtlas() {
  // ------------------ i18n ------------------
  const [lang, setLang] = useState("tr");
  const t = useMemo(() => (key) => I18N[lang][key] ?? key, [lang]);

  // ------------------ Theme -----------------
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("socatlas:theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("socatlas:theme", dark ? "dark" : "light");
  }, [dark]);

  // ------------------ Search/Filter ---------
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState(new Set());
  const toggleTag = (tag) => {
    const next = new Set(activeTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setActiveTags(next);
  };

  const allTags = useMemo(() => {
    const s = new Set();
    TOOLS.forEach((t) => t.tags.forEach((x) => s.add(x)));
    return Array.from(s);
  }, []);

  // ------------------ Filtered list ---------
  const filtered = useMemo(() => {
    return TOOLS.filter((tool) => {
      const q = query.toLowerCase().trim();
      const nameHit = tool.name[lang].toLowerCase().includes(q);
      const descHit = tool.summary[lang].toLowerCase().includes(q);
      const tagHit = tool.tags.some((tg) => tg.toLowerCase().includes(q));
      const searchOk = q === "" || nameHit || descHit || tagHit;
      const tagsOk = activeTags.size === 0 || tool.tags.some((tg) => activeTags.has(tg));
      return searchOk && tagsOk;
    });
  }, [query, activeTags, lang]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Subtle cyber grid background */}
      <CyberGrid />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 shadow ring-1 ring-emerald-500/30 grid place-items-center">
              <ShieldCheck className="size-5 text-emerald-950/90" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SOC Atlas</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t("tagline")}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} />
            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24">
        <Hero t={t} />

        {/* Controls */}
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr,auto] items-start">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400"><Filter className="size-4" /> {t("filter_by_tags")}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map((tg) => (
            <button
              key={tg}
              onClick={() => toggleTag(tg)}
              className={
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition " +
                (activeTags.has(tg)
                  ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-500"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-emerald-400/60")
              }
            >
              <Tag className="size-3.5" /> {tg}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mt-8 grid gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} t={t} lang={lang} />)
          )}
          {filtered.length === 0 && (
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t("no_results")}</p>
          )}
        </div>

        <NoteBox t={t} />
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row items-center gap-2 justify-between">
          <div>
            © {new Date().getFullYear()} SOC Atlas — {t("footer_note")} <a className="underline decoration-dotted" href="#">MIT</a>
          </div>
          <div className="inline-flex items-center gap-2">
            <Globe className="size-3.5" /> {t("dual_language")} • {t("dark_light_ready")}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ================= Components =================

function LangToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang((prev) => (prev === "tr" ? "en" : "tr"))}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 hover:ring-2 hover:ring-emerald-400/40"
      title="Language / Dil"
    >
      <Languages className="size-4" />
      <span className="text-sm font-medium">{lang === "tr" ? "TR" : "EN"}</span>
    </button>
  );
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 hover:ring-2 hover:ring-emerald-400/40"
      title="Theme"
    >
      {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      <span className="text-sm font-medium">{dark ? "Dark" : "Light"}</span>
    </button>
  );
}

function Hero({ t }) {
  return (
    <section className="pt-10">
      <div className="rounded-2xl p-6 md:p-10 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-400/30 dark:border-emerald-500/20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("hero_title")} <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">SOC</span> Atlas
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
            {t("hero_sub")}
          </p>
        </div>
        <div className="absolute -right-10 -top-10 size-[280px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 size-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
    </section>
  );
}

function NoteBox({ t }) {
  return (
    <div className="mt-10 rounded-xl border border-amber-400/40 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-900/20 p-4 text-amber-800 dark:text-amber-200 text-sm">
      <strong className="font-semibold">{t("lab_only_title")}:</strong> {t("lab_only_desc")} {t("disclaimer")}
    </div>
  );
}

function ToolCard({ tool, t, lang }) {
  const [open, setOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [copiedStep, setCopiedStep] = useState(null);

  const copyText = async (txt, idx) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  };

  const combinedCommands = useMemo(() => {
    const lines = [];
    tool.commands.forEach((sec) => {
      lines.push(`# ${sec.title}`);
      sec.entries.forEach((e) => lines.push(e.cmd));
      lines.push("");
    });
    return lines.join("\n");
  }, [tool]);

  const downloadExample = (ex) => {
    const blob = new Blob([ex.generate(lang)], { type: ex.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ex.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-neutral-50/70 dark:hover:bg-neutral-900/80"
      >
        <div className="mt-0.5 size-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 grid place-items-center">
          <tool.icon className="size-5 text-emerald-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{tool.name[lang]}</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-600 border border-emerald-400/30">{tool.category}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{tool.summary[lang]}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tool.tags.map((tg) => (
              <span key={tg} className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">#{tg}</span>
            ))}
          </div>
        </div>
        <ChevronDown className={`size-5 shrink-0 transition ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-neutral-200 dark:border-neutral-800">
              {/* Sections */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* What/Use */}
                <div className="space-y-2">
                  <SectionTitle>{t("what_is_it")}</SectionTitle>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{tool.details[lang]}</p>
                  <SectionTitle>{t("use_cases")}</SectionTitle>
                  <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-300">
                    {tool.usecases[lang].map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>

                {/* Examples/Downloads */}
                <div className="space-y-2">
                  <SectionTitle>{t("examples")}</SectionTitle>
                  <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-300">
                    {tool.examplesText[lang].map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>

                  {tool.examples?.length ? (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{t("download_samples")}</div>
                      <div className="flex flex-wrap gap-2">
                        {tool.examples.map((ex, i) => (
                          <button
                            key={i}
                            onClick={() => downloadExample(ex)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-emerald-400/60 hover:text-emerald-500"
                          >
                            <Download className="size-3.5" /> {ex.filename}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Commands */}
              <CommandsSection sections={tool.commands} t={t} />

              {/* Guided Recipe */}
              <GuidedRecipe recipe={tool.recipe} toolName={tool.name[lang]} lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{children}</h4>;
}

// Consider extracting this logic into a separate file for better maintainability.

// ================= Data =================

const I18N = {
  en: {
    tagline: "Tap to learn • silky expand • hands‑on examples",
    hero_title: "The smoothest way to learn",
    hero_sub: "A curated, bilingual map of SOC analyst tools. Search, filter, tap a card, and get real commands plus downloadable sample files.",
    search_placeholder: "Search tools, tags, commands…",
    filter_by_tags: "Filter by tags",
    no_results: "No results. Try removing filters or changing the query.",
    what_is_it: "What is it?",
    use_cases: "Use cases",
    examples: "Walkthrough ideas",
    download_samples: "Download sample files",
    common_commands: "Common commands",
    guided_recipe: "Guided recipe",
    copy_all: "Copy all commands",
    lab_only_title: "Lab use only",
    lab_only_desc: "Only run these tools/commands in controlled labs or approved environments.",
    disclaimer: "You are responsible for compliance with local laws and organizational policies.",
    footer_note: "Content licensed",
    dual_language: "TR/EN ready",
    dark_light_ready: "Dark/Light"
  },
  tr: {
    tagline: "Dokun ve öğren • yumuşak açılır • uygulamalı örnekler",
    hero_title: "Öğrenmenin en akıcı yolu",
    hero_sub: "SOC analist araçlarının iki dilli haritası. Ara, filtrele, karta dokun; gerçek komutları ve indirilebilir örnek dosyaları al.",
    search_placeholder: "Araç, etiket, komut ara…",
    filter_by_tags: "Etikete göre filtrele",
    no_results: "Sonuç yok. Filtreleri kaldırmayı veya aramayı değiştirmeyi dene.",
    what_is_it: "Nedir?",
    use_cases: "Kullanım senaryoları",
    examples: "Yürütme fikirleri",
    download_samples: "Örnek dosyaları indir",
    common_commands: "Sık komutlar",
    guided_recipe: "Adım adım tarif",
    copy_all: "Tümünü kopyala",
    lab_only_title: "Sadece lab ortamı",
    lab_only_desc: "Bu araç/komutları yalnızca kontrollü lablarda veya yetkili ortamlarda çalıştır.",
    disclaimer: "Yerel yasalara ve kurum politikalarına uyumdan sen sorumlusun.",
    footer_note: "İçerik lisansı",
    dual_language: "TR/EN hazır",
    dark_light_ready: "Koyu/Açık"
  }
};

// Consider extracting this logic into a separate file for better maintainability.

// Tool entries
/* const TOOLS = [
  // ========== Network ===========
  {
    id: "wireshark",
    icon: ShieldCheck,
    name: { en: "Wireshark / TShark", tr: "Wireshark / TShark" },
    category: "Network",
    tags: ["pcap", "network", "http", "dns"],
    summary: {
      en: "Deep packet inspection GUI/CLI for PCAPs.",
      tr: "PCAP derin paket analizi için GUI/CLI."
    },
    details: {
      en: "Wireshark offers interactive packet analysis; TShark provides the same engine in CLI for automation.",
      tr: "Wireshark etkileşimli paket analizi sunar; TShark aynı motoru CLI ile otomasyon için sağlar."
    },
    usecases: {
      en: [
        "Extract credentials, hosts, URIs",
        "Follow TCP streams",
        "Filter attack flows quickly"
      ],
      tr: [
        "Kimlik bilgileri, host ve URI çıkarımı",
        "TCP akışlarını takip",
        "Saldırı akışlarını hızlı filtreleme"
      ]
    },
    examplesText: {
      en: ["Load PCAP, filter http.request, export objects"],
      tr: ["PCAP yükle, http.request filtrele, objeleri dışa aktar"]
    },
    commands: [
      {
        title: "TShark",
        entries: [
          { label: "HTTP requests (host + URI)", cmd: "tshark -r capture.pcap -Y \"http.request\" -T fields -e http.host -e http.request.uri" },
          { label: "Resolve DNS queries", cmd: "tshark -r capture.pcap -Y \"dns.flags.response == 0\" -T fields -e dns.qry.name" },
        ],
      },
      {
        title: "Display filters (Wireshark)",
        entries: [
          { label: "Only HTTP reqs to 10.0.0.5", cmd: "http.request && ip.dst == 10.0.0.5" },
          { label: "TLS ClientHello (JA3 hunting)", cmd: "tls.handshake.type == 1" },
        ],
      },
    ],
    examples: [
      { filename: "ioc_list.txt", mime: "text/plain", generate: genIOCList },
    ],
    recipe: [
      // Purpose: Wireshark quick triage steps similar to Blue Team Workshop
      // TODO: Extend with screenshots/links if needed
      { title: { en: "Open PCAP and apply filters", tr: "PCAP aç ve filtre uygula" }, description: { en: "Load capture and narrow with display filters (http, dns, tls).", tr: "Yakalamayı yükle ve görüntü filtreleri ile daralt (http, dns, tls)." }, command: "http or tls or dns or tcp.port == 4444" },
      { title: { en: "Follow suspicious streams", tr: "Şüpheli akışları takip et" }, description: { en: "Right-click a candidate packet → Follow stream; look for payloads, beacons, creds.", tr: "Aday pakete sağ tık → Follow stream; payload, beacon, kimlik bilgileri ara." }, command: "Right-click → Follow → TCP Stream" },
      { title: { en: "Export objects", tr: "Objeleri dışa aktar" }, description: { en: "Use Export Objects, hash artifacts and check intel.", tr: "Export Objects kullan, artefaktları hashle ve intel ile karşılaştır." }, command: "File → Export Objects → HTTP…" },
      { title: { en: "Pivot to IOCs", tr: "IOC'lara pivot" }, description: { en: "Copy IPs/domains/hashes to your notes and build quick SIEM queries.", tr: "IP/domain/hash değerlerini notlarına al, hızlı SIEM sorguları üret." }, command: "IOC set → feed to SIEM" }
    ],
  },
  {
    id: "zeek",
    icon: ShieldCheck,
    name: { en: "Zeek", tr: "Zeek" },
    category: "Network",
    tags: ["pcap", "logs", "bro"],
    summary: {
      en: "Network security monitor producing rich logs from PCAPs.",
      tr: "PCAP'ten zengin loglar üreten ağ güvenlik monitörü."
    },
    details: {
      en: "Transforms PCAP into structured logs (http.log, dns.log, conn.log).",
      tr: "PCAP'i yapılandırılmış loglara (http.log, dns.log, conn.log) dönüştürür."
    },
    usecases: {
      en: ["Hunt by logs", "Pivot faster than raw packets"],
      tr: ["Loglar üzerinden avcılık", "Ham pakete göre daha hızlı pivot"]
    },
    examplesText: {
      en: ["Process PCAP then grep indicators in logs"],
      tr: ["PCAP'i işle, loglarda IOC ara"]
    },
    commands: [
      {
        title: "PCAP ➜ logs",
        entries: [
          { label: "Create logs", cmd: "zeek -Cr capture.pcap" },
          { label: "Summarize hosts", cmd: "cut -f1 http.log | sort | uniq -c | sort -nr | head" },
        ],
      },
      {
        title: "Quick fields",
        entries: [
          { label: "Host & URI", cmd: "cat http.log | zeek-cut id.orig_h host uri" },
          { label: "DNS queries", cmd: "cat dns.log | zeek-cut query qtype_name" },
        ],
      },
    ],
  },
  {
    id: "tcpdump",
    icon: ShieldCheck,
    name: { en: "tcpdump", tr: "tcpdump" },
    category: "Network",
    tags: ["pcap", "cli"],
    summary: { en: "Classic packet sniffer CLI.", tr: "Klasik paket yakalayıcı CLI." },
    details: { en: "Filter and capture traffic on the fly.", tr: "Trafiği anlık filtreleyip yakalar." },
    usecases: { en: ["Quick wins"], tr: ["Hızlı analiz"] },
    examplesText: { en: ["Read PCAP and filter"], tr: ["PCAP oku ve filtrele"] },
    commands: [
      {
        title: "Read PCAP",
        entries: [
          { label: "SYN packets on 80", cmd: "tcpdump -nn -r capture.pcap 'tcp port 80 and (tcp[tcpflags] & tcp-syn != 0)'" },
          { label: "Only DNS", cmd: "tcpdump -nn -r capture.pcap 'udp port 53'" },
        ],
      },
    ],
  },

  // ========== IDS/IPS ===========
  {
    id: "suricata",
    icon: ShieldCheck,
    name: { en: "Suricata", tr: "Suricata" },
    category: "IDS/IPS",
    tags: ["ids", "eve.json", "rules"],
    summary: { en: "IDS/NSM with JSON logging.", tr: "JSON loglayan IDS/NSM." },
    details: { en: "Detects threats using rules and outputs eve.json.", tr: "Kurallarla tehdit tespiti yapar, eve.json üretir." },
    usecases: { en: ["Detect + hunt"], tr: ["Tespit + avcılık"] },
    examplesText: { en: ["Run on PCAP, parse eve.json"], tr: ["PCAP'te çalıştır, eve.json'u işle"] },
    commands: [
      {
        title: "Run on PCAP",
        entries: [
          { label: "With local rules", cmd: "suricata -r capture.pcap -k none -S ./rules/local.rules -l ./logs" },
          { label: "Parse alerts", cmd: "jq -r 'select(.event_type==\"alert\") | [.timestamp,.src_ip,.dest_ip,.alert.signature] | @tsv' logs/eve.json" },
        ],
      },
    ],
    examples: [
      { filename: "local.rules", mime: "text/plain", generate: genSuricataRule },
    ],
  },
  {
    id: "snort",
    icon: ShieldCheck,
    name: { en: "Snort", tr: "Snort" },
    category: "IDS/IPS",
    tags: ["ids", "pcap", "rules"],
    summary: { en: "Lightweight IDS engine.", tr: "Hafif IDS motoru." },
    details: { en: "Signature‑based detection; console output or unified logs.", tr: "İmzaya dayalı tespit; konsol veya birleşik log." },
    usecases: { en: ["Lab signature tests"], tr: ["Lab imza testleri"] },
    examplesText: { en: ["Analyze PCAP with a rule"], tr: ["Kural ile PCAP analiz et"] },
    commands: [
      {
        title: "PCAP analysis",
        entries: [
          { label: "Basic run", cmd: "snort -r capture.pcap -A console -k none -c /etc/snort/snort.conf" },
          { label: "Rule test", cmd: "snort -r capture.pcap -A console -k none -c ./snort.lua" },
        ],
      },
    ],
  },

  // ========== Windows Telemetry ==========
  {
    id: "sysmon",
    icon: ShieldCheck,
    name: { en: "Sysmon", tr: "Sysmon" },
    category: "Windows",
    tags: ["telemetry", "eventid", "process"],
    summary: { en: "Windows telemetry driver (EventID goldmine).", tr: "Windows telemetri sürücüsü (EventID hazinesi)." },
    details: { en: "Captures process/file/registry/network events to Event Log.", tr: "Süreç/dosya/kayıt/network olaylarını Event Log'a yazar." },
    usecases: { en: ["Detection rules", "Hunting"], tr: ["Tespit kuralları", "Hunting"] },
    examplesText: { en: ["Install minimal config and query EID 1"], tr: ["Minimal config yükle, EID 1 sorgula"] },
    commands: [
      {
        title: "Install & query",
        entries: [
          { label: "Install with config", cmd: "Sysmon64.exe -i sysmonconfig.xml -accepteula" },
          { label: "Query EID 1 (ProcessCreate)", cmd: "wevtutil qe Microsoft-Windows-Sysmon/Operational /q:\"*[System/EventID=1]\" /f:text | more" },
        ],
      },
    ],
    examples: [
      { filename: "sysmonconfig.xml", mime: "application/xml", generate: genSysmonConfig },
    ],
    recipe: [
      // Purpose: Sysmon hunting steps aligned with Event IDs
      { title: { en: "Baseline your config", tr: "Konfigürasyonu baz al" }, description: { en: "Use sane config capturing process/DNS/network/image loads.", tr: "Süreç/DNS/ağ/image yüklerini kaydeden makul bir konfig kullan." }, command: "Sysmon64.exe -i sysmonconfig.xml -accepteula" },
      { title: { en: "Process ancestry checks", tr: "Süreç soy ağacı kontrolleri" }, description: { en: "Hunt LOLBins spawning unusual children.", tr: "Olağan dışı çocuk süreçler üreten LOLBin'leri ara." }, command: "EventID=1 (ProcessCreate)" },
      { title: { en: "Outbound beacons", tr: "Dışa giden beacon'lar" }, description: { en: "Correlate ProcessGuid to EventID=3 for rare dest IPs/ports.", tr: "Nadir hedef IP/portlar için ProcessGuid'i EventID=3 ile ilişkilendir." }, command: "EventID=3 (NetworkConnect)" },
      { title: { en: "Persistence touches", tr: "Kalıcılık temasları" }, description: { en: "Check EventID 11/13/14 for Run keys/services/WMI.", tr: "Run anahtarları/servisler/WMI için 11/13/14 olaylarını kontrol et." }, command: "EventID in (11,13,14)" }
    ],
  },
  {
    id: "sigma",
    icon: ShieldCheck,
    name: { en: "Sigma", tr: "Sigma" },
    category: "Rules & Detection",
    tags: ["rules", "detection", "splunk", "elk"],
    summary: { en: "Generic detection rule format.", tr: "Genel tespit kural formatı." },
    details: { en: "Write once, convert to SIEM queries (Splunk/ELK).", tr: "Bir kez yaz, SIEM sorgularına çevir (Splunk/ELK)." },
    usecases: { en: ["Rule portability"], tr: ["Kural taşınabilirliği"] },
    examplesText: { en: ["Convert Sysmon rule to Splunk, scan evtx"], tr: ["Sysmon kuralını Splunk'a çevir, evtx tara"] },
    commands: [
      {
        title: "Usage",
        entries: [
          { label: "Convert to Splunk", cmd: "sigmac -t splunk -c sysmon_windows rules/sysmon_powershell_download.yml" },
          { label: "Scan EVTX dir", cmd: "sigma scan -t windows -e ./evtx/ --rules ./rules/" },
        ],
      },
    ],
    examples: [
      { filename: "sysmon_powershell_download.yml", mime: "text/yaml", generate: genSigmaSysmon },
    ],
  },
  {
    id: "yara",
    icon: ShieldCheck,
    name: { en: "YARA", tr: "YARA" },
    category: "Rules & Detection",
    tags: ["rules", "malware"],
    summary: { en: "Pattern matching for malware.", tr: "Kötü amaçlı yazılım için desen eşleme." },
    details: { en: "Hunt with textual/hex patterns against files or memory.", tr: "Dosya/belekte metin/hex desenleriyle avlan." },
    usecases: { en: ["Malware triage", "IOC sweeping"], tr: ["Zararlı triyaj", "IOC tarama"] },
    examplesText: { en: ["Compile rules and scan samples"], tr: ["Kuralları derle, örnekleri tara"] },
    commands: [
      {
        title: "Run",
        entries: [
          { label: "Recursive scan", cmd: "yara -r rules/malware.yar samples/" },
          { label: "Compile rules", cmd: "yarac rules/malware.yar rules/malware.compiled" },
        ],
      },
    ],
    examples: [
      { filename: "malware.yar", mime: "text/plain", generate: genYara },
    ],
  },

  // ========== Malware & DFIR ==========
  {
    id: "capa",
    icon: ShieldCheck,
    name: { en: "capa", tr: "capa" },
    category: "Malware/DFIR",
    tags: ["static", "capabilities", "maec"],
    summary: { en: "Identify program capabilities.", tr: "Program yeteneklerini tespit eder." },
    details: { en: "Matches rules to infer behaviors (e.g., persistence, C2).", tr: "Kurallarla davranışları (kalıcılık, C2 vb.) çıkarır." },
    usecases: { en: ["Malware triage"], tr: ["Zararlı triyaj"] },
    examplesText: { en: ["Verbose run + JSON export"], tr: ["Ayrıntılı çalıştır + JSON çıktı"] },
    commands: [
      {
        title: "Static analysis",
        entries: [
          { label: "Verbose", cmd: "capa -vv suspicious.exe" },
          { label: "JSON output", cmd: "capa suspicious.exe -o result.json" },
        ],
      },
    ],
  },
  {
    id: "volatility",
    icon: ShieldCheck,
    name: { en: "Volatility 3", tr: "Volatility 3" },
    category: "Malware/DFIR",
    tags: ["memory", "ram", "forensics"],
    summary: { en: "Memory forensics framework.", tr: "Bellek adli analiz çerçevesi." },
    details: { en: "Process, network, DLLs, handles from memory images.", tr: "Bellek imajlarından süreç, ağ, DLL, handle çıkarımı." },
    usecases: { en: ["IR deep dive"], tr: ["IR derin analiz"] },
    examplesText: { en: ["List processes and sockets"], tr: ["Süreç ve soketleri listele"] },
    commands: [
      {
        title: "Core",
        entries: [
          { label: "Processes", cmd: "vol -f mem.raw windows.pslist" },
          { label: "Netstat", cmd: "vol -f mem.raw windows.netstat" },
        ],
      },
    ],
    recipe: [
      // Purpose: Memory triage sequence
      { title: { en: "Identify profile/automagic", tr: "Profil/otomatik tespit" }, description: { en: "Let automagic detect OS symbols.", tr: "Otomatik tespit ile OS sembollerini belirle." }, command: "vol -f mem.raw windows.info" },
      { title: { en: "List processes", tr: "Süreçleri listele" }, description: { en: "Compare pslist/pstree; look for hollowed/orphaned.", tr: "pslist/pstree karşılaştır; hollowed/orphaned arayın." }, command: "windows.pslist / windows.pstree" },
      { title: { en: "Cmdlines & nets", tr: "Komut satırları ve ağ" }, description: { en: "Extract command lines and sockets; map to suspicious PIDs.", tr: "Komut satırı ve socket'leri çıkar; şüpheli PID'lerle eşleştir." }, command: "windows.cmdline, windows.netscan" },
      { title: { en: "Dump modules/artifacts", tr: "Modül/artefakt dök" }, description: { en: "Dump DLLs/handles; run YARA if needed.", tr: "DLL/handle dök; gerekirse YARA çalıştır." }, command: "windows.dlllist, windows.handles" }
    ],
  },
  {
    id: "strings",
    icon: ShieldCheck,
    name: { en: "strings", tr: "strings" },
    category: "Malware/DFIR",
    tags: ["static", "triage"],
    summary: { en: "Quick textual sweep in binaries.", tr: "İkili dosyalarda hızlı metin taraması." },
    details: { en: "Great first look for IOCs.", tr: "IOC'ler için ilk bakışta harika." },
    usecases: { en: ["Quick IOC triage"], tr: ["Hızlı IOC triyaj"] },
    examplesText: { en: ["Look for URLs/keys"], tr: ["URL/anahtar ara"] },
    commands: [
      {
        title: "Scan",
        entries: [
          { label: "Min length 5", cmd: "strings -n 5 suspicious.exe | less" },
          { label: "ASCII + Unicode", cmd: "strings -el suspicious.exe | head" },
        ],
      },
    ],
  },

  // ========== Utilities ==========
  {
    id: "cyberchef",
    icon: ShieldCheck,
    name: { en: "CyberChef", tr: "CyberChef" },
    category: "Utility",
    tags: ["convert", "decode", "regex"],
    summary: { en: "Swiss‑Army knife for data transforms.", tr: "Veri dönüşümleri için İsviçre çakısı." },
    details: { en: "Drag‑drop operations for Base64, URL, XOR, etc.", tr: "Base64, URL, XOR vb. için sürükle‑bırak işlemleri." },
    usecases: { en: ["Decode payloads", "Extract IOCs"], tr: ["Yükleri decode et", "IOC çıkar"] },
    examplesText: { en: ["Base64 ➜ From Base64 ➜ Strings"], tr: ["Base64 ➜ From Base64 ➜ Strings"] },
    commands: [
      {
        title: "Tips",
        entries: [
          { label: "Recipe idea", cmd: "From Base64 → Gunzip → Extract URLs" },
          // Purpose: Keep block comment intact by avoiding closing sequences in commented code
          // Consider extracting this logic into a separate file for better maintainability.
          { label: "Regex IOC", cmd: "/https?:\\/\\/[\\w.-]+\\/[^\\n\\r\\s]*\u002Fg" },
        ],
      },
    ],
  },
  {
    id: "inetsim",
    icon: ShieldCheck,
    name: { en: "INetSim", tr: "INetSim" },
    category: "Utility",
    tags: ["sandbox", "honeynet", "simulation"],
    summary: { en: "Simulate internet services safely.", tr: "İnternet servislerini güvenle simüle eder." },
    details: { en: "Fake HTTP/DNS/FTP etc. for dynamic malware tests.", tr: "Dinamik zararlı testleri için sahte HTTP/DNS/FTP vb." },
    usecases: { en: ["Dynamic analysis lab"], tr: ["Dinamik analiz lab"] },
    examplesText: { en: ["Start HTTP/HTTPS and inspect logs"], tr: ["HTTP/HTTPS başlat, logları incele"] },
    commands: [
      {
        title: "Run",
        entries: [
          { label: "Start default", cmd: "inetsim" },
          { label: "With conf", cmd: "inetsim --conf ./inetsim.conf" },
        ],
      },
    ],
    examples: [
      { filename: "inetsim.conf", mime: "text/plain", generate: genINetSimConf },
    ],
  },
]; */
