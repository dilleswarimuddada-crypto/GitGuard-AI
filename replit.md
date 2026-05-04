# GitGuard AI

An automated AI-powered Pull Request reviewer webhook server.

## Overview

When a PR is opened or updated on GitHub, GitGuard fetches the code diff, analyzes it for bugs and security issues, and posts a review comment directly on the PR.

## Architecture

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Port**: 5000 (0.0.0.0)
- **Entry point**: `src/webhook.js`

## Source Files

- `src/webhook.js` — Main Express server, GitHub webhook endpoint, signature verification
- `src/diffAnalyzer.js` — Fetches PR diffs using Octokit/GitHub API
- `src/aiReviewer.js` — Code review logic (currently mock rule-based; can be replaced with LLM)

## Endpoints

- `GET /` — Health check
- `POST /webhook` — GitHub webhook receiver (verifies HMAC-SHA256 signature)

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `PORT` — Server port (default: 5000)
- `GITHUB_WEBHOOK_SECRET` — Secret used to verify GitHub webhook signatures
- `GITHUB_TOKEN` — GitHub personal access token for API calls (fetching diffs, posting comments)

## Workflow

- **Start application**: `npm start` → runs `node src/webhook.js` on port 5000

## Deployment

- Target: autoscale
- Run command: `node src/webhook.js`
