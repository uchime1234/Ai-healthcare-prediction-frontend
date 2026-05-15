"use client"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { Menu, X, Info, Phone, Settings, ArrowUp, Brain, Sparkles, User } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./apie.css"

const REACT_APP_API_URL = "http://127.0.0.1:8000"

// Types for our messages
interface PredictionDetails {
  prediction_type: string
  input_data: Record<string, any>
  prediction: string
  probabilities: number[]
  advice: string
}

interface ChatMessage {
  message_type: "sent" | "received"
  message_text: string
  created_at: string
  prediction_history?: PredictionDetails
}

export default function PredictionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const isSubmittingRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Animation effect
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fetch user email and chat history on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/authpage");
          return;
        }

        const response = await axios.get(`${REACT_APP_API_URL}/history/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const history = response.data.map((msg: ChatMessage) => ({
          message_type: msg.message_type,
          message_text: msg.message_text,
          created_at: msg.created_at,
          prediction_history: msg.prediction_history ? {
            prediction_type: msg.prediction_history.prediction_type,
            input_data: msg.prediction_history.input_data,
            prediction: msg.prediction_history.prediction,
            probabilities: msg.prediction_history.probabilities,
            advice: msg.prediction_history.advice,
          } : undefined,
        }));
        setMessages(history);

        const email = localStorage.getItem("userEmail") || "";
        setUserEmail(email);
      } catch (error) {
        console.error("Error fetching history:", error);
        navigate("/authpage");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsLoading(true);

    const sentMessage: ChatMessage = {
      message_type: "sent",
      message_text: inputText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, sentMessage]);
    setInputText("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await axios.post(
        `${REACT_APP_API_URL}/predict/`,
        { transcript: sentMessage.message_text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.data.message || response.data.error) {
        const responseText = response.data.message || response.data.error;
        const receivedMessage: ChatMessage = {
          message_type: "received",
          message_text: responseText,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, receivedMessage]);
      } else {
        const receivedMessage: ChatMessage = {
          message_type: "received",
          message_text: response.data.response_text,
          created_at: new Date().toISOString(),
          prediction_history: {
            prediction_type: response.data.prediction_type,
            input_data: response.data.input_data,
            prediction: response.data.prediction,
            probabilities: response.data.probabilities || [response.data.confidence],
            advice: response.data.advice,
          },
        };
        setMessages((prev) => [...prev, receivedMessage]);
      }
    } catch (error: any) {
      console.error("Error processing message:", error);
      const errorMessage = error.response?.data?.error || "Error processing your request";
      const errorMsg: ChatMessage = {
        message_type: "received",
        message_text: errorMessage,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${REACT_APP_API_URL}/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/authpage");
    } catch (error) {
      console.error("Error signing out:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/authpage");
    }
  };

  // Toggle sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Animated Background with Glitter */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-0 right-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#f7931e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffb347" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M800 0C900 100 1000 200 1100 350C1150 450 1200 550 1200 650C1200 750 1150 800 1100 800C1000 800 900 750 800 700C700 650 600 600 500 550C400 500 300 450 200 400C100 350 50 300 0 250V0H800Z"
            fill="url(#predictionGradient)"
            className={`transition-all duration-3000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
          {/* Glitter effect */}
          <circle cx="200" cy="150" r="5" fill="#fff" opacity="0.8">
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="300" r="4" fill="#fff" opacity="0.7">
            <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="600" r="6" fill="#fff" opacity="0.6">
            <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 border-b border-orange-200 bg-white/90 backdrop-blur-md z-20 shadow-sm relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full hover:bg-orange-100 transition-colors"
            aria-label="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-600"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Brain className="text-orange-500" size={28} />
            <h1 className="text-xl md:text-2xl font-bold text-orange-500">AI Body Prediction</h1>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-orange-100 transition-colors"
          aria-label="Menu"
        >
          <Menu className="text-orange-500" size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-orange-100">
            <h2 className="font-bold text-orange-500 text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" /> Menu
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-orange-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="text-orange-500" size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Info size={20} className="text-orange-500" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Phone size={20} className="text-orange-500" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 p-3 rounded-lg text-orange-500">
                  <User size={20} />
                  <span className="truncate">{userEmail || "Not logged in"}</span>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Settings size={20} className="text-orange-500" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="p-6 border-t border-orange-100">
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Chat messages area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <Brain className="w-20 h-20 text-orange-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to AI Health Assistant!</h3>
                <p className="text-gray-500 max-w-md">
                  Ask me about body performance, sleep disorders, heart disease, asthma, Alzheimer's, Parkinson's, hypertension, or diabetes.
                </p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex w-full ${msg.message_type === "sent" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl shadow-sm ${
                    msg.message_type === "sent"
                      ? "bg-gray-100 text-gray-800 rounded-br-sm"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-bl-sm"
                  }`}
                >
                  <div className="p-4">
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.message_text}</p>
                    
                    {msg.prediction_history && (
                      <div className="mt-3 pt-3 border-t border-white/20 text-xs space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="font-semibold block text-xs opacity-90">Type:</span>
                            <span className="text-sm">{msg.prediction_history.prediction_type}</span>
                          </div>
                          <div>
                            <span className="font-semibold block text-xs opacity-90">Prediction:</span>
                            <span className="text-sm font-medium">{msg.prediction_history.prediction}</span>
                          </div>
                        </div>
                        
                        {msg.prediction_history.probabilities && msg.prediction_history.probabilities.length > 0 && (
                          <div>
                            <span className="font-semibold block text-xs opacity-90">Confidence:</span>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                              <div 
                                className="bg-white h-2 rounded-full transition-all duration-500"
                                style={{ width: `${msg.prediction_history.probabilities[0]}%` }}
                              />
                            </div>
                            <span className="text-xs mt-1 block">{msg.prediction_history.probabilities[0]}%</span>
                          </div>
                        )}
                        
                        <div>
                          <span className="font-semibold block text-xs opacity-90">Advice:</span>
                          <p className="text-sm mt-1">{msg.prediction_history.advice}</p>
                        </div>
                        
                        <div className="text-xs opacity-70 mt-2">
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area - Fixed at bottom */}
        <div className="border-t border-orange-200 bg-white/95 backdrop-blur-md p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              <div className="relative flex items-center bg-white border-2 border-orange-200 rounded-2xl focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your health question here... (e.g., predict heart disease age 45 male height 170 weight 80...)"
                  className="flex-grow py-4 px-5 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 rounded-2xl text-sm md:text-base"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className={`absolute right-2 p-2 rounded-xl transition-all ${
                    inputText.trim() && !isLoading
                      ? "bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg"
                      : "bg-gray-200 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <ArrowUp className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2 flex-wrap">
                <Sparkles className="h-3 w-3 text-orange-400" />
                <span>Ask about: Body Performance | Sleep | Heart Disease | Asthma | Alzheimer's | Parkinson's | Hypertension | Diabetes</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Example: "predict heart age 45 male height 170 weight 80 systolic bp 140 diastolic bp 90 cholesterol above normal glucose normal smoke no active yes alcohol no"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}