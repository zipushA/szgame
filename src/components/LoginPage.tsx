
"use client"

import { useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface LoginPageProps {
  onLogin: (name: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (password.length !== 6) {
      alert("נא להכניס קוד בן 6 ספרות בדיוק.");
      return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userPassword", password);
    onLogin(name, password);
  };

  return (
    <div
      className="min-h-screen bg-charcoal relative overflow-hidden flex items-center justify-center p-4 sm:p-6"
      dir="rtl"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-5 sm:top-10 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-24 h-24 sm:w-40 sm:h-40 bg-teal/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-crimson/20 rounded-full blur-2xl animate-bounce" />

        {/* Animated stars */}
        <div className="absolute top-10 sm:top-20 left-1/3 text-gold text-2xl sm:text-4xl animate-spin-slow">✦</div>
        <div className="absolute bottom-16 sm:bottom-32 right-1/4 text-gold text-xl sm:text-3xl animate-pulse">✦</div>
        <div className="absolute top-1/3 right-10 sm:right-20 text-teal text-lg sm:text-2xl animate-bounce delay-500">
          ✦
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Logos */}
        <div className="flex justify-between items-start mb-8 sm:mb-12 animate-fade-in gap-4">
          {/* Left logo - Bridge icon */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-gold/30 shadow-2xl animate-float flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20">
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

          {/* Right logo - School logo image */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-crimson/30 shadow-2xl animate-float delay-300 flex-shrink-0 overflow-hidden">
            <img
              src="/images/logo.png"
              alt="לוגו בית הספר"
              className="w-full h-full object-contain p-2"
            />
          </div>

        </div>

        {/* Hero text with crazy animations */}
        <div className="text-center mb-10 sm:mb-16 relative px-2">
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-semibold mb-4 animate-title-wave tracking-wider">
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ג</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ש</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ר</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1 text-gold">✦</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ש</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ל</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1 text-gold">✦</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ה</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">צ</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ל</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ח</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ו</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ת</span>

            </h1>

            {/* קו אנימציה מתחת לכותרת */}
            <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer" />

          </div>
          <p className="text-base sm:text-xl md:text-2xl text-teal font-semibold mt-6 sm:mt-8 animate-fade-in-up">
            חוויה לימודית מעצימה
          </p>
        </div>

        {/* Login form */}
        <div className="max-w-md mx-auto space-y-4 sm:space-y-6 animate-fade-in-up delay-500">
          <div className="relative group">
            <Input
              type="text"
              placeholder="השם שלך"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-300 group-hover:border-teal/50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/20 to-teal/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          <div className="relative group">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="\d{6}"
              placeholder="הכנס  את הקוד שקיבלת - 6 ספרות"
              value={password}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // מסיר תווים שאינם מספרים
                setPassword(value);
              }}
              className="h-12 sm:h-14 text-base sm:text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all duration-300 group-hover:border-teal/50 text-center tracking-widest"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-crimson/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 sm:h-14 text-lg sm:text-xl font-bold bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white border-2 border-gold/50 shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 animate-pulse-slow active:scale-95"
          >
            לקניית פרסים🎁
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="hidden sm:block absolute -top-10 -right-10 w-20 h-20 border-4 border-gold/30 rounded-full animate-spin-slow" />
        <div className="hidden sm:block absolute -bottom-10 -left-10 w-16 h-16 border-4 border-teal/30 rounded-full animate-spin-reverse" />
      </div>
    </div>
  )
}
