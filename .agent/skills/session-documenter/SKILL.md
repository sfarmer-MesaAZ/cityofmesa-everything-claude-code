---
name: session-documenter
description: |
  Captures Claude Code session thought processes and converts them into structured 
  documentation. Automatically exports transcripts, extracts key decisions, and 
  organizes them in docs/ai-sessions/ for future reference and continuous learning.
  
  Use this when:
  - Ending a significant coding session
  - Making architectural decisions that should be documented
  - Wanting to extract learnings for future sessions
  - Creating ADRs (Architecture Decision Records)
  
  Integrates with continuous-learning-v2 to feed patterns back into Claude's knowledge.
---

# Session Documenter

## Overview

This skill transforms Claude Code sessions into persistent documentation by extracting:
- **Thinking blocks** - Claude's internal reasoning process
- **Tool usage patterns** - What commands were run and why
- **File changes** - What was modified and the rationale
- **Decisions made** - Key technical choices with context
- **Learnings** - Patterns that could help future sessions

## Quick Start

```bash
# During a session, when you want to capture progress:
"Please document this session's key decisions"

# Or use the command:
/session-export

# Create an Architecture Decision Record:
/session-export --adr

# Extract patterns for continuous learning:
/session-export --instincts
```

## How It Works

### 1. Session Capture
When activated, the skill:
1. Locates your current session JSONL file in `~/.claude/projects/`
2. Parses all messages (user prompts, Claude responses, tool calls)
3. Extracts thinking blocks (the `<thinking>` tags where Claude reasons)
4. Identifies decision points and technical choices

### 2. Analysis
The skill analyzes:
- **Decision patterns**: Keywords like "chose", "decided to", "will use"
- **Problem-solving**: Error messages followed by solutions
- **Tool effectiveness**: Which commands led to progress vs dead ends
- **File impact**: What files changed and their relationship to goals

### 3. Documentation Generation
Creates structured markdown with:
- Session metadata (duration, files changed, status)
- Executive summary of what was accomplished
- Key decisions with thinking process included
- Technical challenges and how they were overcome
- Learnings that could apply to future work

### 4. Integration Points
- **Commits to repo**: Docs go in `docs/ai-sessions/`
- **ADR generation**: Creates `docs/decisions/ADR-NNN-title.md`
- **Continuous learning**: Feeds `~/.claude/instincts/` for pattern recognition
- **Search integration**: All docs are searchable by future Claude sessions

## Output Examples

### Standard Session Export

**Location:** `docs/ai-sessions/2026-02-17-implement-auth.md`

```markdown
# Session: Implement JWT Authentication
**Date:** February 17, 2026  
**Duration:** 52 minutes  
**Files Changed:** 5  
**Status:** ✓ Completed

## Summary
Implemented JWT-based authentication system with refresh tokens. Chose JWT 
over sessions for stateless architecture supporting horizontal scaling.

## Key Decisions

### Decision 1: JWT vs Session-Based Auth
**Context:** Need auth that works with load balancer across multiple instances

**Thinking Process:**
> Session-based auth requires sticky sessions or shared session store like Redis.
> JWT keeps state on client, allowing any instance to verify. Trade-off is 
> token size and can't immediately invalidate. Acceptable for this use case.

**Decision:** Implement JWT with short-lived access tokens (15 min) and refresh 
tokens (7 days) to balance security and stateless benefits.

**Files Modified:**
- `src/auth/jwt.ts` - Token generation/verification
- `src/middleware/auth.ts` - Express middleware
- `src/routes/auth.ts` - Login/refresh endpoints

### Decision 2: Secret Management
**Thinking Process:**
> JWT signing requires strong secret. Hardcoding is obviously bad. Environment 
> vars work but risky if .env committed. Need proper secret rotation.

**Decision:** Use AWS Secrets Manager in production, dotenv for development. 
Added rotation script for production secrets every 90 days.

## Technical Challenges

### Challenge 1: Race Condition in Refresh Token Flow
**Problem:** Concurrent refresh token requests could both succeed, creating 
multiple valid tokens per user

**Solution:** Added Redis lock during refresh token exchange
```typescript
const lock = await acquireLock(`refresh:${userId}`, 5000);
if (!lock) throw new Error('Concurrent refresh detected');
// ... perform refresh ...
await releaseLock(`refresh:${userId}`);
```

**Learning:** Always assume concurrent requests for critical auth flows

### Challenge 2: TypeScript JWT Type Safety
**Problem:** jwt.verify() returns `any`, losing type safety

**Solution:** Created type guards and validated payloads:
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  exp: number;
}

function isValidPayload(payload: any): payload is JWTPayload {
  return typeof payload.userId === 'string' && ...
}
```

## Tool Usage Patterns
- **Edit**: 12 times (implementation)
- **Read**: 18 times (checking existing code)
- **Bash**: 6 times (testing with curl, installing packages)
- **Grep**: 4 times (finding auth examples in codebase)

## Files Modified
- `src/auth/jwt.ts` - JWT utilities (new file)
- `src/auth/refresh-token.ts` - Refresh token logic (new file)
- `src/middleware/auth.ts` - Auth middleware (new file)
- `src/routes/auth.ts` - Auth endpoints (new file)
- `package.json` - Added jsonwebtoken, @types/jsonwebtoken

