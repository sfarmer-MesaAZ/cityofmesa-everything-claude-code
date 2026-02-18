# Google Antigravity Skills

This directory contains skills for Google Antigravity, the agentic development platform.

## Installed Skills

### session-documenter
Located: `.agent/skills/session-documenter/`

**Purpose:** Captures session thought processes and converts them into structured documentation.

**How to use:**
```
"Use the session-documenter skill to export this session"
```

Or more specifically:
```
"Apply the session-documenter skill to create documentation for this session in docs/ai-sessions/"
```

**Features:**
- Extracts thinking blocks and decision rationale
- Creates structured markdown documentation
- Supports ADR (Architecture Decision Record) format
- Integrates with continuous-learning-v2 for pattern extraction

## Testing the Skill

1. **Open this project in Antigravity**
2. **Antigravity will auto-discover** skills in `.agent/skills/`
3. **Invoke the skill** using natural language:
   ```
   "Use session-documenter to document this conversation"
   ```

## Skill Structure

Each skill contains:
- `SKILL.md` - Metadata and instructions (required)
- `scripts/` - Optional executable scripts
- `templates/` - Optional templates
- `examples/` - Optional usage examples

## Adding More Skills

To add a skill from the main repository:

```bash
# Copy any skill from skills/ to .agent/skills/
cp -r skills/[skill-name] .agent/skills/
```

Example:
```bash
cp -r skills/continuous-learning-v2 .agent/skills/
cp -r skills/tdd-workflow .agent/skills/
```

## Antigravity vs Claude Code

| Feature | Antigravity | Claude Code |
|---------|-------------|-------------|
| Skill location | `.agent/skills/` | `.claude/skills/` |
| Command location | N/A | `.claude/commands/` |
| Script execution | ✅ Python, Bash, Node, Go | Limited |
| Auto-discovery | ✅ Yes | ✅ Yes |
| Permissions | Granular allow/deny | Basic |

## Next Steps

1. Launch Antigravity in this directory
2. Verify the skill appears in available skills
3. Test by asking: "Use session-documenter to export this session"
4. Check `docs/ai-sessions/` for the generated documentation

## Resources

- [Antigravity Documentation](https://antigravityai.org/)
- [Custom Skills Tutorial](https://medium.com/google-cloud/tutorial-getting-started-with-antigravity-skills-864041811e0d)
- [Everything Claude Code Repository](https://github.com/affaan-m/everything-claude-code)
