const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function reviewCode(diff) {
  try {
    console.log("\n🤖 Sending diff to Gemini AI for review...");

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });

    const prompt = `
You are an expert code reviewer. Analyze the following code diff and identify:
1. 🐛 Bugs or logical errors
2. 🔒 Security vulnerabilities  
3. ⚡ Performance issues
4. 💡 Suggestions for improvement

For each issue found, provide:
- The problem description
- The affected code
- The corrected code block

Format your response in clean Markdown.
If the code looks good, say so clearly.

Here is the code diff to review:

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
