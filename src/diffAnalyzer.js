const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function fetchPRDiff(owner, repo, pullNumber) {
  try {
    console.log(`\n📂 Fetching diff for PR #${pullNumber}...`);

    // Fetch list of files changed in the PR
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
    });

    // Extract only added/modified lines from the diff
    let cleanDiff = "";
    files.forEach((file) => {
      cleanDiff += `\n### File: ${file.filename}\n`;
      cleanDiff += `Status: ${file.status}\n`;
      if (file.patch) {
        cleanDiff += `Changes:\n${file.patch}\n`;
      }
    });

    console.log(`✅ Diff fetched! ${files.length} file(s) changed`);
    return cleanDiff;

  } catch (error) {
    console.error("❌ Error fetching diff:", error.message);
    return null;
  }
}

module.exports = { fetchPRDiff };