## Learnings for Future Sessions

1. **Type Safety in Auth**: Always create type guards for JWT payloads, don't 
   trust external libraries to provide types
   
2. **Concurrency in Auth**: Auth flows are naturally concurrent. Use locks or 
   atomic operations for critical sections
   
3. **Secret Rotation**: Plan for secret rotation from day 1, not as afterthought
   
4. **Testing Auth**: Created integration tests with actual HTTP requests, not 
   just unit tests. Found race condition only through concurrent test

## Next Session Recommendations

- Add rate limiting to auth endpoints (brute force protection)
- Implement email verification flow
- Add 2FA support using TOTP
- Create admin endpoint to revoke all user tokens
```

### Architecture Decision Record Format

**Location:** `docs/decisions/ADR-003-jwt-authentication.md`

```markdown
# ADR 003: Use JWT for Authentication

## Status
Accepted

## Context
We need authentication for our REST API that:
- Works across multiple load-balanced instances
- Doesn't require sticky sessions
- Scales horizontally without shared state
- Provides reasonable security for a B2B SaaS product

## Decision
Implement JWT (JSON Web Tokens) with:
- Short-lived access tokens (15 minutes)
- Long-lived refresh tokens (7 days)
- AWS Secrets Manager for production secret storage
- Redis-based locking for refresh token exchange

## Alternatives Considered

### 1. Session-Based Authentication
**Pros:** Simpler to implement, immediate revocation
**Cons:** Requires sticky sessions or Redis, complicates horizontal scaling
**Why not chosen:** Adds infrastructure complexity we want to avoid

### 2. OAuth2 with Third Party
**Pros:** Outsource security to experts, social login
**Cons:** Lock-in to provider, cost, privacy concerns for enterprise clients
**Why not chosen:** Enterprise clients prefer self-hosted auth

### 3. Opaque Tokens with Central Validation
**Pros:** Better revocation control
**Cons:** Every request hits central service, performance bottleneck
**Why not chosen:** Defeats purpose of stateless architecture

## Consequences

### Positive
- No shared session state needed
- Load balancer can route to any instance
- Offline token verification (fast)
- Standard approach, good library support

### Negative
- Tokens can't be immediately invalidated
- Larger request overhead (token in every request)
- Clients need to implement token refresh logic
- Secret rotation requires coordination

### Mitigation
- Short access token lifetime reduces revocation impact
- Blacklist for high-risk revocations
- Clear documentation for client implementations
- Automated secret rotation with 90-day cycle

## Implementation Notes
See `docs/ai-sessions/2026-02-17-implement-auth.md` for detailed implementation 
thinking process and technical challenges encountered.

## References
- RFC 7519: JSON Web Token (JWT)
- OWASP JWT Cheat Sheet
- Session JSONL: `~/.claude/projects/.../session-abc123.jsonl`
```

### Instinct File for Continuous Learning

**Location:** `~/.claude/instincts/auth-concurrency-handling.md`

```yaml
---
id: auth-concurrency-001
confidence: 0.9
source: session-2026-02-17-implement-auth
created: 2026-02-17
category: security
tags: [authentication, concurrency, race-conditions, distributed-systems]
---

# Instinct: Authentication Race Conditions

## Pattern Recognition

When implementing authentication systems, especially token refresh flows, always 
assume concurrent requests from the same user. This is not a theoretical edge 
case - it happens in real usage when:
- User has multiple browser tabs open
- Mobile app and web app both refresh simultaneously  
- Network retry logic fires multiple times
- Background sync processes run in parallel

## Evidence

In session implementing JWT auth, discovered race condition where concurrent 
refresh token requests could both succeed, creating multiple valid tokens per user.

**Problem manifestation:**
- Two refresh requests arrive within milliseconds
- Both read "current" refresh token from DB
- Both validate successfully
- Both create new refresh tokens
- Database ends up with multiple valid tokens per user

**Fix that worked:**
```javascript
const lock = await acquireLock(`refresh:${userId}`, 5000);
if (!lock) throw new Error('Concurrent refresh detected');
// Critical section: validate & rotate refresh token
await releaseLock(`refresh:${userId}`);
```

## When to Apply

Apply this pattern when:
- Implementing token refresh/rotation
- Handling login state transitions
- Managing session invalidation
- Processing password resets
- Any critical auth state mutation

## How to Recognize Need

Red flags that suggest you need locking:
- Auth flow involves "read current state, then update"
- Multiple steps that must happen atomically
- State stored in database without row-level locking
- User could trigger same operation from multiple clients

## Implementation Strategy

1. **Identify critical section**: What operations must not interleave?
2. **Choose lock scope**: User-level, session-level, or token-level?
3. **Set appropriate timeout**: Long enough for operation, short enough to not block
4. **Handle lock acquisition failure**: Retry? Error? Depends on context
5. **Always release lock**: Use try/finally or defer patterns

## Testing Recommendation

