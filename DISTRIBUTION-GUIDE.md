# Distribution Guide: Sharing Your Custom Plugin with Your Team

This guide shows you how to distribute the everything-claude-code repository (with your session-documenter additions) to other developers in your group.

## 🎯 Distribution Options

You have **three main options** for distributing this to your team:

### Option 1: Fork and Create Your Own Plugin Marketplace (Recommended)
Best for: Teams that want full control and customization

### Option 2: Direct GitHub Repository Installation
Best for: Quick testing with a small team

### Option 3: Private Company Marketplace
Best for: Enterprise teams with many developers

---

## Option 1: Fork and Create Your Own Plugin Marketplace

### Step 1: Fork the Repository

**If you haven't already:**

```bash
# On GitHub:
1. Go to https://github.com/affaan-m/everything-claude-code
2. Click "Fork" button
3. Choose your organization or personal account
4. Wait for fork to complete

# Clone your fork:
git clone https://github.com/YOUR-USERNAME/everything-claude-code.git
cd everything-claude-code
```

**Or use your existing local repository:**

If you've been working locally and want to push to a new repo:

```bash
# In your current directory:
git remote add origin https://github.com/YOUR-USERNAME/everything-claude-code.git
git push -u origin main
```

### Step 2: Update Plugin Metadata

Update `.claude-plugin/plugin.json` with your information:

```json
{
  "name": "your-company-claude-code",
  "version": "1.0.0",
  "description": "Custom Claude Code configurations for [Your Company] including session-documenter",
  "author": {
    "name": "Your Name or Company Name",
    "url": "https://github.com/YOUR-USERNAME"
  },
  "homepage": "https://github.com/YOUR-USERNAME/everything-claude-code",
  "repository": "https://github.com/YOUR-USERNAME/everything-claude-code",
  "license": "MIT",
  "keywords": [
    "claude-code",
    "session-documenter",
    "agents",
    "skills",
    "your-company"
  ],
  "skills": ["./skills/", "./commands/"],
  "agents": [
    "./agents/architect.md",
    "./agents/code-reviewer.md",
    "./agents/planner.md"
    // ... add all your agents
  ]
}
```

### Step 3: Update Marketplace Metadata

Update `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-company-marketplace",
  "owner": {
    "name": "Your Company Name",
    "email": "team@yourcompany.com"
  },
  "metadata": {
    "description": "Internal Claude Code plugins for [Your Company]"
  },
  "plugins": [
    {
      "name": "your-company-claude-code",
      "source": "./",
      "description": "Complete collection including session-documenter and team-specific configurations",
      "author": {
        "name": "Your Company Name"
      },
      "homepage": "https://github.com/YOUR-USERNAME/everything-claude-code",
      "repository": "https://github.com/YOUR-USERNAME/everything-claude-code",
      "license": "MIT",
      "keywords": [
        "session-documenter",
        "agents",
        "skills",
        "commands"
      ],
      "category": "workflow",
      "tags": [
        "internal",
        "team",
        "session-documenter"
      ]
    }
  ]
}
```

### Step 4: Commit and Push

```bash
git add .claude-plugin/plugin.json .claude-plugin/marketplace.json
git commit -m "chore: update plugin metadata for company distribution"
git push origin main
```

### Step 5: Team Installation Instructions

Share these instructions with your team:

```bash
# Add your custom marketplace
/plugin marketplace add YOUR-USERNAME/everything-claude-code

# Browse available plugins
/plugin list

# Install the plugin
/plugin install your-company-claude-code@YOUR-USERNAME/everything-claude-code

# Verify installation
/plugin list installed
```

**For VS Code Claude Code Extension users:**

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Reload Window"
3. After reload, commands should appear: `/session-export`, `/session-documenter`

---

## Option 2: Direct GitHub Repository Installation

### Quick Installation for Team Members

Your team can install directly from your repository without a marketplace:

```bash
# Install from your GitHub repository
/plugin install https://github.com/YOUR-USERNAME/everything-claude-code.git

# Or if using SSH:
/plugin install git@github.com:YOUR-USERNAME/everything-claude-code.git
```

### Advantages:
- ✅ No marketplace setup needed
- ✅ Immediate distribution
- ✅ Simple URL sharing

### Disadvantages:
- ❌ No plugin browsing/discovery
- ❌ Less discoverable for team
- ❌ Manual updates required

---

## Option 3: Private Company Marketplace

For larger teams or enterprises, create a dedicated marketplace repository.

### Step 1: Create Marketplace Repository

```bash
# Create new repository on GitHub:
# Repository name: "company-claude-marketplace"
# Description: "Internal Claude Code Plugin Marketplace"
# Visibility: Private (if needed)

# Clone it:
git clone https://github.com/YOUR-ORG/company-claude-marketplace.git
cd company-claude-marketplace
```

