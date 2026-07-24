# Hamro Student Hub 🎓
### Empowering Education Through Technology — One Platform for Doubts, Projects & Community

## 🎯 The Problem

Students today juggle three separate needs that no single platform addresses together: getting academic doubts solved, finding teammates for projects and hackathons, and simply connecting with peers socially. Existing tools force students to scatter across WhatsApp groups, Discord servers, and disconnected forums — with no unified space built specifically for student life.

## 💡 Our Solution

**Hamro Student Hub** is a single platform where students connect with each other across three core needs: solving academic doubts, finding project teammates, and socializing over shared interests like gaming. It's peer-powered — no AI, no algorithms guessing what you need — just students helping students, matched by subject, skill, semester, and interest.

## ✨ Core Modules

### 1. 📚 Solve & Ask (Course & Notes)
- Post academic doubts, sorted by **University → College → Semester**
- Other students browse and answer based on their strengths
- Mark a **"Best Answer"** to reward the most helpful response
- Helpful seniors earn recognition badges (e.g., *Dai/Didi of the Month*) — a lightweight reputation system that encourages participation

### 2. 🛠️ Squad Finder (Projects & Tech)
- Post a project or hackathon idea and the skills you need (React, Figma, Python, Pitching, etc.)
- Filter and browse other students by the skills they bring
- Built for forming teams across semesters — seniors and juniors can find each other for hackathons, final-year projects, or startup ideas

### 3. 🎮 Gaming Lounge (Lobbies & Matches)
- Quickly create a room with a Discord link and game ID
- Live **"Looking for Player (LFP)"** status so others know you're free to join
- A casual, no-pressure space that keeps the platform feeling like a real student community, not just another study app

## 🧱 Why This Is Different

Most student platforms are single-purpose — a doubt-solving app, or a team-finder, or a gaming Discord — never all three together. Hamro Student Hub is built on a simple insight: **student life isn't just academic**, and a platform that only serves study needs misses how students actually spend their time. By combining all three, the platform becomes something students return to daily, not just when they're stuck on homework.

- ❌ No AI dependency — no API costs, no rate limits, no unpredictable demo failures
- ✅ Peer-powered matching — real students, real expertise, real availability
- ✅ Built-in reputation system to encourage senior participation
- ✅ One login, three genuine reasons to open the app

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core Web API |
| Database | PostgreSQL + EF Core |
| Frontend | React |
| Real-time | SignalR (live chat, LFP status, notifications) |

## 📐 Core Database Schema

- **Student** — name, university, college, semester, skills/interests, reputation points
- **Post** — type (Doubt / Squad / Gaming), title, description, tags, university/semester scope, status
- **Answer** — linked to a Doubt post, marked Best Answer or not
- **Badge** — awarded to students based on accumulated Best Answers
- **SquadRequest** — skills needed, project description, applicants
- **GameLobby** — game name, Discord link, LFP status, host

## 🔌 Key API Endpoints

```
POST /api/posts                    → create Doubt / Squad / Gaming post
GET  /api/posts?type=Doubt&sem=6   → browse filtered posts
POST /api/posts/{id}/answer        → submit an answer to a doubt
POST /api/answers/{id}/mark-best   → mark best answer, awards badge points
POST /api/squad/{id}/apply         → apply to join a squad request
POST /api/lobby                    → create a gaming lobby
GET  /api/lobby?status=open        → browse open "Looking for Player" lobbies
GET  /api/students/{id}/badges     → view a student's earned recognition
```

## 🎬 Demo Highlight

Live walkthrough of all three modules: post a doubt and get it answered in real time, browse a Squad Finder listing filtered by skill, and open a live gaming lobby — showing the platform serving three real, different student needs in one seamless experience.

## 👥 Team

- **[Name]** — Backend API & Database
- **[Name]** — Frontend & UI
- **[Name]** — Real-time features (chat, LFP status) & Demo prep

## 🌱 Future Scope

- Verified senior/mentor badges tied to actual academic performance
- Cross-college squad finding for inter-university hackathons
- Notification system for new answers, squad matches, and lobby invites
- Leaderboard for most helpful students each semester

---

*Built for [Hackathon Name] — Empowering Education Through Technology*