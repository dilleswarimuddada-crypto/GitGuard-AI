const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function reviewCode(diff) {
  try {
    console.log("\n🤖 Sending diff to OpenAI for review...");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are an expert code reviewer. Analyze the following code diff and identify:

1. Bugs or logical errors
2. Security vulnerabilities
3. Performance issues
4. Suggestions for improvement

Provide clear explanations and improved code if needed.

Code diff:
${diff}
          `,
        },
      ],
    });

    const result = response.choices[0].message.content;

    console.log("✅ AI Review complete!");
    return result;

  } catch (error) {
    console.error("❌ OpenAI API error:", error.message);
    return null;
  }
}

module.exports = { reviewCode };
