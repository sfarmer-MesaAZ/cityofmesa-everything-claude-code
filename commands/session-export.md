---
name: session-export
description: Export current session transcript with thought processes to repository documentation
---

Extract the key technical decisions, reasoning, and thought processes from this session and create structured documentation.

## What to Export

1. **Session Summary** (2-3 sentences overview)
2. **Key Decisions** with thinking process and rationale
3. **Technical Challenges & Solutions** (what blocked progress, how it was solved)
4. **Files Modified** (list with purpose of each change)
5. **Tool Usage Patterns** (what tools were used and when)
6. **Learnings for Future Sessions** (patterns discovered, things to remember)

## Output Format

Save to `docs/ai-sessions/YYYY-MM-DD-brief-description.md` with the following structure:

```markdown
# Session: [Brief Title]
**Date:** YYYY-MM-DD
**Duration:** X minutes
**Files Changed:** N
**Status:** ✓ Completed / ⚠ In Progress / ✗ Blocked

## Summary

[2-3 sentence overview of what was accomplished]

## Key Decisions

### Decision 1: [Title]
**Context:** [What problem needed solving?]

**Thinking Process:**
> [Quote the actual thinking from the session - this is the valuable part!]
> [Include trade-offs considered, alternatives evaluated]

**Decision:** [What was chosen]
**Rationale:** [Why this choice?]
**Files Modified:** [List affected files]

### Decision 2: [Title]
[... repeat pattern ...]

## Technical Challenges

### Challenge 1: [Title]
**Problem:** [What went wrong or was difficult]
**Solution:** [How it was solved]
**Learning:** [Pattern to remember for future]

## Tool Usage Patterns
- **Edit**: X times (purpose)
- **Read**: Y times (purpose)
- **Bash**: Z times (purpose)
- **Grep**: A times (purpose)

## Files Modified
- `path/to/file1.ts` - [What changed and why]
- `path/to/file2.ts` - [What changed and why]

## Learnings for Future Sessions

1. **[Learning Title]**: [Description of pattern/insight]
2. **[Learning Title]**: [Description of pattern/insight]

## Next Session Recommendations

- [What should be done next]
- [Follow-up items]
```

## Special Export Options

If the user asks for specific export formats, adapt accordingly:

### ADR (Architecture Decision Record)
When user requests `--adr` or mentions "architecture decision":
- Save to `docs/decisions/ADR-NNN-title.md`
- Use ADR format: Status, Context, Decision, Alternatives Considered, Consequences
- Reference the full session doc in the ADR

### Instincts Export
When user requests `--instincts` or mentions "continuous learning":
- Extract problem-solving patterns from thinking blocks
- Create instinct files compatible with `continuous-learning-v2` skill
- Save to `~/.claude/instincts/` or include in session doc frontmatter

### HTML Export
When user requests `--format=html`:
- Generate HTML with syntax highlighting
- Include collapsible sections for thinking blocks
- Add navigation between related sessions

## Integration Points

This command works with:
- **continuous-learning-v2**: Patterns feed back into future sessions
- **doc-updater**: Keep session docs in sync with code evolution
- **code-reviewer**: Reference past decisions during review
- **checkpoint**: Save session state at milestones

## Examples

### Basic Export
```
User: /session-export
Claude: [Exports current session to docs/ai-sessions/2026-02-17-session.md]
```

### Export with ADR
```
User: /session-export --adr
Claude: [Creates both session doc AND ADR-NNN-decision-title.md]
```

### Export for Learning
```
User: /session-export --instincts
Claude: [Exports session AND extracts patterns for continuous-learning-v2]
```

## Tips for Better Exports

1. **During Session**: Explicitly state your thinking when making decisions
2. **Be Specific**: Mention trade-offs, alternatives considered, constraints
3. **Reference Context**: Link to related files, commits, or previous sessions
4. **Include Failures**: Document what didn't work - that's often the most valuable learning
5. **Tag Patterns**: Use consistent keywords like "Decision:", "Learning:", "Challenge:"

## Privacy Note

Review exported sessions before committing to git. Thinking blocks may contain:
- Hardcoded credentials (sanitize these!)
- Internal architecture details
- Sensitive business logic
- Personal information

Always audit exports before sharing publicly or committing to shared repositories.