### Step 2: Create Marketplace Structure

```bash
mkdir -p .claude-plugin
mkdir -p plugins
```

Create `.claude-plugin/marketplace.json`:

```json
{
  "name": "company-marketplace",
  "owner": {
    "name": "Your Company",
    "email": "devtools@yourcompany.com"
  },
  "metadata": {
    "description": "Internal Claude Code plugins for Your Company developers"
  },
  "plugins": [
    {
      "name": "session-documenter",
      "source": "git+https://github.com/YOUR-USERNAME/everything-claude-code.git",
      "description": "Session documentation and thought process capture",
      "author": {
        "name": "Your Company DevTools Team"
      },
      "homepage": "https://github.com/YOUR-USERNAME/everything-claude-code",
      "repository": "https://github.com/YOUR-USERNAME/everything-claude-code",
      "license": "MIT",
      "keywords": ["session-docs", "documentation"],
      "category": "productivity",
      "tags": ["internal", "documentation"]
    },
    {
      "name": "company-patterns",
      "source": "./plugins/company-patterns",
      "description": "Company-specific coding patterns and standards",
      "author": {
        "name": "Your Company"
      },
      "category": "workflow",
      "tags": ["internal", "standards"]
    }
  ]
}
```

### Step 3: Add README

Create `README.md` in marketplace repo:

```markdown
# Company Claude Code Marketplace

Internal plugin marketplace for [Your Company] developers.

## Available Plugins

### session-documenter
Capture thought processes and export session transcripts.

### company-patterns
Company-specific coding patterns and best practices.

## Installation

```bash
# Add marketplace
/plugin marketplace add YOUR-ORG/company-claude-marketplace

# Browse plugins
/plugin list

# Install a plugin
/plugin install session-documenter@YOUR-ORG/company-claude-marketplace
```

## Adding New Plugins

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add plugins to this marketplace.
```

### Step 4: Commit and Share

```bash
git add .
git commit -m "feat: initialize company Claude Code marketplace"
git push origin main
```

### Step 5: Team Usage

Team members add your marketplace once:

```bash
/plugin marketplace add YOUR-ORG/company-claude-marketplace
```

Then they can discover and install any plugin you add to the marketplace.

---

## 📦 What Gets Distributed

When team members install your plugin, they get:

### Skills (44 total)
- ✅ `session-documenter` - Your new addition!
- ✅ `continuous-learning-v2` - With session integration
- ✅ All other skills from everything-claude-code

### Commands
- ✅ `/session-export` - Your new command!
- ✅ `/tdd`, `/plan`, `/code-review`, etc.
- ✅ All 31 commands

### Agents (13)
- ✅ `planner`, `code-reviewer`, `tdd-guide`
- ✅ All specialized agents

### Hooks
- ✅ Hook examples and templates

### Rules
- ✅ Common coding standards
- ✅ Language-specific patterns

---

## 🔒 Private Distribution Options

### For Private/Internal Repositories:

#### Option A: GitHub Private Repository
```bash
# Team needs GitHub access to your private repo
/plugin install git@github.com:YOUR-ORG/private-claude-plugins.git
```

Requires:
- Team members have repository access
- SSH keys configured
- Or use Personal Access Tokens

#### Option B: Private Package Registry
Host marketplace.json on internal server:

```bash
/plugin marketplace add https://internal.company.com/claude-marketplace.json
```

#### Option C: Shared Network Drive
For air-gapped environments:

```bash
# Copy to shared drive
cp -r everything-claude-code /mnt/shared-drive/claude-plugins/

# Team installs from local path
/plugin install /mnt/shared-drive/claude-plugins/everything-claude-code
```

---

## 📝 Testing Before Distribution

### Validate Your Plugin

```bash
# Test plugin structure
/plugin validate .

# Test installation locally
/plugin install ./

# Verify skills load
/skill list

# Test commands appear
# Type: /session-export (should autocomplete)
```

### Create Test Checklist

Share this checklist with early testers:

- [ ] Add marketplace: `/plugin marketplace add YOUR-USERNAME/repo`
- [ ] Install plugin: `/plugin install plugin-name@marketplace`
- [ ] Reload VS Code window
- [ ] Verify `/session-export` appears in autocomplete
- [ ] Verify `/session-documenter` appears in autocomplete
- [ ] Test `/session-export` creates docs/ai-sessions/ file
- [ ] Check file format matches template
- [ ] Verify all skills appear: `/skill list`

---

## 🚀 Distribution Workflow Example

### For Your Team:

**1. Developer onboarding script:**

```bash
#!/bin/bash
# onboard-claude-code.sh

echo "🚀 Setting up Claude Code plugins..."

# Add company marketplace
/plugin marketplace add YOUR-ORG/company-claude-marketplace

# Install core plugins
/plugin install session-documenter@YOUR-ORG/company-claude-marketplace

echo "✅ Setup complete!"
echo "Reload your VS Code window to activate commands."
echo "Try typing: /session-export"
```

