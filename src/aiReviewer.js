const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function reviewCode(diff) {
  try {
    console.log("\n🤖 Sending diff to Gemini AI for review...");

    // Use latest working model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are an expert code reviewer.

Analyze the following code diff and identify:

1. Bugs or logical errors
2. Security vulnerabilities
3. Performance issues
4. Suggestions for improvement

For each issue:
- Explain the problem
- Show corrected code (if possible)

If code is good, say "Code looks good".

Code diff:
${diff}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    console.log("✅ AI Review complete!");
    return response;

  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    return null;
  }
}

module.exports = { reviewCode };
