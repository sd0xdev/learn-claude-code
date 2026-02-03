---
name: review-lesson
description: Review a lesson for accuracy against Claude Code docs
argument-hint: "<lesson-file or number>"
---

# Review Lesson

Review the lesson **$ARGUMENTS** for accuracy against official Claude Code documentation.

## Steps

1. **Read the lesson**

   - If a number is given (e.g., "04"), read `learn-claude/04-*.md`
   - If a file path is given, read that file

2. **Check against official docs**

   - Fetch https://docs.anthropic.com/en/docs/claude-code for reference
   - Also check https://docs.anthropic.com/en/docs/claude-code/cli-usage
   - Cross-reference any claims in the lesson

3. **Review for**
   - **Accuracy** - Is the information correct?
   - **Completeness** - Is anything important missing?
   - **Currency** - Is anything outdated?
   - **Clarity** - Is it easy to understand?

## Output Format

```markdown
## Lesson Review: [Title]

### Accuracy

- ✅ Correct: [list accurate claims]
- ❌ Incorrect: [list inaccuracies with corrections]
- ⚠️ Outdated: [list outdated info with updates]

### Missing

- [Important topics not covered]

### Suggestions

- [Improvements to make]

### Verdict

[PASS / NEEDS UPDATES / MAJOR REVISION NEEDED]
```

## Guidelines

- Be specific about what's wrong and how to fix it
- Reference the official docs for corrections
- Note if something couldn't be verified
- Prioritize factual accuracy over style
