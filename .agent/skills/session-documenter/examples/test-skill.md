# Testing the session-documenter Skill in Antigravity

## Test Prompts

### Basic Export
```
Use the session-documenter skill to export this session to docs/ai-sessions/
```

### With ADR Format
```
Apply session-documenter to create an Architecture Decision Record for the decisions made in this session
```

### With Instincts
```
Use session-documenter with instinct extraction to capture learnings from this session
```

## Expected Behavior

When invoked, Antigravity should:

1. **Read the SKILL.md** to understand the task
2. **Review the conversation history** in the current session
3. **Extract key information:**
   - Session summary
   - Key decisions with thinking process
   - Technical challenges and solutions
   - Files modified
   - Learnings for future sessions

4. **Create documentation** in `docs/ai-sessions/YYYY-MM-DD-description.md`

## Verification Steps

After running the skill:

1. Check that `docs/ai-sessions/` directory exists
2. Verify a new markdown file was created
3. Open the file and confirm it contains:
   - Session metadata (date, duration, files changed)
   - Summary section
   - Key decisions with thinking processes
   - Technical challenges
   - Learnings section

## Example Output

The skill should create a file like:

```
docs/ai-sessions/2026-02-17-test-antigravity-skill.md
```

With structure similar to:

```markdown
# Session: Test Antigravity Skill

**Date:** 2026-02-17
**Duration:** 10 minutes
**Files Changed:** 3
**Status:** ✓ Completed

## Summary
Tested the session-documenter skill in Google Antigravity...

## Key Decisions
### Decision 1: Use Antigravity for Testing
**Context:** Needed to verify custom skill functionality...
...
```

## Troubleshooting

If the skill doesn't work:

1. **Verify skill discovery:**
   - Ask: "What skills are available?"
   - Check: `.agent/skills/session-documenter/SKILL.md` exists

2. **Check permissions:**
   - Antigravity needs file write permissions
   - Ensure `docs/ai-sessions/` is writable

3. **Review Antigravity logs:**
   - Look for skill loading errors
   - Check for permission denials

## Success Criteria

✅ Skill appears in Antigravity's available skills
✅ Can invoke skill via natural language
✅ Documentation file is created in docs/ai-sessions/
✅ File contains structured session information
✅ Thinking processes and decisions are captured
