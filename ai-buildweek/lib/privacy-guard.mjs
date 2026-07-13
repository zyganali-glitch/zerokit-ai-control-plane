const RESERVED_EMAIL_DOMAINS = new Set([
  'example.com',
  'example.net',
  'example.org',
  'example.test',
]);

const BLOCKING_PATTERNS = [
  ['private_key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/giu],
  ['openai_api_key', /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}\b/gu],
  ['github_token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/gu],
  ['aws_access_key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/gu],
  ['jwt', /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/gu],
  ['authorization_header', /\bAuthorization\s*:\s*Bearer\s+[A-Za-z0-9._~+\/-]{16,}/giu],
  ['connection_string_secret', /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s:@/]+:[^\s@/]+@/giu],
  ['session_cookie', /\b(?:set-cookie|cookie)\s*:\s*[^\r\n]{12,}/giu],
];

const REVIEW_PATTERNS = [
  ['uuid', /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/giu],
  ['public_ip', /\b(?!(?:10|127)\.)(?!(?:192\.168)\.)(?!(?:172\.(?:1[6-9]|2\d|3[01]))\.)(?:\d{1,3}\.){3}\d{1,3}\b/gu],
  ['production_marker', /\b(?:production dump|prod dump|raw traffic|customer export|patient record|student record)\b/giu],
];

function excerpt(text, index, length) {
  const start = Math.max(0, index - 18);
  const end = Math.min(text.length, index + length + 18);
  return text.slice(start, end).replace(/\s+/g, ' ').trim();
}

function collectPatternFindings(text, patterns, severity) {
  const findings = [];
  for (const [code, regex] of patterns) {
    regex.lastIndex = 0;
    for (const match of text.matchAll(regex)) {
      findings.push({
        severity,
        code,
        index: match.index ?? 0,
        excerpt: excerpt(text, match.index ?? 0, match[0].length),
      });
    }
  }
  return findings;
}

function collectEmailFindings(text) {
  const findings = [];
  const regex = /\b[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})\b/giu;
  for (const match of text.matchAll(regex)) {
    const domain = match[1].toLowerCase();
    if (RESERVED_EMAIL_DOMAINS.has(domain) || domain.endsWith('.example.test')) continue;
    findings.push({
      severity: 'block',
      code: 'non_reserved_email',
      index: match.index ?? 0,
      excerpt: excerpt(text, match.index ?? 0, match[0].length),
    });
  }
  return findings;
}

export function auditPrivacyText(text) {
  if (typeof text !== 'string') throw new TypeError('Privacy guard input must be a string.');
  const findings = [
    ...collectPatternFindings(text, BLOCKING_PATTERNS, 'block'),
    ...collectEmailFindings(text),
    ...collectPatternFindings(text, REVIEW_PATTERNS, 'review'),
  ].sort((a, b) => a.index - b.index || a.code.localeCompare(b.code));

  return {
    safeToSend: !findings.some((finding) => finding.severity === 'block'),
    findings,
    blockers: findings.filter((finding) => finding.severity === 'block'),
    reviewItems: findings.filter((finding) => finding.severity === 'review'),
  };
}

export function assertPrivacySafe(text, label = 'input') {
  const result = auditPrivacyText(text);
  if (!result.safeToSend) {
    const codes = [...new Set(result.blockers.map((finding) => finding.code))].join(', ');
    throw new Error(`Privacy guard blocked ${label}: ${codes}. Sanitize the artifact before any model call.`);
  }
  return result;
}

export const PRIVACY_GUARD_VERSION = '1.0.0';
