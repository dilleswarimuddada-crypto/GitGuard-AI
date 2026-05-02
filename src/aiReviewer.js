const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function reviewCode(diff) {
  try {
    console.log("\n🤖 Sending diff to Groq AI for review...");

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // fast + free model
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer.",
        },
        {
          role: "user",
          content: `
Analyze the following code diff and identify:

1. Bugs or logical errors
2. Security issues
3. Performance improvements
4. Suggestions

If code is good, say "Code looks good".

Code diff:
${diff}
          `,
        },
      ],
    });

    const response = completion.choices[0].message.content;

    console.log("✅ AI Review complete!");
    return response;

  } catch (error) {
    console.error("❌ Groq API error:", error.message);
    return null;
  }
}

module.exports = { reviewCode };
