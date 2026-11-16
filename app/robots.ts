export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/report'] }, { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'], allow: '/', disallow: ['/admin', '/api'] }], sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com'}/sitemap.xml` };
}
