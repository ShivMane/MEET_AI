# 🚀 MeetAI

### AI-Powered Meeting Automation Platform

Next.js 15 · tRPC · Drizzle ORM · Stream Video API · AI Agents (OpenAI/Gemini)

[![Stars](https://img.shields.io/github/stars/yourname/meetai?style=social)](https://github.com/yourname/meetai/stargazers)
[![Forks](https://img.shields.io/github/forks/yourname/meetai?style=social)](https://github.com/yourname/meetai/network/members)
[![Issues](https://img.shields.io/github/issues/yourname/meetai)](https://github.com/yourname/meetai/issues)
[![License](https://img.shields.io/github/license/yourname/meetai)](LICENSE)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

**MeetAI** is a full-stack AI meeting assistant platform that allows users to create intelligent agents, schedule and host meetings, join video calls, and let AI agents participate in real-time. All agents follow custom instructions and assist during the call using OpenAI (or Gemini) Realtime API.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ How It Works](#️-how-it-works)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗄️ Database Schema](#️-database-schema)
- [📡 API Endpoints](#-api-endpoints)
- [🔧 Setup & Installation](#-setup--installation)
- [🧪 Using Ngrok for Webhooks](#-using-ngrok-for-webhooks)
- [🛣️ Roadmap](#️-roadmap)
- [💵 How to Contribute](#-how-to-contribute)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🥑 License](#-license)
- [⭐ Star the Repo](#-star-the-repo)

---

## ✨ Features

### 👤 AI Agents
- Create, edit, delete AI agents
- Each agent has: name, instructions, & meeting count
- Filter agents, search, and pagination
- Avatar auto-generated per agent

### 🎥 Meetings
- Create, edit, remove meetings
- Choose which agent attends the meeting
- Realtime meeting status tracking (upcoming, active, completed, processing, cancelled)
- Fully functional video call UI using Stream Video SDK
- AI agent participates in the call through OpenAI Realtime API

### 🔗 AI Interactions
- Backend listens to Stream Webhooks (`call.session_started`, `call.session_participant_left`)
- When a meeting starts → Automatically connect an AI agent
- The agent responds verbally in the call room
- Uses OpenAI Realtime API (Gemini integration optional)

### 🔐 Authentication
- Uses BetterAuth
- Every Agent/Meeting is scoped to the authenticated user

### 💾 Database
- Drizzle ORM + Neon/Postgres
- Strongly typed schemas
- Includes agents, meetings, and relations

### ⚙️ tRPC Backend
- Automatic frontend types
- Endpoints for: agents.create / remove / update / getOne / getMany
- Endpoints for: meetings.create / update / getOne / getMany / generateToken

### 🖥 UI Components
- Fully client-safe
- Uses ShadCN UI, TailwindCSS, TanStack React Query
- Suspense-ready layouts + HydrationBoundary
- Server Prefetching

---

## 🏗️ How It Works

### 1. Create an AI Agent
You define:
- name
- instructions (behaviour, tone, expertise)

### 2. Create a Meeting
User selects the AI agent → assigns it to a meeting.

### 3. Join the Call
MeetAI uses Stream Video SDK:
- Your camera + mic preview (CallLobby)
- When joining → a Stream Video Call is created
- You see participants + controls

### 4. Stream Sends Webhook → Backend Detects Meeting Start
`call.session_started` webhook triggers:
- Lookup meeting
- Lookup agent
- Connect OpenAI Realtime Agent
- Inject agent instructions into the session

### 5. AI Agent Talks in the Meeting
Stream connects LLM output → renders speech → sends into the call as audio.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 App Router
- React 19
- TypeScript
- TanStack React Query
- tRPC Client
- TailwindCSS + ShadCN UI
- Stream Video React SDK

### Backend
- Next.js Route Handlers
- tRPC + Drizzle ORM
- Neon PostgreSQL
- Stream Video Node SDK
- OpenAI Realtime API (primary)
- Gemini Realtime API (not fully supported by Stream yet)

### DevOps
- Ngrok for local webhook testing
- Environment-based configuration
- Server Actions + RSC caching

---

## 🗄️ Database Schema (Drizzle ORM)

### Agents Table

| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier |
| name | string | Agent name |
| instructions | text | AI behavior instructions |
| userId | string | Owner user ID |
| createdAt | timestamp | Creation date |
| updatedAt | timestamp | Last update date |

### Meetings Table

| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier |
| name | string | Meeting name |
| agentId | FK → agents.id | Assigned agent |
| userId | string | Owner user ID |
| status | enum | upcoming, active, completed, processing, cancelled |
| startedAt | timestamp | Meeting start time |
| endedAt | timestamp | Meeting end time |
| createdAt | timestamp | Creation date |

---

## 📡 API Endpoints (via tRPC)

### Agents
- `agents.create` - Create new AI agent
- `agents.update` - Update agent details
- `agents.remove` - Delete agent
- `agents.getOne` - Fetch single agent
- `agents.getMany` - List agents with pagination

### Meetings
- `meetings.create` - Create new meeting
- `meetings.update` - Update meeting
- `meetings.getOne` - Fetch single meeting
- `meetings.getMany` - List meetings
- `meetings.generateToken` - Generate Stream token

---

## 🔧 Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourname/meetai.git](https://github.com/ShivMane/MEET_AI
cd meetai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create `.env`:
```env
DATABASE_URL=
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=
STREAM_VIDEO_SECRET_KEY=
OPENAI_API_KEY=
BETTER_AUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run migrations
```bash
npm run db:push
```

### 5. Start dev server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app! 🎉

---

## 🧪 Using Ngrok for Webhooks

### Why Ngrok?
Stream needs to send webhooks to your backend. In development, your localhost isn't accessible from the internet. Ngrok creates a public URL that tunnels to your local server.

### Steps:

#### 1. Install Ngrok
```bash
npm install -g ngrok
# or
brew install ngrok
```

#### 2. Start your Next.js server
```bash
npm run dev
```

#### 3. Run Ngrok
```bash
ngrok http 3000
```

You'll get a public URL like: `https://abc123.ngrok.io`

#### 4. Configure Stream Dashboard
Go to your Stream Dashboard → Webhooks → Add your ngrok URL:
```
https://abc123.ngrok.io/api/webhooks/stream
```

> **⚠️ Note:** Every time you restart Ngrok, the URL changes. Update your Stream webhook URL accordingly.

---

## 🛣️ Roadmap

### 🔜 Coming Soon
- ✅ Chat + message history inside calls
- ✅ Meeting transcripts + summaries
- ✅ Agent knowledge base uploads
- ✅ Multi-agent debates
- ✅ Calendar integrations
- ✅ Custom AI voice selection

---

## 💵 How to Contribute

We welcome contributions! Here's how you can help:

### 1. Fork the repository
Click the "Fork" button at the top right of the repository page.

### 2. Clone your fork
```bash
git clone https://github.com/YOUR-USERNAME/meetai.git
cd meetai
```

### 3. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make your changes
Implement your feature or fix bugs. Make sure to test your changes!

### 5. Commit and push
```bash
git add .
git commit -m "Add: your descriptive commit message"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request
Go to the original repository and click "New Pull Request". Describe your changes and submit!

### Contribution Guidelines
- ✅ Write clear, descriptive commit messages
- ✅ Follow the existing code style
- ✅ Test your changes thoroughly
- ✅ Update documentation if needed
- ✅ Be respectful and constructive in discussions

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Webhook not triggering
- Check if Ngrok is running
- Verify webhook URL in Stream Dashboard
- Check server logs for incoming requests

#### 2. Database connection errors
- Verify `DATABASE_URL` in .env
- Run `npm run db:push` to sync schema
- Check Neon dashboard for database status

#### 3. OpenAI API errors
- Confirm `OPENAI_API_KEY` is valid
- Check API usage limits
- Verify Realtime API access in your OpenAI account

#### 4. Stream Video connection issues
- Verify Stream API keys are correct
- Check browser permissions for camera/mic
- Test with different browsers

---

## 🥑 License

MeetAI is free and open-source software licensed under the **GNU General Public License v3.0**.

This means you can:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

Under the conditions:
- 📄 License and copyright notice
- 📄 State changes
- 📄 Disclose source
- 📄 Same license

---

## ⭐ Star the Repo!

If you find this project useful, please consider giving it a ⭐ star on GitHub!  
Your support helps us grow and improve. Thank you! 🙌

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=yourname/meetai&type=Date)](https://star-history.com/#yourname/meetai&Date)

</div>

---

## 🌐 Connect with Me

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shivprasadmane190@email.com)
[![X (formerly Twitter)](https://img.shields.io/badge/X-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Shiv_mane14)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shivprasad-mane/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourname)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@yourchannel)

---

<div align="center">

**Keep learning and exploring! 🚀**  
**Happy coding! 👩‍💻🎉**

Made with ❤️ by the MeetAI Team

</div>
