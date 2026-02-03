═══════════════════════════════════════════════════════════════════
LESSON 10: Application Agents
═══════════════════════════════════════════════════════════════════

You used Claude subagents to create new game characters. The characters exist, but their responses are static.

Now let's make them respond dynamically to users with AI.

For this lesson, you'll need to have an Anthropic API key which requires credits of at least $5 dollars, the prompts in this lesson will also install the Anthropic SDK. If you prefer to skip it, just type `/course complete`.

## The Difference

- **Claude subagents** — help you write code
- **Application agents** — run in the app and interacts with the player.

## Security Note

Be careful with your API key. It should not be commited, exposed to the browser, or shared with anyone.

## Try It

1. Ask Claude to create the `.env` file:

   > Create a `.env` file in the dungeon directory with my API key. The file should contain:
   >
   > ```
   > ANTHROPIC_API_KEY=sk-ant-xxxxx
   > ```
   >
   > Add the .env file to .gitignore.

2. Get your API key from https://console.anthropic.com/settings/keys and replace `sk-ant-xxxxx` with your actual API key.

3. In plan mode, ask Claude to add the API integration:

   > Add Claude API integration so NPCs respond dynamically:
   >
   > - Install the Anthropic SDK and dotenv
   > - Create a POST /api/talk endpoint in server.js
   > - Use ANTHROPIC_API_KEY from environment
   > - It should take { character, message } and return an AI response
   > - The character's personality and knowledge should shape the response
   > - When in dialogue mode, the player types messages directly (no prefix needed)
   > - Typing "leave" or moving to another room exits dialogue mode

4. Restart the server:

   ```bash
   node dungeon/server.js
   ```

5. Test it in the game (use arrow keys or type commands):

   ```
   ↑ (or go up)
   ↑ (or go up)
   talk
   what do you know about the goblin?
   tell me about yourself
   leave
   ```

The NPCs should now respond dynamically, using their personality and knowledge. They're not just data — they're agents.

## You Did It!

You've reached the end of the course.

When you're ready, run:

```
/course complete
```
