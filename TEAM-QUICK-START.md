# Team Quick Start: Installing Session Documenter Plugin

**Time required:** 5 minutes
**Prerequisites:** Claude Code or VS Code with Claude Code extension

---

## Option 1: Install from Marketplace (Recommended)

### Step 1: Add the Marketplace

```bash
/plugin marketplace add YOUR-USERNAME/everything-claude-code
```

Replace `YOUR-USERNAME` with the actual GitHub username or organization.

### Step 2: Install the Plugin

```bash
/plugin install your-company-claude-code@YOUR-USERNAME/everything-claude-code
```

### Step 3: Reload

**In VS Code:**
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type "Reload Window"
- Press Enter

**In Claude Code CLI:**
- Restart your Claude Code session

### Step 4: Verify

Type `/session` and you should see autocomplete options:
- `/session-documenter`
- `/session-export`

---

## Option 2: Direct Installation (Alternative)

If marketplace isn't set up yet:

```bash
/plugin install https://github.com/YOUR-USERNAME/everything-claude-code.git
```

Then follow Step 3 (Reload) above.

---

## First Use

### Test It Out

1. **Do some coding work** (any task)

2. **Export the session:**
   ```
   /session-export
   ```

3. **Check the output:**
   ```bash
   ls docs/ai-sessions/
   ```

4. **Open the file** and see your documented session!

### What You'll Get

A markdown file with:
- ✅ Session summary
- ✅ Key decisions with thinking process
- ✅ Technical challenges and solutions
- ✅ Files modified
- ✅ Learnings for future sessions

---

## When to Use

Use `/session-export` when you want to capture:

- **After solving a bug** - Document what went wrong and how you fixed it
- **After implementing a feature** - Capture design decisions
- **Making architecture choices** - Create decision records
- **End of day** - Save your progress and learnings
- **Before code review** - Document your thinking for reviewers

---

## Commands Available

### `/session-export`
Basic session export to `docs/ai-sessions/`

### `/session-export --adr`
Create an Architecture Decision Record in `docs/decisions/`

### `/session-export --instincts`
Extract patterns for continuous learning system

### `/session-documenter`
Alternative command name (same functionality)

---

## Natural Language (Also Works)

Don't like slash commands? Just ask:

```
"Please document this session's key decisions"
```

or

```
"Export this session to docs/ai-sessions/"
```

---

## Troubleshooting

### Commands don't appear after install?

**Solution:** Reload your window/session

```
VS Code: Ctrl+Shift+P -> "Reload Window"
CLI: Restart session
```

### "Plugin not found"?

**Solution:** Check the marketplace was added

```bash
/plugin marketplace list
```

If not listed, add it:

```bash
/plugin marketplace add YOUR-USERNAME/everything-claude-code
```

### Permission errors?

**For private repositories:**

```bash
# Set up SSH authentication
ssh-add ~/.ssh/id_rsa

# Or use personal access token
git config --global credential.helper store
```

---

## Examples

### Example 1: Quick Export

```
# After fixing a bug:
/session-export

# Result: docs/ai-sessions/2026-02-17-fix-login-bug.md
```

### Example 2: Architecture Decision

```
# After choosing database:
/session-export --adr

# Result: docs/decisions/ADR-001-use-postgresql.md
```

### Example 3: End of Day

```
# Capturing daily progress:
"Document this session with summary of what I accomplished today"

# Result: Complete session doc with all work captured
```

---

## What Gets Installed

When you install this plugin, you get:

- ✅ **44 skills** (including session-documenter)
- ✅ **31 commands** (including /session-export)
- ✅ **13 agents** (planner, code-reviewer, etc.)
- ✅ **Hooks** and templates
- ✅ **Coding standards** and patterns

---

## Learn More

- **Full documentation:** [README.md](README.md)
- **Distribution guide:** [DISTRIBUTION-GUIDE.md](DISTRIBUTION-GUIDE.md)
- **Session documenter details:** [skills/session-documenter/SKILL.md](skills/session-documenter/SKILL.md)
- **Examples:** [docs/ai-sessions/](docs/ai-sessions/)

---

## Support

**Questions?** Contact:
- #dev-tools Slack channel (if available)
- Open an issue: https://github.com/YOUR-USERNAME/everything-claude-code/issues
- DM the maintainer

**Feedback?** We'd love to hear how it's working for you!

---

## Success Checklist

- [ ] Marketplace added
- [ ] Plugin installed
- [ ] Window reloaded
- [ ] `/session-export` appears in autocomplete
- [ ] Tested export - file created in `docs/ai-sessions/`
- [ ] File contains session summary and decisions
- [ ] Shared feedback with team

---

**Happy documenting! 🎉**

*Remember: The goal is to capture your thinking so others (and future you) can learn from your decisions.*
