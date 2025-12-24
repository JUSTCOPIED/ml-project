"use client"

import { useState, useEffect, useRef } from 'react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Menu, X, Home, Star, DollarSign, User, HelpCircle, Mail, LogOut, Moon, Sun, LayoutDashboard, Shield, BarChart2, Bell, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'



const threatData = [
  { name: 'Mon', threats: 4 },
  { name: 'Tue', threats: 3 },
  { name: 'Wed', threats: 2 },
  { name: 'Thu', threats: 6 },
  { name: 'Fri', threats: 8 },
  { name: 'Sat', threats: 9 },
  { name: 'Sun', threats: 3 },
]

const typeData = [
  { name: 'Malware', value: 60, threats: 150 },
  { name: 'Phishing', value: 25, threats: 62 },
  { name: 'Other', value: 15, threats: 38 },
]

const threatLogData = [
  { time: '2023-06-01 11:45:22', source: '10.0.0.50', type: 'Brute Force', severity: 'medium', result: 'Multiple failed login attempts' },
  { time: '2023-06-01 12:30:15', source: '192.168.1.100', type: 'SQL Injection', severity: 'high', result: 'Attempted database breach' },
  { time: '2023-06-01 14:22:07', source: '172.16.0.25', type: 'DDoS', severity: 'high', result: 'Unusual traffic spike detected' },
  { time: '2023-06-01 16:10:33', source: '10.0.0.75', type: 'Phishing', severity: 'low', result: 'Suspicious email link clicked' },
  { time: '2023-06-01 18:05:50', source: '192.168.1.50', type: 'Malware', severity: 'medium', result: 'Potential malware download blocked' },
]

const notificationData = [
  { time: '2023-06-01 11:45:22', message: 'Suspicious login attempt detected from IP 10.0.0.50' },
  { time: '2023-06-01 14:30:00', message: 'Password changed successfully' },
  { time: '2023-06-01 16:15:10', message: 'New device added to your account' },
  { time: '2023-06-01 18:20:45', message: 'Unusual activity detected: Multiple failed login attempts' },
  { time: '2023-06-01 20:05:30', message: 'Security scan completed: No threats found' },
]

const ShootingStarBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
  </div>
)
interface PayloadItem {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
    threats: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  darkMode: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className={`custom-tooltip ${darkMode ? 'dark' : ''}`}>
        <p className="label">{`${data.name} ${data.value}%`}</p>
        <p className="intro">{`No. of ${data.name} Threats: ${data.threats}`}</p>
      </div>
    )
  }
  return null
}

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Threat Log', icon: Shield },
    { name: 'AI Insights Assistant', icon: BarChart2 },
    { name: 'Notifications', icon: Bell },
  ]

  return (
    <nav className="bg-transparent backdrop-blur-sm rounded-lg p-2 mb-6 border border-white/10 dark:border-black/10">
      <ul className="flex justify-between items-center">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1">
            <button
              onClick={() => setActivePage(item.name)}
              className={`w-full flex items-center justify-center p-2 rounded-md transition-all duration-300 ${activePage === item.name
                ? 'bg-white/20 dark:bg-black/20 text-black dark:text-white scale-105'
                : 'text-black/60 dark:text-white/60 hover:bg-white/10 dark:hover:bg-black/10 hover:text-black dark:hover:text-white'
                }`}
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 dark:border-black/10 transition-all duration-300 hover:glow ${className}`}>
    {children}
  </div>
)

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIInsightsAssistantProps {
  darkMode: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AIInsightsAssistant: React.FC<AIInsightsAssistantProps> = ({ darkMode: _darkMode }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI Cybersecurity Insights Assistant powered by Groq. I can help you analyze threats, understand attack patterns, predict security risks, and provide actionable recommendations. How can I assist you today?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return

    const userMessage = input.trim()
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Call the Groq API through our backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.slice(1) // Exclude the initial greeting
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${errorMessage}. Please check your API configuration and try again.`
      }])
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-[calc(100vh-280px)] flex flex-col">
      <GlassCard className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-[85%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}>
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className="whitespace-pre-wrap break-words">{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 text-left">
              <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex-shrink-0 flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLoading ? "Please wait..." : "Ask me about your security data..."}
            disabled={isLoading}
            className="flex-1 p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
