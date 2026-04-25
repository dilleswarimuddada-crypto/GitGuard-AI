const { Octokit } = require("@octokit/rest");
console.log("TOKEN:", process.env.GITHUB_TOKEN);

// Debug (optional - remove later)
console.log("🔑 GitHub Token Loaded:", process.env.GITHUB_TOKEN ? "YES" : "NO");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function fetchPRDiff(owner, repo, pullNumber) {
  try {
    console.log(`\n📂 Fetching diff for PR #${pullNumber}...`);

    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
    });

    if (!files || files.length === 0) {
      console.log("⚠️ No files found in PR");
      return null;
    }

    let cleanDiff = "";

    files.forEach((file) => {
      cleanDiff += `\n### File: ${file.filename}\n`;
      cleanDiff += `Status: ${file.status}\n`;

      if (file.patch) {
        cleanDiff += `Changes:\n${file.patch}\n`;
      } else {
        cleanDiff += "No patch available\n";
      }
    });

    console.log(`✅ Diff fetched! ${files.length} file(s) changed`);
    return cleanDiff;

  } catch (error) {
    console.error("❌ Error fetching diff:", error.message);

    // Extra debug
    if (error.status === 401) {
      console.error("👉 Unauthorized: Check your GitHub token");
    }

    return null;
  }
}

module.exports = { fetchPRDiff };
