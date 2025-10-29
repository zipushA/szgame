
"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
interface LoginPageProps {
  onLogin: (name: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

 const handleLogin = () => {
  // <CHANGE> שמירת השם ב-localStorage
  localStorage.setItem('userName', name);
  localStorage.setItem('userPassword', password);
  
  onLogin(name, password);
}
  return (
    <div className="min-h-screen bg-charcoal relative overflow-hidden flex items-center justify-center" dir="rtl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-crimson/20 rounded-full blur-2xl animate-bounce" />

        {/* Animated stars */}
        <div className="absolute top-20 left-1/3 text-gold text-4xl animate-spin-slow">✦</div>
        <div className="absolute bottom-32 right-1/4 text-gold text-3xl animate-pulse">✦</div>
        <div className="absolute top-1/3 right-20 text-teal text-2xl animate-bounce delay-500">✦</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Logos */}
        <div className="flex justify-between items-start mb-12 animate-fade-in">
          {/* Left logo - Bridge icon */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-gold/30 shadow-2xl animate-float">
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20">
              <path
                d="M10 70 Q 30 30, 50 50 T 90 70"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gold"
              />
              <circle cx="10" cy="70" r="4" fill="currentColor" className="text-teal" />
              <circle cx="50" cy="50" r="4" fill="currentColor" className="text-crimson" />
              <circle cx="90" cy="70" r="4" fill="currentColor" className="text-gold" />
              <line x1="10" y1="70" x2="10" y2="85" stroke="currentColor" strokeWidth="3" className="text-teal" />
              <line x1="50" y1="50" x2="50" y2="85" stroke="currentColor" strokeWidth="3" className="text-crimson" />
              <line x1="90" y1="70" x2="90" y2="85" stroke="currentColor" strokeWidth="3" className="text-gold" />
            </svg>
          </div>

          {/* Right logo - School logo placeholder */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-crimson/30 shadow-2xl animate-float delay-300">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">שער</div>
              <div className="text-xl md:text-2xl font-bold text-gold">ציון</div>
            </div>
          </div>
        </div>

        {/* Hero text with crazy animations */}
        <div className="text-center mb-16 relative">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 animate-title-wave">
              <span className="inline-block animate-bounce-letter delay-0">ג</span>
              <span className="inline-block animate-bounce-letter delay-100">ש</span>
              <span className="inline-block animate-bounce-letter delay-200">ר</span>
              <span className="inline-block animate-bounce-letter delay-300">י</span>
              <span className="inline-block animate-bounce-letter delay-400">ם</span>
              <span className="inline-block mx-4 animate-pulse text-gold">✦</span>
              <span className="inline-block animate-bounce-letter delay-500">ל</span>
              <span className="inline-block animate-bounce-letter delay-600">ה</span>
              <span className="inline-block animate-bounce-letter delay-700">צ</span>
              <span className="inline-block animate-bounce-letter delay-800">ל</span>
              <span className="inline-block animate-bounce-letter delay-900">ח</span>
              <span className="inline-block animate-bounce-letter delay-1000">ה</span>
            </h1>

            {/* Animated underline */}
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer" />
          </div>

          <p className="text-xl md:text-2xl text-teal font-semibold mt-8 animate-fade-in-up"> חוויה לימודית מעצימה </p>
        </div>

        {/* Login form */}
        <div className="max-w-md mx-auto space-y-6 animate-fade-in-up delay-500">
          <div className="relative group">
            <Input
              type="text"
              placeholder=" השם שלך-"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-300 group-hover:border-teal/50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/20 to-teal/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          <div className="relative group">
            <Input
              type="password"
              placeholder="הכנס את הקוד שקיבלת!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all duration-300 group-hover:border-teal/50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-crimson/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-14 text-xl font-bold bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white border-2 border-gold/50 shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 animate-pulse-slow"
          >
            לקניית פרסים🎁
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 border-4 border-gold/30 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-10 -left-10 w-16 h-16 border-4 border-teal/30 rounded-full animate-spin-reverse" />
      </div>
    </div>
  )
}
