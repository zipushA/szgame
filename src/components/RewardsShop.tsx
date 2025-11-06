
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Gift {
  id: number
  name: string
  image: string
  description: string
}

interface CartItem extends Gift {
  quantity: number
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmfo6-jUVFdI-VhYoV5J8QyNl7bRpIAxSGYyf8ONa4bB55qD9kOmkUmrh7i_cTVCSn/exec"

export default function RewardsShop() {
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("userName") || "אורח"
  })

  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [pendingGift, setPendingGift] = useState<Gift | null>(null)
  const [fullName, setFullName] = useState("")
  const [className, setClassName] = useState("")
  const [completedOrder, setCompletedOrder] = useState<any>(null)
  const [isAlreadyChosenOpen, setIsAlreadyChosenOpen] = useState(false);
  const [alreadyChosenMessage, setAlreadyChosenMessage] = useState("");

  const gifts: Gift[] = [
    {
      id: 1,
      name: "צעיף",
      image: "🧣",
      description: "צעיף חמים ומעוצב לימים קרים",
    },
    {
      id: 2,
      name: "כפפות",
      image: "🧤",
      description: "כפפות רכות ונעימות לחורף נעים",
    },
    {
      id: 3,
      name: "מטריה",
      image: "☂️",
      description: "מטריה צבעונית ליום גשום במיוחד",
    },
    {
      id: 4,
      name: "משחק קלפים",
      image: "🃏",
      description: "משחק קלפים מהנה עם חברים",
    },
    {
      id: 5,
      name: "ספר",
      image: "📖",
      description: "ספר מרתק להעביר איתו את הזמן בכיף",
    },
    {
      id: 6,
      name: "מארז מתוק",
      image: "🍬",
      description: "מארז ממתקים צבעוני ומתוק במיוחד",
    },
    {
      id: 7,
      name: "פטור משיעורי בית",
      image: "📝",
      description: "שובר לפטור חד-פעמי משיעורי בית",
    },
    {
      id: 8,
      name: "ארוחת בוקר מפנקת",
      image: "🥐",
      description: "ארוחת בוקר טעימה ומיוחדת להתחיל איתה את היום",
    },
  ];

  const addToCart = (gift: Gift) => {
    if (cart.length > 0) {
      setPendingGift(gift)
      setIsWarningOpen(true)
      return
    }
    setCart([{ ...gift, quantity: 1 }])
  }

  const replaceGift = () => {
    if (pendingGift) {
      setCart([{ ...pendingGift, quantity: 1 }])
      setPendingGift(null)
      setIsWarningOpen(false)
    }
  }

  const keepCurrentGift = () => {
    setPendingGift(null)
    setIsWarningOpen(false)
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (totalItems !== 1) {
      alert("כל משתמש זכאי לקנות מתנה אחת בלבד!")
      return
    }
    setIsCheckoutOpen(true)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !className) {
      alert("נא למלא את כל השדות")
      return
    }

    if (cart.length === 0) {
      alert("עגלה ריקה")
      return
    }

    const order = {
      "שם מלא": fullName,
      "כיתה": className,
      "מתנה": cart[0].name,
      "תאריך": new Date().toLocaleString("he-IL"),
    }


    setIsLoadingSubmit(true)

    try {
      console.log("[v0] שולח הזמנה:", order)

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
        mode: "no-cors", // נדרש בגלל CORS של Google
      })
      console.log("[v0] ההזמנה נשלחה בהצלחה")

      setCompletedOrder(order)
      setIsCheckoutOpen(false)
      setIsSuccessOpen(true)

      setTimeout(() => {
        setFullName("")
        setClassName("")
        setCart([])
      }, 500)
    } catch (err) {
      console.error("[v0] שגיאה בשליחת ההזמנה:", err)
      alert("שגיאה בשליחת ההזמנה. אנא בדוק את החיבור לאינטרנט ונסה שוב.")
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const closeSuccessModal = () => {
    setIsSuccessOpen(false)
    setCompletedOrder(null)
  }

  return (
    <div className="min-h-screen bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-20 sm:w-32 h-20 sm:h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 sm:w-40 h-24 sm:h-40 bg-teal/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-crimson/20 rounded-full blur-2xl animate-bounce" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        {/* Main content - Gift cards */}
        <div className="flex-1">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-semibold mb-4 animate-title-wave tracking-wider font-heebo">
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ח</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">נ</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ו</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ת</span>
              <span className="inline-block mx-2 sm:mx-3 animate-pulse text-gold">✦</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ה</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">צ</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ו</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">פ</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ר</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">י</span>
              <span className="inline-block text-2xl sm:text-4xl md:text-5xl text-white animate-fade-in-up mx-1">ם</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gold font-bold mb-2">של {userName}</p>
            <div className="h-1 sm:h-2 w-48 sm:w-64 mx-auto bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer" />
            <p className="text-base sm:text-xl text-teal font-semibold mt-4 sm:mt-6 font-heebo">בחרו את המתנות שלכם</p>
          </div>

          {/* Gift cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {gifts.map((gift, index) => (
              <div
                key={gift.id}
                className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-white/20 hover:border-gold/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl sm:text-7xl md:text-8xl text-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {gift.image}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2 font-rubik">{gift.name}</h3>
                <p className="text-teal/80 text-center mb-3 sm:mb-4 text-sm font-heebo">{gift.description}</p>

                <Button
                  onClick={() => addToCart(gift)}
                  className="w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-charcoal font-bold border-2 border-teal/50 shadow-lg hover:shadow-teal/50 transition-all duration-300 text-sm sm:text-base"
                >
                  הוסף לעגלה
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping cart - Desktop sidebar */}
        <div className="hidden lg:block w-96 bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-gold/30 h-fit sticky top-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🛒</span>
            <h2 className="text-3xl font-black text-white font-rubik">העגלה שלי</h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg font-heebo">העגלה ריקה</p>
              <p className="text-teal/60 text-sm mt-2 font-heebo">הוסיפו מתנות לעגלה</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-charcoal/50 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.image}</span>
                        <div>
                          <h4 className="text-white font-bold font-rubik">{item.name}</h4>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-crimson hover:text-crimson/80 text-xl"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full h-12 bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white font-bold text-lg border-2 border-gold/50 shadow-xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 animate-pulse-slow"
              >
                השלם רכישה
              </Button>
            </>
          )}
        </div>

        {/* Mobile cart button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-crimson to-crimson/90 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl border-2 border-gold/50 z-50 animate-pulse-slow"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-8 h-8 bg-gold text-charcoal rounded-full flex items-center justify-center text-sm font-bold">
              {totalItems}
            </span>
          )}
        </button>

        {/* Mobile cart modal */}
        {isCartOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full bg-charcoal rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🛒</span>
                  <h2 className="text-2xl font-black text-white font-rubik">העגלה שלי</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-white text-3xl">
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg font-heebo">העגלה ריקה</p>
                  <p className="text-teal/60 text-sm mt-2 font-heebo">הוסיפו מתנות לעגלה</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white/10 rounded-xl p-4 border border-white/10">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.image}</span>
                            <div>
                              <h4 className="text-white font-bold font-rubik">{item.name}</h4>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-crimson hover:text-crimson/80 text-xl"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full h-14 bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white font-bold text-lg border-2 border-gold/50 shadow-xl hover:shadow-gold/50 transition-all duration-300"
                  >
                    השלם רכישה
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Warning Modal - Gift Limit */}
        {isWarningOpen && pendingGift && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <div className="bg-charcoal border-2 border-crimson/50 rounded-3xl p-6 sm:p-8 max-w-md w-full animate-fade-in-up shadow-2xl shadow-crimson/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-bounce">⚠️</div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 font-rubik">רגע!</h2>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer mb-4" />
                <p className="text-white/90 text-lg font-heebo leading-relaxed">
                  כל תלמיד זכאי לבחור <span className="text-gold font-bold">מתנה אחת בלבד</span>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                <p className="text-white/80 text-sm mb-3 font-heebo">המתנה הנוכחית שלך:</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{cart[0]?.image}</span>
                  <div>
                    <p className="text-white font-bold text-lg font-rubik">{cart[0]?.name}</p>
                  </div>
                </div>

                <p className="text-white/80 text-sm mb-3 font-heebo">המתנה החדשה:</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{pendingGift.image}</span>
                  <div>
                    <p className="text-white font-bold text-lg font-rubik">{pendingGift.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={replaceGift}
                  className="w-full h-12 bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal text-white font-bold border-2 border-gold/50 shadow-lg hover:shadow-gold/30 transition-all duration-300"
                >
                  החלף למתנה החדשה
                </Button>
                <Button
                  onClick={keepCurrentGift}
                  className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 font-bold transition-all duration-300"
                >
                  שמור את המתנה הנוכחית
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <div className="bg-charcoal border-2 border-gold/50 rounded-3xl p-6 sm:p-8 max-w-md w-full animate-fade-in-up shadow-2xl shadow-gold/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎁</div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 font-rubik">השלמת רכישה</h2>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer" />
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="relative group">
                  <label className="block text-white font-bold mb-2 font-heebo">שם מלא</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                    placeholder="הכניסו את שמכם המלא"
                    className="h-12 text-base bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                    required
                    disabled={isLoadingSubmit}
                  />
                </div>

                <div className="relative group">
                  <label className="block text-white font-bold mb-2 font-heebo">כיתה</label>
                  <Input
                    type="text"
                    value={className}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClassName(e.target.value)}
                    placeholder="לדוגמה: י'1"
                    className="h-12 text-base bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:border-teal focus:ring-2 focus:ring-teal/50 transition-all duration-300"
                    required
                    disabled={isLoadingSubmit}
                  />
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-gold/30">
                  <p className="text-white/80 text-sm mb-2 font-heebo">המתנה שבחרת:</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{cart[0]?.image}</span>
                    <div>
                      <p className="text-white font-bold text-lg font-rubik">{cart[0]?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 h-12 bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 font-bold transition-all duration-300"
                    disabled={isLoadingSubmit}
                  >
                    ביטול
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white font-bold border-2 border-gold/50 shadow-xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105"
                    disabled={isLoadingSubmit}
                  >
                    {isLoadingSubmit ? "שולח..." : "אישור הזמנה"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isSuccessOpen && completedOrder && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
            <div className="bg-charcoal border-2 border-gold/50 rounded-3xl p-6 sm:p-8 max-w-md w-full animate-fade-in-up shadow-2xl shadow-gold/30">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 font-rubik">מזל טוב!</h2>
                <div className="h-2 w-40 mx-auto bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer mb-4" />
                <p className="text-teal text-xl font-bold font-heebo">ההזמנה בוצעה בהצלחה</p>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-gold/30 mb-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-white/70 font-heebo">שם:</span>
                  <span className="text-white font-bold text-lg font-rubik">{completedOrder["שם מלא"]}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-white/70 font-heebo">כיתה:</span>
                  <span className="text-white font-bold text-lg">{completedOrder.כיתה}</span>
                </div>
                <div className="pt-2">
                  <p className="text-white/70 text-sm mb-3 font-heebo">המתנה שלך:</p>
                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 border border-gold/30">
                    <span className="text-5xl">
                      {cart[0]?.image ||
                        completedOrder.מתנה === "צעיף"
                        ? "🧣"
                        : completedOrder.מתנה === "כפפות"
                          ? "🧤"
                          : completedOrder.מתנה === "מטריה"
                            ? "☂️"
                            : completedOrder.מתנה === "משחק קלפים"
                              ? "🃏"
                              : completedOrder.מתנה === "ספר"
                                ? "📖"
                                : completedOrder.מתנה === "מארז מתוק"
                                  ? "🍬"
                                  : completedOrder.מתנה === "פטור משיעורי בית"
                                    ? "📝"
                                    : completedOrder.מתנה === "ארוחת בוקר מפנקת"
                                      ? "🥐"
                                      : "🎁"}
                    </span>
                    <div>
                      <p className="text-white font-bold text-xl font-rubik">
                        {completedOrder.מתנה}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <p className="text-white/60 text-sm font-heebo">{completedOrder.תאריך}</p>
                </div>
              </div>
              <Button
                onClick={closeSuccessModal}
                className="w-full h-14 bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-charcoal font-black text-lg border-2 border-teal/50 shadow-xl hover:shadow-teal/50 transition-all duration-300 hover:scale-105"
              >
                סגור
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