**2. Share via Slack/Teams:**

```
📣 New Claude Code Plugin Available!

We've created a custom session-documenter plugin to capture our development thought processes.

**Installation:**
1. Add marketplace: `/plugin marketplace add YOUR-USERNAME/everything-claude-code`
2. Install plugin: `/plugin install your-company-claude-code@YOUR-USERNAME/everything-claude-code`
3. Reload VS Code
4. Test: `/session-export`

**Documentation:** https://github.com/YOUR-USERNAME/everything-claude-code

**Questions?** Ask in #dev-tools channel
```

---

## 🔄 Updating the Plugin

### Version Updates

When you add new features:

```bash
# Update version in .claude-plugin/plugin.json
{
  "version": "1.1.0",  // Increment version
  ...
}

# Commit and push
git add .claude-plugin/plugin.json
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags
```

### Team Updates

Team members update to latest version:

```bash
# Check for updates
/plugin update

# Or update specific plugin
/plugin update your-company-claude-code

# Reload VS Code
# Ctrl+Shift+P -> "Reload Window"
```

---

## 📊 Metrics and Adoption

### Track Usage (Optional)

Add to your marketplace README:

```markdown
## Usage Stats

- Installations: [Track manually or via GitHub insights]
- Active users: [Poll team]
- Most used commands: [Survey]
```

### Gather Feedback

Create feedback template in your repo:

```markdown
## Session Documenter Feedback

**What works well:**
-

**What could be improved:**
-

**Feature requests:**
-

**Bugs encountered:**
-
```

---

## 🆘 Troubleshooting

### Common Installation Issues

**Issue: "Plugin not found"**
```bash
# Verify marketplace is added
/plugin marketplace list

# Check repository URL is correct
# Try full URL instead of shorthand
/plugin marketplace add https://github.com/YOUR-USERNAME/everything-claude-code.git
```

**Issue: "Commands not appearing"**
```bash
# Reload VS Code window
Ctrl+Shift+P -> "Reload Window"

# Verify plugin installed
/plugin list installed

# Check .claude/commands/ directory
ls ~/.claude/commands/
```

**Issue: "Permission denied"**
```bash
# For private repos, set up authentication
git config --global credential.helper store

# Or use SSH
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

---

## 📋 Distribution Checklist

Before sharing with your team:

- [ ] Fork/clone repository to your GitHub
- [ ] Update `.claude-plugin/plugin.json` with your info
- [ ] Update `.claude-plugin/marketplace.json` with your info
- [ ] Test installation locally
- [ ] Verify `/session-export` and `/session-documenter` work
- [ ] Create installation documentation
- [ ] Test with 1-2 team members first
- [ ] Gather feedback
- [ ] Roll out to full team
- [ ] Create support channel (Slack/Teams)
- [ ] Schedule training session (optional)

---

## 🎓 Training Materials

### Quick Start Guide for Team

Create a `QUICKSTART.md` in your repository:

```markdown
# Quick Start: Session Documenter

## Installation (5 minutes)

1. Add marketplace:
   ```
   /plugin marketplace add YOUR-USERNAME/everything-claude-code
   ```

2. Install plugin:
   ```
   /plugin install your-company-claude-code@YOUR-USERNAME/everything-claude-code
   ```

3. Reload VS Code (Ctrl+Shift+P -> "Reload Window")

## First Use (2 minutes)

1. Work on a coding task
2. When done, type: `/session-export`
3. Check `docs/ai-sessions/` for generated documentation

## What It Captures

- Key decisions with thinking process
- Technical challenges and solutions
- Files modified and why
- Learnings for future sessions

## When to Use

- After completing a feature
- After solving a difficult bug
- After making architectural decisions
- End of day to capture progress
```

---

## 📞 Support

### For Your Team

Create a support section in your README:

```markdown
## Support

**Questions?** Ask in #dev-tools Slack channel

**Bugs?** Open an issue: https://github.com/YOUR-USERNAME/everything-claude-code/issues

**Feature requests?** Start a discussion: https://github.com/YOUR-USERNAME/everything-claude-code/discussions

**Need help?** DM @your-username
```

---

## 🎯 Success Metrics

Track these to measure adoption:

- Number of installations
- Number of session docs created
- Team satisfaction (survey)
- Time saved (estimate)
- Knowledge retention improvement
- Onboarding speed for new developers

---

## Next Steps

1. **Choose your distribution option** (Marketplace recommended)
2. **Update plugin metadata** with your information
3. **Test with 1-2 teammates** first
4. **Gather feedback** and iterate
5. **Roll out to full team** with training
6. **Monitor adoption** and provide support

---

**Questions?** See [FAQ.md](FAQ.md) or open an issue!
