import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Gift {
  id: number
  name: string
  points: number
  image: string
  description: string
}

interface CartItem extends Gift {
  quantity: number
}

export default function RewardsShop() {

//   // <CHANGE> שליפת השם מ-localStorage
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || 'אורח';
  });
  
  const [cart, setCart] = useState<CartItem[]>([])

  const gifts: Gift[] = [
    {
      id: 1,
      name: "ספר צבעוני",
      points: 50,
      image: "📚",
      description: "ספר מרתק ומעניין"
    },
    {
      id: 2,
      name: "משחק קופסה",
      points: 100,
      image: "🎲",
      description: "משחק משפחתי מהנה"
    },
    {
      id: 3,
      name: "אוזניות",
      points: 150,
      image: "🎧",
      description: "אוזניות איכותיות"
    },
    {
      id: 4,
      name: "תיק גב",
      points: 200,
      image: "🎒",
      description: "תיק גב מעוצב ונוח"
    },
    {
      id: 5,
      name: "כדור כדורגל",
      points: 80,
      image: "⚽",
      description: "כדור כדורגל מקצועי"
    }
  ]

  const addToCart = (gift: Gift) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === gift.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === gift.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...gift, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const totalPoints = cart.reduce((sum, item) => sum + item.points * item.quantity, 0)

  return (
    <div className="min-h-screen bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-crimson/20 rounded-full blur-2xl animate-bounce" />
      </div>

      <div className="relative z-10 flex gap-6 p-6">
        {/* Main content - Gift cards */}
        <div className="flex-1">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              <span className="inline-block animate-bounce-letter delay-0">ח</span>
              <span className="inline-block animate-bounce-letter delay-100">נ</span>
              <span className="inline-block animate-bounce-letter delay-200">ו</span>
              <span className="inline-block animate-bounce-letter delay-300">ת</span>
              <span className="inline-block mx-3 animate-pulse text-gold">✦</span>
              <span className="inline-block animate-bounce-letter delay-400">ה</span>
              <span className="inline-block animate-bounce-letter delay-500">פ</span>
              <span className="inline-block animate-bounce-letter delay-600">ר</span>
              <span className="inline-block animate-bounce-letter delay-700">ס</span>
              <span className="inline-block animate-bounce-letter delay-800">י</span>
              <span className="inline-block animate-bounce-letter delay-900">ם</span>
            </h1>
            <p className="text-2xl text-gold font-bold mb-2">של {userName}</p>
            <div className="h-2 w-64 mx-auto bg-gradient-to-r from-crimson via-gold to-teal animate-shimmer" />
            <p className="text-xl text-teal font-semibold mt-6">בחרו את המתנות שלכם</p>
          </div>

          {/* Gift cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gifts.map((gift, index) => (
              <div
                key={gift.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-gold/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gift image/emoji */}
                <div className="text-8xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {gift.image}
                </div>

                {/* Gift info */}
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  {gift.name}
                </h3>
                <p className="text-teal/80 text-center mb-4 text-sm">
                  {gift.description}
                </p>

                {/* Points badge */}
                <div className="bg-gradient-to-r from-crimson to-crimson/80 text-white text-center py-2 rounded-lg mb-4 font-bold text-lg">
                  {gift.points} נקודות
                </div>

                {/* Add to cart button */}
                <Button
                  onClick={() => addToCart(gift)}
                  className="w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-charcoal font-bold border-2 border-teal/50 shadow-lg hover:shadow-teal/50 transition-all duration-300"
                >
                  הוסף לעגלה
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping cart sidebar */}
        <div className="w-96 bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-gold/30 h-fit sticky top-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🛒</span>
            <h2 className="text-3xl font-black text-white">העגלה שלי</h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">העגלה ריקה</p>
              <p className="text-teal/60 text-sm mt-2">הוסיפו מתנות לעגלה</p>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-charcoal/50 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.image}</span>
                        <div>
                          <h4 className="text-white font-bold">{item.name}</h4>
                          <p className="text-gold text-sm">{item.points} נקודות</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-crimson hover:text-crimson/80 text-xl"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-crimson/80 hover:bg-crimson text-white rounded font-bold"
                        >
                          -
                        </button>
                        <span className="text-white font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-teal/80 hover:bg-teal text-white rounded font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-white font-bold">
                        {item.points * item.quantity} נקודות
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-gold/30 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-lg">סה"כ פריטים:</span>
                  <span className="text-teal font-bold text-lg">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-xl font-bold">סה"כ נקודות:</span>
                  <span className="text-gold font-black text-2xl">{totalPoints}</span>
                </div>
              </div>

              {/* Checkout button */}
              <Button className="w-full h-12 bg-gradient-to-r from-crimson to-crimson/90 hover:from-crimson/90 hover:to-crimson text-white font-bold text-lg border-2 border-gold/50 shadow-xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 animate-pulse-slow">
                השלם רכישה
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}