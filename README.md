# School-in-a-Box 📚
### Empowering Education Through Technology — Offline-First Learning Platform

## 🎯 The Problem

Most ed-tech solutions assume every student has a smartphone and reliable internet. In reality, many schools — especially in rural Nepal — face unstable or non-existent internet connectivity. Existing digital learning tools simply don't work in these environments, leaving students without access to quality educational content.

## 💡 Our Solution

**School-in-a-Box** turns any laptop (or a low-cost Raspberry Pi) into a fully self-contained local learning server. It broadcasts its own WiFi hotspot — no internet required — and any student's phone can connect to it and access lessons, video content, and quizzes, just like visiting a website.

One device. Zero internet. An entire school's digital library, accessible to every student in the room, simultaneously.

## ✨ Key Features

- 📖 **Subject & Lesson Library** — organized content by subject and grade level
- 📝 **Interactive Quizzes** — students test their understanding after each lesson
- 📊 **Progress Tracking** — student scores and completion stored locally
- 🔄 **Sync-When-Online** — when internet becomes available (even briefly), progress data syncs to a central server for teachers/admins to review
- 📡 **Multi-Device Access** — many students connect to one local server at the same time over WiFi
- 💸 **Completely Free to Run** — no cloud hosting, no API costs, no subscriptions

## 🧱 Why This Is Different

Unlike most education apps built for this theme, School-in-a-Box doesn't depend on:
- ❌ AI/LLM APIs (no rate limits, no API keys, no per-request cost)
- ❌ Cloud hosting or servers
- ❌ A stable internet connection
- ❌ Expensive hardware — a $50 Raspberry Pi or any old laptop is enough

This makes it genuinely deployable in low-budget, low-connectivity schools — not just a hackathon demo.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core Web API |
| Database | SQLite (lightweight, file-based, zero setup) |
| Frontend | React |
| Networking | Local WiFi hotspot (no internet dependency) |
| Real-time (optional) | SignalR for live sync status |

## 📐 Database Schema

- **Subject** — subject name, grade level
- **Lesson** — title, content, optional video, ordered under a subject
- **Quiz** — linked to a lesson
- **Question** — multiple choice questions with correct answer
- **StudentProgress** — student name, quiz score, completion time, sync status

## 🔌 API Endpoints

```
GET  /api/subjects
GET  /api/subjects/{id}/lessons
GET  /api/lessons/{id}
GET  /api/lessons/{id}/quiz
POST /api/quiz/{id}/submit
GET  /api/progress?studentName=x
POST /api/sync
```

## 🚀 How It Works

1. Run the ASP.NET Core server on a laptop, listening on `0.0.0.0` (all network interfaces)
2. Turn the laptop into a WiFi hotspot (built into Windows/Mac/Linux — no extra hardware needed)
3. Find the laptop's local IP address (e.g. `192.168.x.x`)
4. Any student's phone connects to that WiFi network and visits `http://192.168.x.x:5000`
5. Students browse lessons, watch videos, and take quizzes — entirely offline
6. When internet becomes available, progress data syncs to a central server for teacher visibility

## 💰 Cost to Build & Run

| Item | Cost |
|---|---|
| Laptop as server | Free (already owned) |
| ASP.NET Core, SQLite, React | Free, open-source |
| WiFi Hotspot | Free (built into OS) |
| Raspberry Pi (optional, for permanent deployment) | ~$35–50 one-time |
| Ongoing costs | **$0** — no cloud, no API, no subscriptions |

## 👥 Team

- **[Name]** — Backend API & Database
- **[Name]** — Frontend & UI
- **[Name]** — Sync feature & Demo setup

## 🎬 Demo Highlight

During our live demo, we disable internet/mobile data entirely and connect multiple phones to our laptop's local hotspot — proving the platform works completely offline, with real concurrent multi-device access.

## 🌱 Future Scope

- Content upload portal for teachers to add new lessons when online
- Multi-language support for regional languages
- Analytics dashboard for school administrators
- Expand to Raspberry Pi deployment for permanent, low-cost classroom servers

---

*Built for [Hackathon Name] — Empowering Education Through Technology*
# gmc_dotcode
