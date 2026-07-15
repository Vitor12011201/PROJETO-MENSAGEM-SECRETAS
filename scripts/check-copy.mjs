import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const extensions = new Set([".tsx", ".jsx", ".md"]);
const ignoredDirs = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  "test-results",
  "playwright-report",
  ".git"
]);
const ignoredFiles = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "package.json"
]);
const visibleCopyFiles = [
  /^README\.md$/,
  /^src[\\/].*\.tsx$/,
  /^src[\\/]app[\\/](privacy|terms|safety|community-guidelines)[\\/]page\.tsx$/,
  /^src[\\/]features[\\/].*\.tsx$/,
  /^src[\\/]components[\\/].*\.tsx$/
];
const suspicious = [
  "annimas", "anonimas", "voce", "nao", "seguranca",
  "configuracao", "moderacao", "usuario", "pagina", "publico",
  "estatisticas", "exclusao", "informacao", "\uFFFD", "??", "??", "???",
  "\u00E1react", "c\u00E1reate"
];
const allowedInternal = [
  /username/i, /reservedUsernames/, /technical-id/, /eventType/, /moderationStatus/,
  /recipientProfileId/, /senderHash/, /create[A-Z_a-z]/, /createdAt/, /created_at/,
  /nao_lidas/, /outro_positivo/, /palavra_bloqueada_personalizada/,
  /perseguicao|automutilacao|suicidio|violencia|humilhacao|traicao|endereco|repeticao/,
  /Vitoria|vitoria/, /voce@email/, /check-copy/, /copy\.test\.ts/, /e2e\\main\.spec\.ts/, /\?\?/, /#seguranca/, /id="seguranca"/, /reservedUsernames/, /moderacao/, /voce mora|acabar com voce|se nao|nao conta/
];

const findings = [];
walk(root);

if (findings.length) {
  console.error("Possiveis problemas de copy encontrados:\n");
  for (const finding of findings) {
    console.error(finding.file + ":" + finding.line + ": " + finding.term + " -> " + finding.text.trim());
  }
  process.exit(1);
}

console.log("Copy verificada: nenhum problema suspeito encontrado.");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (ignoredFiles.has(entry.name)) continue;
    if (!extensions.has(path.extname(entry.name))) continue;
    const rel = path.relative(root, full);
    if (!visibleCopyFiles.some((rule) => rule.test(rel))) continue;
    const lines = fs.readFileSync(full, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => inspectLine(rel, index + 1, line));
  }
}

function inspectLine(file, lineNumber, line) {
  if (file.endsWith("copy.test.ts")) return;
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("import ")) return;
  if (allowedInternal.some((rule) => rule.test(line))) return;
  for (const term of suspicious) {
    if (line.toLowerCase().includes(term.toLowerCase())) {
      findings.push({ file, line: lineNumber, term, text: line });
    }
  }
}
