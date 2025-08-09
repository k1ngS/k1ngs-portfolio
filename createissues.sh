
#!/usr/bin/env sh
# POSIX-compatible script to create labels, milestones and issues using GitHub CLI.
# Uso recomendado:
#   1. Execute este script DENTRO do WSL (Ubuntu/Linux no Windows 10/11)
#   2. Instale o GitHub CLI no WSL: sudo apt update && sudo apt install gh
#   3. Autentique: gh auth login
#   4. Clone o repositório ou passe owner/repo como argumento
#   5. Execute: ./create_issues.sh ou ./create_issues.sh owner/repo
set -eu

# Checa se está rodando no WSL/Linux
if grep -qi microsoft /proc/version 2>/dev/null; then
  echo "Rodando no WSL (ok)."
elif [ "$(uname -s)" = "Linux" ]; then
  echo "Rodando em Linux nativo (ok)."
else
  echo "ATENÇÃO: Este script deve ser executado no WSL (Ubuntu/Linux), não no Windows puro." >&2
  echo "Abra o Ubuntu/WSL, navegue até a pasta do script e execute: ./create_issues.sh" >&2
  exit 1
fi

# Checa se o gh está autenticado
if ! command -v gh >/dev/null 2>&1; then
  echo "Erro: GitHub CLI (gh) não encontrado. Instale com: sudo apt install gh" >&2
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "O GitHub CLI (gh) não está autenticado. Rode 'gh auth login' antes de continuar." >&2
  exit 1
fi

REPO="${1:-}"

require() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Erro: comando '$1' não encontrado. Instale e tente novamente." >&2
    exit 1
  }
}

infer_repo() {
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    url="$(git remote get-url origin 2>/dev/null || true)"
    case "$url" in
      git@github.com:*) path="${url#git@github.com:}" ;;
      https://github.com/*) path="${url#https://github.com/}" ;;
      http://github.com/*) path="${url#http://github.com/}" ;;
      *) path="" ;;
    esac
    path="${path%.git}"
    printf %s "$path"
    return 0
  fi
  printf %s ""
}

if [ -z "${REPO}" ] || [ "${REPO}" = "." ]; then
  REPO="$(infer_repo || true)"
fi

if [ -z "${REPO}" ]; then
  echo "Erro: informe owner/repo ou rode dentro de um repositório com remote origin." >&2
  echo "Ex.: ./create_issues.sh k1ngS/k1ngs-portfolio" >&2
  exit 1
fi

require gh

echo "Repositório alvo: $REPO"

create_label() {
  name="$1"
  color="$2"
  desc="$3"
  gh label create "$name" --color "$color" --description "$desc" --force --repo "$REPO" >/dev/null 2>&1 || true
  echo "Label OK: $name"
}

