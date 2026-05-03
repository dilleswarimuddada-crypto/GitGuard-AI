// Mock reviewer — no API needed
async function reviewCode(diff) {
  console.log("\n🤖 Mock AI Review running...");

  // very simple rule-based checks (just to show output)
  let findings = [];

  if (diff.includes("console.log(")) {
    findings.push("- Remove debug console.log statements before production.");
  }

  if (diff.includes("password") || diff.includes("token")) {
    findings.push("- Sensitive data detected. Avoid committing secrets.");
  }

  if (diff.length < 50) {
    findings.push("- Very small change. No major issues found.");
  }

  const result =
    findings.length > 0
      ? "### Review Findings:\n" + findings.join("\n")
      : "### Review Result:\nCode looks good. No major issues found.";

  console.log("✅ Review complete!");
  return result;
}

module.exports = { reviewCode };
