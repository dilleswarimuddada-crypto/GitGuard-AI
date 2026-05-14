# GitGuard AI 🛡️

An automated AI-powered Pull Request reviewer.
When a PR is opened, GitGuard fetches the code diff,
analyzes it for bugs and security issues using an LLM,
and posts a review comment directly on the PR.

## Week 1 Status ✅
- Webhook listener set up
- GitHub signature verification implemented
- PR event parsing working

## Setup
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in values
3. Run `npm install`
4. Run the server:
```bash
GITHUB_WEBHOOK_SECRET=gitguard123 node src/webhook.js

## Week 2 – Diff Analysis + AI Review
- Listens to GitHub webhook events
- Fetches Pull Request diff
- Sends diff to AI for analysis
- Generates review feedback 

## Week 3 – Automated PR Comments
- Uses GitHub API (Octokit)
- Posts AI-generated review directly on PR
- Works for:
  - PR opened
  - PR updated (synchronize)

## Week 4 – Review Logging (History Tracking)
- Saves AI review results into a file: `reviews.log`
- Maintains history of all reviews
- Helps debugging and auditing

How It Works
1. GitHub PR triggers webhook
2. Webhook receives event
3. Diff is fetched from GitHub
4. AI analyzes code
5. Review is:
   - Posted to PR
   - Saved in `reviews.log`

Review Logging Feature (Week 4)

This project includes a review logging feature that stores AI-generated code review results in a file.

###  What it does
- Captures AI review output for each Pull Request
- Saves results into a local file: `reviews.log`
- Maintains history of reviews for tracking and debugging

###  How it works
- When a PR is triggered, the webhook processes the code diff
- The AI generates a review
- The review is:
  - Posted as a comment on the PR
  - Saved into `reviews.log`

Frontend Interface
The GitGuard AI frontend dashboard provides a modern and interactive user interface to monitor pull request analysis results.
It displays important metrics such as total PRs scanned, detected issues, security score, and live analysis feed in a clean dashboard layout.
The frontend was developed using HTML and CSS to create a responsive and visually appealing interface for better user experience.