ensure_milestone_number() {
  if [ $# -lt 2 ]; then
    echo "Erro interno: ensure_milestone_number requer 2 argumentos (title, desc)" >&2
    exit 2
  fi
  title="$1"
  desc="$2"

  # Busca milestones existentes
  milestones_json="$(gh api "/repos/$REPO/milestones?state=all&per_page=100" 2>/dev/null)"
  echo "DEBUG: JSON bruto de milestones retornado pela API:" >&2
  echo "$milestones_json" >&2
  num="$(echo "$milestones_json" | jq -r --arg t "$title" '.[] | select(.title==$t) | .number' | head -n1 || true)"

  if [ -z "$num" ]; then
    # Cria milestone via API
    echo "Criando milestone via gh api..." >&2
    create_out="$(gh api "/repos/$REPO/milestones" --method POST -f title="$title" -f description="$desc" 2>&1)"
    echo "DEBUG: Resposta da criação: $create_out" >&2
    # Rebusca
    milestones_json="$(gh api "/repos/$REPO/milestones?state=all&per_page=100" 2>/dev/null)"
    num="$(echo "$milestones_json" | jq -r --arg t "$title" '.[] | select(.title==$t) | .number' | head -n1 || true)"
  fi

  if [ -z "$num" ]; then
    echo "Erro: não consegui resolver o número do milestone '$title' no repo $REPO" >&2
    exit 1
  fi

  printf %s "$num"
}

create_issue() {
  title="$1"
  milestone_num="$2"  # agora recebe NÚMERO
  labels_csv="$3"

  tmp_body="$(mktemp)"
  cat > "$tmp_body"

  # Verifica se a issue já existe
  if gh issue list --repo "$REPO" --search "$title" --state open --json title | jq -e '.[] | select(.title=="'"$title"'")' >/dev/null; then
    echo "Issue já existe: $title"
    rm -f "$tmp_body"
    return
  fi

  # Monta argv sem arrays (POSIX)
  set -- gh issue create --repo "$REPO" --title "$title" --body-file "$tmp_body" --milestone "$milestone_num"

  # Adiciona labels repetindo --label para cada item do CSV
  tmp_labels="$(mktemp)"
  printf '%s' "$labels_csv" | tr ',' '\n' > "$tmp_labels"
  while IFS= read -r l; do
    [ -n "$l" ] && set -- "$@" --label "$l"
  done < "$tmp_labels"
  rm -f "$tmp_labels"

  "$@" >/dev/null
  echo "Issue criada: $title"
  rm -f "$tmp_body"
}

echo "==> Criando labels..."
create_label "type:feature" "1D76DB" "Nova funcionalidade"
create_label "type:bug" "D73A4A" "Correção de erro"
create_label "type:chore" "C2E0C6" "Tarefa de manutenção"
create_label "type:docs" "0075CA" "Documentação"
create_label "type:test" "FBCA04" "Testes"
create_label "area:backend" "5319E7" "Escopo backend"
create_label "area:frontend" "0E8A16" "Escopo frontend"
create_label "area:infra" "0052CC" "Infraestrutura/DevOps"
create_label "area:design" "FEF2C0" "Design/UX"
create_label "performance" "1ABC9C" "Performance"
create_label "security" "B60205" "Segurança"
create_label "seo" "0366D6" "SEO"
create_label "a11y" "0E8A16" "Acessibilidade"
create_label "observability" "5319E7" "Logs/Tracing/Erros"
create_label "ci" "2B7489" "Integração Contínua"
create_label "content" "7057FF" "Conteúdo/Dados"
create_label "good first issue" "7057FF" "Boa para iniciantes"

echo "==> Garantindo milestones e resolvendo números..."

MS1_TITLE="S1 - MVP Funcional (Semana 1)"
MS2_TITLE="S2 - Qualidade & Producao (Semana 2)"
MS3_TITLE="S3 - Melhorias & Extensoes (Semanas 3-4)"

MS1_DESC="MVP: stack unificada, backend tRPC/Prisma, Terminal e conteúdo inicial"
MS2_DESC="A11y, SEO, Performance, Observabilidade, CI/CD e testes"
MS3_DESC="E2E completo, docs Starlight, microinterações, painel admin (opcional)"

echo "DEBUG: Chamando ensure_milestone_number com: '$MS1_TITLE' '$MS1_DESC'"
MS1_NUM="$(ensure_milestone_number "$MS1_TITLE" "$MS1_DESC")"
echo "DEBUG: Chamando ensure_milestone_number com: '$MS2_TITLE' '$MS2_DESC'"
MS2_NUM="$(ensure_milestone_number "$MS2_TITLE" "$MS2_DESC")"
echo "DEBUG: Chamando ensure_milestone_number com: '$MS3_TITLE' '$MS3_DESC'"
MS3_NUM="$(ensure_milestone_number "$MS3_TITLE" "$MS3_DESC")"

echo "MS1_NUM=$MS1_NUM"
echo "MS2_NUM=$MS2_NUM"
echo "MS3_NUM=$MS3_NUM"

echo "==> Criando issues da S1..."
create_issue "Unificar stack e limpar documentação conflitante" "$MS1_TITLE" "type:chore,type:docs,area:infra" <<'EOF'
Resumo
Remover/arquivar o new_tutorial.md (Express/Knex/SQLite) e consolidar o fluxo oficial: Fastify + tRPC + Prisma + PostgreSQL + Bun.

Tarefas
- Remover referências a Express/Knex/SQLite dos docs e scripts
- Atualizar README (root, apps/web, apps/server) com setup Bun/Turbo/Prisma/Postgres
- Adicionar seções Arquitetura e Como rodar localmente

Critérios de aceitação
- Nenhuma referência remanescente a Express/Knex/SQLite
- Setup from scratch < 30 minutos seguindo o README
EOF

create_issue "Padronizar .env.example e CORS (web/server)" "$MS1_TITLE" "type:chore,security,area:infra" <<'EOF'
Resumo
Criar .env.example consistentes e configurar CORS com domínios permitidos.

Tarefas
- apps/server/.env.example e apps/web/.env.example
- Documentar variáveis e defaults
- Configurar CORS no Fastify para localhost e futuros domínios

Critérios de aceitação
- Apps sobem com .env baseado nos exemplos
- Requisições de domínios não permitidos são bloqueadas
EOF

create_issue "Expandir Prisma schema com entidades de portfólio" "$MS1_TITLE" "type:feature,area:backend" <<'EOF'
Resumo
Adicionar Project, Technology, Skill, Tag, Contact e enums (ProjectCategory, ProjectStatus, etc.).

Tarefas
- Atualizar apps/server/prisma/schema/schema.prisma
- Rodar prisma generate e migrations

Critérios de aceitação
- prisma validate/generate sem erros
- Migrations aplicadas com sucesso em ambiente local
EOF

create_issue "Seed inicial: projetos, tecnologias e skills" "$MS1_TITLE" "type:feature,content,area:backend" <<'EOF'
Resumo
Popular banco com 3–5 projetos, 10–12 tecnologias e 6–8 skills reais.

Tarefas
- Criar apps/server/prisma/seed.ts
- Executar seed e validar via Prisma Studio

Critérios de aceitação
- Seed executa sem erros
- Dados coerentes e utilizáveis no frontend
Dependências
- Expandir Prisma schema
EOF

create_issue "tRPC portfolio router (getInfo, getProjects, getProject, getSkills, sendContact, healthCheck)" "$MS1_TITLE" "type:feature,area:backend" <<'EOF'
Resumo
Expor procedures com zod, filtros e paginação básica.

Tarefas
- Implementar apps/server/src/routers/portfolio.ts
- Validar entradas com zod
- Registrar no appRouter e expor healthCheck

Critérios de aceitação
- Respostas < 200ms P95 local
- Inputs inválidos retornam erro de validação adequado
Dependências
- Prisma schema e seed prontos
EOF

create_issue "Segurança mínima: helmet, rate-limit, logger Pino" "$MS1_TITLE" "security,type:chore,area:backend" <<'EOF'
Resumo
Adicionar fastify-helmet, fastify-rate-limit (mutações) e logs estruturados com request-id.

Tarefas
- Configurar helmet
- Rate-limit em /contact e mutações
- Logger Pino com request-id

Critérios de aceitação
- Headers de segurança ativos
- Rate-limit efetivo em endpoints sensíveis
EOF

create_issue "Configurar tRPC client e providers no app web" "$MS1_TITLE" "type:feature,area:frontend" <<'EOF'
Resumo
Configurar createTRPCReact + httpBatchLink e QueryClientProvider.

Tarefas
- Implementar apps/web/src/utils/trpc.ts
- Incluir providers em routes/__root.tsx
- Smoke test (healthCheck) no frontend

Critérios de aceitação
- Consulta de healthCheck OK no browser
Dependências
- Router tRPC no server
EOF

create_issue "Store do Terminal (Zustand) com histórico e persist" "$MS1_TITLE" "type:feature,area:frontend" <<'EOF'
Resumo
Criar store do terminal com entries, theme, history, executeCommand e navigateHistory.

Tarefas
- apps/web/src/stores/terminal-store.ts (persist/devtools)
- Mensagem de welcome e tema default

Critérios de aceitação
- Estado persiste entre reloads
- Histórico navegável com ↑/↓
EOF

create_issue "Processador de comandos do Terminal (MVP)" "$MS1_TITLE" "type:feature,area:frontend" <<'EOF'
Resumo
Implementar help, about, projects, project <id>, skills, contact, theme <name>, clear integrando com tRPC.

Tarefas
- apps/web/src/lib/command-processor.ts
- Mapear temas: matrix, cyberpunk, hacker, retro
- Tratamento de erros amigável

Critérios de aceitação
- Todos os comandos retornam outputs úteis
- Erros exibem mensagens claras
Dependências
- tRPC client e router
EOF

create_issue "Componente UI do Terminal + acessibilidade básica" "$MS1_TITLE" "type:feature,area:frontend,area:design" <<'EOF'
Resumo
Construir o componente do terminal (input, output animado, foco, scroll-to-bottom).

Tarefas
- apps/web/src/components/terminal/Terminal.tsx
- Auto-focus, rolagem, indicador de loading
- Responsividade mobile/desktop

Critérios de aceitação
- Operável apenas com teclado
- Layout responsivo e estável
Dependências
- Store + processador de comandos
EOF

create_issue "Conteúdo inicial: info, imagens WebP e links" "$MS1_TITLE" "content,type:chore,area:frontend" <<'EOF'
Resumo
Preencher getInfo e assets de 3–4 projetos em destaque com imagens otimizadas.

Tarefas
- Atualizar seed/dados (bio, links, redes)
- Otimizar imagens (WebP/AVIF) <= 150KB cada

Critérios de aceitação
- Comando projects exibe descrição coerente e links
- Lighthouse sem alertas críticos de imagens
Dependências
- Seed + tRPC + processador de comandos
EOF

create_issue "Docker Compose para Postgres local + scripts turbo" "$MS1_TITLE" "area:infra,type:chore" <<'EOF'
Resumo
Facilitar setup local com Docker e padronizar scripts db:*.

Tarefas
- docker-compose.yml (Postgres)
- Scripts: db:start, db:push, db:seed, db:studio

Critérios de aceitação
- bun db:start sobe DB
- bun db:seed popula dados sem erros
Dependências
- Prisma schema/seed
EOF

create_issue "Biome, Husky, lint-staged e commitlint" "$MS1_TITLE" "type:chore,ci,area:infra" <<'EOF'
Resumo
Garantir lint/format no pre-commit e padronizar mensagens (Conventional Commits).

Tarefas
- lint-staged + husky hooks
- commitlint + config conventional

Critérios de aceitação
- Commits fora do padrão são bloqueados
- Lint roda automaticamente no pre-commit
EOF

echo "==> Criando issues da S2..."
create_issue "Toggle 'Professional Mode' (tema clean alternativo)" "$MS2_TITLE" "type:feature,area:frontend,area:design" <<'EOF'
Resumo
Alternar entre Dark Fantasy e Professional Mode com persistência no store.

Tarefas
- Tema adicional + botão toggle
- Garantir contraste AA nos 2 temas

Critérios de aceitação
- Toggle sem reload
- Tema persiste ao recarregar
Dependências
- Terminal UI + store
EOF

create_issue "Acessibilidade AA: navegação por teclado, foco e contraste" "$MS2_TITLE" "a11y,type:chore,area:frontend" <<'EOF'
Resumo
Garantir WCAG 2.1 AA em toda a UI do terminal.

Tarefas
- Roles/aria-labels e ordem de foco
- Testes com axe-core e navegação por teclado

Critérios de aceitação
- axe sem violações críticas
- Uso 100% via teclado
Dependências
- Terminal UI
EOF

create_issue "SEO técnico: metas, OG/Twitter, Schema, sitemap/robots" "$MS2_TITLE" "seo,type:feature,area:frontend" <<'EOF'
Resumo
Implementar SEO e social cards completos.

Tarefas
- <title>/<meta> por rota
- OG/Twitter cards
- Schema.org Person/CreativeWork
- sitemap.xml e robots.txt

Critérios de aceitação
- Lighthouse SEO > 95
- Validadores OG/Twitter OK
Dependências
- Conteúdo inicial
EOF

create_issue "Performance: SSR streaming, code-splitting, imagens otimizadas" "$MS2_TITLE" "performance,type:chore,area:frontend" <<'EOF'
Resumo
Otimizar LCP/CLS, lazy-load, e prefetch conforme a stack.

Tarefas
- Code-splitting por rota
- Imagens WebP/AVIF com sizes corretos
- Prefetch/streaming (quando suportado)

Critérios de aceitação
- LCP < 2.5s, CLS < 0.1
- Lighthouse Performance > 90
Dependências
- Terminal UI + conteúdo + SEO básico
EOF

create_issue "Observabilidade: Pino (request-id) e Sentry (web/server)" "$MS2_TITLE" "observability,security,type:feature,area:backend" <<'EOF'
Resumo
Logs estruturados e error tracking.

Tarefas
- Pino com request-id e níveis por ambiente
- Sentry DSN via env (server e web)
- Captura de unhandled rejections

Critérios de aceitação
- Logs JSON com request-id
- Erros aparecem no Sentry
Dependências
- Env padronizado
EOF

create_issue "CI GitHub Actions: typecheck, lint, unit, build, e2e smoke + deploy" "$MS2_TITLE" "ci,type:feature,area:infra" <<'EOF'
Resumo
Pipeline completo com gates e deploy automático.

Tarefas
- Workflows para PR e main
- Bloqueio de merge sem checks verdes
- Deploy (Vercel web; server conforme infra)

Critérios de aceitação
- Pipeline < 8 min
- PR bloqueia sem todos os checks
Dependências
- Husky/Biome/commitlint
EOF

create_issue "Testes unitários/integrados: tRPC e processCommand (>=80% coverage)" "$MS2_TITLE" "type:test,area:backend,area:frontend" <<'EOF'
Resumo
Cobrir procedures tRPC e processador de comandos.

Tarefas
- Testes de inputs válidos/inválidos (zod)
- Coverage gate no CI

Critérios de aceitação
- Coverage >= 80% statements
- Todos os testes verdes no CI
Dependências
- CI configurado; routers e processador prontos
EOF

create_issue "Lighthouse CI com budgets de performance" "$MS2_TITLE" "performance,ci,type:chore" <<'EOF'
Resumo
Executar Lighthouse CI com budgets (LCP, CLS, JS size).

Tarefas
- lighthouserc e budgets
- Falhar pipeline se extrapolar budgets

Critérios de aceitação
- Pipeline falha quando LCP > 2.5s ou total JS > budget
Dependências
- CI e otimizações de performance
EOF

echo "==> Criando issues da S3..."
create_issue "E2E Playwright completo + axe (a11y)" "$MS3_TITLE" "type:test,a11y,area:frontend" <<'EOF'
Resumo
Testes E2E dos fluxos principais e verificação de acessibilidade.

Tarefas
- Cenários: help, projects, project <id>, theme, teclado, mobile/desktop
- Integração axe para a11y

Critérios de aceitação
- Suíte E2E estável em CI
- Sem violações a11y críticas
Dependências
- Terminal UI + CI + a11y AA
EOF

create_issue "Docs Starlight: setup, arquitetura, contribuição, padrões" "$MS3_TITLE" "type:docs,area:infra" <<'EOF'
Resumo
Documentação viva do projeto.

Tarefas
- Páginas em apps/docs (setup, arquitetura com diagrama, rotas tRPC)
- Guia de contribuição e padrões de commit

Critérios de aceitação
- Onboarding < 30 min usando docs
Dependências
- Stack unificada + routers prontos
EOF

create_issue "Microinterações e polimento visual (Framer Motion)" "$MS3_TITLE" "area:design,type:feature,performance" <<'EOF'
Resumo
Adicionar animações leves sem degradar Web Vitals.

Tarefas
- Variants simples (opacity/transform)
- Testar impacto nos vitals

Critérios de aceitação
- Lighthouse Performance > 90
- Sem aumento perceptível de LCP/CLS
Dependências
- Otimizações de performance
EOF

create_issue "Painel administrativo simples (opcional)" "$MS3_TITLE" "type:feature,area:backend,area:frontend" <<'EOF'
Resumo
CRUD protegido por auth (Better Auth + tRPC) para projetos/skills/contatos.

Tarefas
- Mutations tRPC com role-based access
- UI simples (listar/criar/editar)

Critérios de aceitação
- Ações autenticadas e validadas (zod)
Dependências
- Auth configurado + routers base
EOF

echo "==> Issues, labels e milestones criados."
echo "Use: gh issue list --repo $REPO"
