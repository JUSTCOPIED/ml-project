# 🛡️ CyberGuard AI - Security Operations Dashboard

A modern, AI-powered cybersecurity dashboard built with Next.js 14, featuring real-time threat monitoring, interactive analytics, and an intelligent AI assistant powered by Groq.

![Next.js](https://img.shields.io/badge/Next.js-14.2.13-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-AI_Powered-FF6B6B?style=flat-square)

## ✨ Features

### 📊 Security Dashboard
- **Weekly Threat Overview** - Visual representation of daily threat counts with interactive line charts
- **Threat Type Distribution** - Pie chart breakdown of malware, phishing, and other attack types
- **Real-time Metrics** - Track total threats, peak days, and security trends

### 📋 Threat Log
- Comprehensive table of security events
- Sortable by time, source IP, attack type, and severity
- Color-coded severity levels (High/Medium/Low)
- AI-generated scan results and descriptions

### 🤖 AI Insights Assistant
- **Powered by Groq** - Ultra-fast inference with the `openai/gpt-oss-120b` model
- **RAG-like Context** - AI has full access to dashboard data for accurate, data-driven responses
- **Cybersecurity Expert** - Trained to analyze threats, provide recommendations, and assist with incident response
- **Real-time Interaction** - Smooth chat interface with loading states and auto-scroll

### 🔔 Notifications
- Security alerts and system notifications
- Timestamped event log
- Quick access to recent security events

### 🎨 UI/UX
- **Glassmorphism Design** - Modern, frosted glass aesthetic
- **Dark/Light Mode** - Toggle between themes
- **Responsive Layout** - Works on desktop and tablet
- **Smooth Animations** - Framer Motion powered transitions
- **Shooting Star Background** - Subtle animated background effect

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API Key ([Get one here](https://console.groq.com/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ml-project.git
   cd ml-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=openai/gpt-oss-120b
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ml-project/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Groq API integration
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard component
├── lib/
│   └── prompts.ts            # AI system prompt & dashboard data
├── public/                   # Static assets
├── .env.example              # Environment template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🤖 AI Assistant Capabilities

The AI assistant is designed as a cybersecurity expert with access to your dashboard data:

### What it knows:
- 📈 Weekly threat statistics (35 threats this week)
- 🎯 Threat distribution (Malware 60%, Phishing 25%, Other 15%)
- 📝 Recent threat logs with IPs, timestamps, and severity
- 🔔 Security notifications and alerts
- 🖥️ Current system status

### Example queries:
- *"What are the top threats this week?"*
- *"Show me high severity attacks"*
- *"What happened on Saturday?"*
- *"Tell me about the SQL injection attempt"*
- *"What's our current security posture?"*
- *"Recommend actions for the DDoS attack"*

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Recharts** | Data visualization |
| **Lucide React** | Icons |
| **Groq SDK** | AI inference |

## 🔐 Security Note

This project uses **Next.js 14.2.13** (stable), which is **NOT affected** by the React Server Components vulnerability (CVE-2025-66478). The vulnerability only affects:
- Next.js 15.x, 16.x
- Next.js 14.3.0-canary.77 and later canary releases

Your installation is secure. ✅

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎯 Roadmap

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Custom threat alerts
- [ ] Email/Slack notifications
- [ ] Historical data analysis
- [ ] Export reports to PDF
- [ ] Multi-tenant support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ using Next.js and Groq AI
</p>