interface PageContentProps {
  activePage: string;
  darkMode: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ activePage, darkMode }) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {activePage === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Weekly Overview</h2>
              <p className="text-3xl font-bold text-black dark:text-white">35</p>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">Total threats detected this week</p>
              <div className="mt-4">
                <a href="#" className="text-sm font-medium text-black dark:text-white hover:underline">
                  View all threats
                </a>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Threat Type Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={darkMode ? ['#FFFFFF', '#CCCCCC', '#999999'][index] : ['#333333', '#666666', '#999999'][index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="md:col-span-2">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Daily Threat Log</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={threatData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#FFFFFF40' : '#00000040'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#FFFFFF' : '#000000'} />
                    <YAxis stroke={darkMode ? '#FFFFFF' : '#000000'} />
                    <Tooltip
                      contentStyle={{ backgroundColor: darkMode ? '#000000' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#000000', border: 'none', borderRadius: '4px' }}
                      itemStyle={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    />
                    <Line type="monotone" dataKey="threats" stroke={darkMode ? '#FFFFFF' : '#000000'} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        )}
        {activePage === 'Threat Log' && (
          <GlassCard>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Threat Log</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black/10 dark:divide-white/10">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black/70 dark:text-white/70 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black/70 dark:text-white/70 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black/70 dark:text-white/70 uppercase tracking-wider">Type of Attack</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black/70 dark:text-white/70 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black/70 dark:text-white/70 uppercase tracking-wider">AI Scan Results</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 dark:divide-white/10">
                  {threatLogData.map((threat, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">{threat.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">{threat.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">{threat.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${threat.severity === 'low' ? 'bg-green-500 text-white' :
                          threat.severity === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-red-500 text-white'
                          }`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white">{threat.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
        {activePage === 'AI Insights Assistant' && (
          <AIInsightsAssistant darkMode={darkMode} />
        )}
        {activePage === 'Notifications' && (
          <GlassCard>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Notifications</h2>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {notificationData.map((notification, index) => (
                <li key={index} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-black dark:text-white">{notification.message}</h3>
                        <p className="text-sm text-black/50 dark:text-white/50">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [activePage, setActivePage] = useState('Overview')

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <ShootingStarBackground />
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg lg:relative lg:translate-x-0 flex flex-col"
          >
            <div className="flex flex-col items-center justify-center p-6 border-b border-black/10 dark:border-white/10">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="User"
                className="h-16 w-16 rounded-full border-2 border-black/10 dark:border-white/10 mb-2"
              />
              <h2 className="text-xl font-bold text-black dark:text-white">John Doe</h2>
            </div>
            <nav className="flex-grow mt-6 px-4">
              {[
                { icon: Home, name: 'Home' },
                { icon: Star, name: 'Features' },
                { icon: DollarSign, name: 'Pricing' },
                { icon: User, name: 'User Info' },
                { icon: HelpCircle, name: 'FAQs' },
                { icon: Mail, name: 'Contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center px-4 py-3 text-black dark:text-white hover:bg-white/10 dark:hover:bg-black/10 rounded-lg transition-all duration-200 ease-in-out mb-2 group"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-glow-hover">{item.name}</span>
                </a>
              ))}
            </nav>
            <div className="p-4 border-t border-black/10 dark:border-white/10">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 ease-in-out group"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="text-glow-hover">Log Out</span>
              </a>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden absolute top-4 right-4 text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-black">
        {/* Top Bar */}
        <header className="bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 transition-colors duration-200"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-black dark:text-white hover:bg-white/10 dark:hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-200 ease-in-out group"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <h1 className="text-3xl font-semibold text-black dark:text-white mb-6">{activePage}</h1>
            <PageContent activePage={activePage} darkMode={darkMode} />
          </div>
        </main>
      </div>
    </div>
  )
}
