require("dotenv").config();
const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Raw body needed for signature verification
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// ── Signature Verification ──────────────────────────────────────
function verifyGitHubSignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const hash = "sha256=" + crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  );
}

// ── Webhook Endpoint ────────────────────────────────────────────
app.post("/webhook", (req, res) => {
  // Step 1: Verify the request is genuinely from GitHub
  if (!verifyGitHubSignature(req)) {
    console.log("❌ Invalid signature — request rejected");
    return res.status(401).send("Unauthorized");
  }

  const event = req.headers["x-github-event"];
  const payload = req.body;

  // Step 2: Filter for Pull Request events only
  if (event === "pull_request") {
    const action = payload.action;           // opened, closed, etc.
    const prNumber = payload.number;
    const repoName = payload.repository.full_name;
    const prTitle = payload.pull_request.title;

    console.log(`\n✅ PR Event Received!`);
    console.log(`   Repo   : ${repoName}`);
    console.log(`   PR #   : ${prNumber}`);
    console.log(`   Title  : ${prTitle}`);
    console.log(`   Action : ${action}`);

    // Only act when a PR is opened or updated
    if (action === "opened" || action === "synchronize") {
      console.log(`\n🔍 PR is ready for review — Diff Analyzer will run here (Week 2)`);
      // Week 2 hook: diffAnalyzer will be called here
    }
  }

  res.status(200).send("OK");
});

// ── Health Check ────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("GitGuard AI is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 GitGuard AI listening on port ${PORT}`);
});