Don't just unit test. Create integration test that:
```javascript
// Fire concurrent requests
const results = await Promise.all([
  refreshToken(user, token),
  refreshToken(user, token),
  refreshToken(user, token)
]);

// Only one should succeed
const successes = results.filter(r => r.success);
assert(successes.length === 1, 'Race condition detected!');
```

## Related Patterns

- Database transaction isolation levels
- Optimistic locking vs pessimistic locking  
- Idempotency keys in payment processing
- Distributed consensus algorithms

## Confidence Score: 0.9

High confidence because:
- Encountered in real implementation (not theoretical)
- Fix was tested with concurrent requests
- Pattern is well-documented in distributed systems literature
- Confirmed by multiple attempts to reproduce after fix
```

## Setup Instructions

### 1. Install the Skill

```bash
# Clone or copy the session-documenter skill to your Claude skills directory
mkdir -p ~/.claude/skills/session-documenter
cp -r skills/session-documenter/* ~/.claude/skills/session-documenter/
chmod +x ~/.claude/skills/session-documenter/scripts/*.js
```

### 2. Configure Hooks

Add to your `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "type": "command",
        "command": "node ~/.claude/skills/session-documenter/scripts/export-session.js",
        "async": true,
        "description": "Auto-export session on exit"
      }
    ],
    "UserPromptSubmit": [
      {
        "type": "prompt",
        "matcher": "prompt contains 'document this session'",
        "prompt": "Extract key decisions and learnings from this session. Use the session-documenter skill to create a markdown file in docs/ai-sessions/ with:\n- Summary\n- Decisions with thinking process\n- Challenges and solutions\n- Learnings for future\n\nFormat: docs/ai-sessions/YYYY-MM-DD-brief-description.md"
      }
    ]
  }
}
```

### 3. Project Setup

In each repository where you want session documentation:

```bash
# Create documentation directories
mkdir -p docs/ai-sessions
mkdir -p docs/decisions

# Add to .gitignore if you want to exclude session docs
# echo "docs/ai-sessions/" >> .gitignore

# Or commit them for team benefit
git add docs/
```

### 4. Optional: CLAUDE.md Configuration

Add to your project's `.claude/CLAUDE.md`:

```markdown
## Session Documentation Policy

After each significant session:
1. Use `/session-export` to capture reasoning
2. Review exported doc for accuracy  
3. Create ADR if architectural decision was made
4. Extract instincts for continuous learning

Decision template:
- Context: What problem?
- Options: What alternatives?
- Decision: What chosen?
- Rationale: Why? (include trade-offs)
- Consequences: What changes?
```

## Advanced Features

### Batch Export Old Sessions

```bash
# Export last 10 sessions
node scripts/bulk-export.js --count=10

# Export sessions from specific date range
node scripts/bulk-export.js --from=2026-02-01 --to=2026-02-17

# Export only sessions with >30 min duration
node scripts/bulk-export.js --min-duration=30
```

### Search Across Session Docs

```bash
# Find all sessions that dealt with authentication
grep -r "authentication" docs/ai-sessions/

# Find decisions about database choice
grep -r "Decision.*database" docs/ai-sessions/

# Use ripgrep for faster searching
rg "thinking process" docs/
```

### Integration with Tools

**VS Code**: Sessions auto-populate in workspace search
**Obsidian**: Import `docs/ai-sessions/` as vault
**Notion**: Sync session docs to Notion database
**Confluence**: Auto-push ADRs to Confluence space

## Troubleshooting

### Sessions Not Exporting

**Check:**
1. Hooks are in `~/.claude/settings.json` correctly
2. Script has execute permissions: `chmod +x scripts/*.js`
3. Session files exist: `ls ~/.claude/projects/`
4. Script path is absolute, not relative

### Missing Thinking Blocks

Claude's thinking process is only visible in certain contexts. To get more thinking:
- Use more complex prompts that require reasoning
- Ask "explain your thinking" explicitly
- Review sessions where Claude solved non-trivial problems

### Export Format Issues

**Markdown not rendering:**
- Check for unclosed code blocks
- Verify frontmatter syntax
- Ensure proper header hierarchy

## Examples Gallery

See these real session exports for reference:

- **Feature Implementation**: `examples/feature-auth-session.md`
- **Bug Investigation**: `examples/debug-memory-leak.md`  
- **Refactoring**: `examples/refactor-api-layer.md`
- **Architecture Decision**: `examples/adr-microservices.md`
- **Performance Optimization**: `examples/optimize-queries.md`

## Contributing

This skill is designed to integrate with everything-claude-code. To contribute:

1. Test on your own projects first
2. Document any patterns you discover
3. Submit PR with examples
4. Share in Discussions

Especially valuable:
- Alternative export formats (HTML, PDF, Notion)
- Better decision extraction heuristics
- Integration with other tools (Jira, Linear, etc.)
- Instinct pattern templates for common scenarios

## Related Skills

- **continuous-learning-v2**: Feeds on exported sessions to build instincts
- **doc-updater**: Keeps docs in sync as code evolves
- **code-reviewer**: References past decisions during review
- **planner**: Uses historical patterns for better planning

## License

MIT - Use freely, modify as needed, contribute back if you can.
