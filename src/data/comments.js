export const COMMENTS = [
  { user: "Sara M.", avatar: "SM", time: "2h ago", text: "I've been able to reproduce the issue. It seems to happen when the request rate exceeds 100/min. Looking into the nginx config now.", translated: false },
  { user: "James L.", avatar: "JL", time: "1h ago", text: "Checked the load balancer logs — the upstream is timing out. I'll draft a patch for rate limiting headers.", translated: false },
  { user: "Alex K.", avatar: "AK", time: "45m ago", text: "¿Podemos también revisar la configuración del caché Redis? Puede que esté expirando demasiado pronto.", translated: true, translatedText: "Can we also review the Redis cache config? It might be expiring too early." },
];