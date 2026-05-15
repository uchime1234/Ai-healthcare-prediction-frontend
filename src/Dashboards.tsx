"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/colabsiable"
import { ChevronDown, ChevronRight, Activity, Brain, Heart, TreesIcon as Lungs, Moon, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

const models = [
  {
    id: "hypertension",
    title: "Hypertension",
    icon: Heart,
    description:
      "Advanced AI model for predicting hypertension risk based on lifestyle factors, medical history, and biometric data. Our algorithm analyzes multiple risk factors to provide accurate cardiovascular health assessments.",
    explanation:
      "Visual insights show blood pressure trends, risk factor correlations, lifestyle impact analysis, and personalized prevention strategies.",
    images: [
      "/hypertension-images/age_dist.png",
      "/hypertension-images/hypertension.png",
      "/hypertension-images/pair_plot.png",
      "/hypertension-images/voilin.png",
    ],
  },
  {
    id: "asthma",
    title: "Asthma Disease",
    icon: Lungs,
    description:
      "Comprehensive respiratory health prediction model that evaluates environmental factors, genetic predisposition, and symptom patterns to forecast asthma development and severity.",
    explanation:
      "Charts display respiratory function trends, trigger identification, seasonal patterns, and medication effectiveness tracking.",
    images: [
      "/asthma-images/confusion.png",
      "/asthma-images/features-importance.png",
      "/asthma-images/countplot.png",
      "/asthma-images/air-pollution.png",
    ],
  },
  {
    id: "parkinsons",
    title: "Parkinson's Disease",
    icon: Brain,
    description:
      "Cutting-edge neurological assessment tool using movement analysis, speech patterns, and cognitive markers to detect early signs of Parkinson's disease with high accuracy.",
    explanation:
      "Visualizations include movement tremor analysis, speech pattern recognition, cognitive assessment scores, and progression timeline predictions.",
    images: [
      "/parksion_model-images/feature_dist.png",
      "/parksion_model-images/heatmap.png",
      "/parksion_model-images/pca.png",
      "/parksion_model-images/visual4.png",
    ],
  },
  {
    id: "alzheimers",
    title: "Alzheimer's Disease",
    icon: Brain,
    description:
      "Revolutionary cognitive health predictor that analyzes memory patterns, brain imaging data, and genetic factors to assess Alzheimer's risk and cognitive decline progression.",
    explanation:
      "Insights feature memory test results, brain activity maps, genetic risk factors, and cognitive decline trajectory modeling.",
    images: [
      "/alzheimer-images/histplot.png",
      "/alzheimer-images/scatterplot.png",
      "/alzheimer-images/countplot.png",
      "/alzheimer-images/histplot.png",
    ],
  },
  {
    id: "diabetes",
    title: "Type 2 Diabetes",
    icon: Activity,
    description:
      "Sophisticated metabolic health model predicting Type 2 diabetes risk through glucose monitoring, lifestyle analysis, and family history evaluation with personalized recommendations.",
    explanation:
      "Data visualizations show glucose level trends, insulin sensitivity patterns, dietary impact analysis, and lifestyle modification suggestions.",
    images: [
      "/type2-diabetes-images/boxplot.png",
      "/type2-diabetes-images/diabetesplot.png",
      "/type2-diabetes-images/heatmap.png",
      "/type2-diabetes-images/roc_curve.png",
    ],
  },
  {
    id: "performance",
    title: "Body Performance",
    icon: TrendingUp,
    description:
      "Comprehensive fitness and performance optimization system that evaluates physical capabilities, recovery patterns, and training effectiveness for peak body performance.",
    explanation:
      "Performance metrics include strength progression charts, endurance capacity analysis, recovery time optimization, and injury prevention insights.",
    images: [
      "/body-performance-images/correlation.png",
      "/body-performance-images/orange_line.png",
      "/body-performance-images/orange_confusion.png",
      "/body-performance-images/visual4.png",
    ],
  },
  {
    id: "cardio",
    title: "My Cardio",
    icon: Heart,
    description:
      "Advanced cardiovascular health monitoring system that tracks heart rate variability, exercise capacity, and cardiac risk factors for optimal heart health management.",
    explanation:
      "Cardiovascular insights display heart rate patterns, exercise response analysis, cardiac risk assessment, and fitness improvement recommendations.",
    images: [
      "/heart-prediction-images/heatmap.png",
      "/heart-prediction-images/histogram_age_cardio.png",
      "/heart-prediction-images/boxplot_blood_pressure_smoking.png",
      "/heart-prediction-images/scatter_cholesterol_glucose.png",
    ],
  },
  {
    id: "sleep",
    title: "Sleep Disorder",
    icon: Moon,
    description:
      "Intelligent sleep analysis platform that evaluates sleep patterns, quality metrics, and disorder indicators to optimize rest and recovery for better health outcomes.",
    explanation:
      "Sleep analytics show sleep stage distributions, quality scores, disorder risk indicators, and personalized sleep hygiene recommendations.",
    images: [
      "/sleep-predictions-images/barchart_physical_activity_bmi.png",
      "/sleep-predictions-images/boxplot_sleep_quality_occupation.png",
      "/sleep-predictions-images/heatmap_correlation.png",
      "/sleep-predictions-images/pairplot_numerical_features.png",
    ],
  },
]

export default function Dashboard() {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const toggleSection = (id: string) => {
    setOpenSections((prev) => (prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]))
  }

  return (
    <div className="w-full bg-white relative">
      {/* Thick Orange Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-0 right-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dashboardOrangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#ff6b35" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#f7931e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="dashboardOrangeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#ff4500" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="dashboardOrangeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff4500" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M800 0C900 100 1000 200 1100 350C1150 450 1200 550 1200 650C1200 750 1150 800 1100 800C1000 800 900 750 800 700C700 650 600 600 500 550C400 500 300 450 200 400C100 350 50 300 0 250V0H800Z"
            fill="url(#dashboardOrangeGradient)"
            className={`transition-all duration-3000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
          <path
            d="M600 100C700 150 800 200 900 300C950 400 1000 500 1000 600C1000 700 950 750 900 750C800 750 700 700 600 650C500 600 400 550 300 500C200 450 100 400 50 350C0 300 0 250 0 200V100H600Z"
            fill="url(#dashboardOrangeGradient2)"
            className={`transition-all duration-3500 ease-out delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
          <path
            d="M400 200C500 250 600 300 700 400C750 500 800 600 800 700C800 800 750 850 700 850C600 850 500 800 400 750C300 700 200 650 100 600C50 550 0 500 0 450V200H400Z"
            fill="url(#dashboardOrangeGradient3)"
            className={`transition-all duration-4000 ease-out delay-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
        </svg>

        {/* Thick Orange Floating Animated Elements */}
        <div className="absolute top-20 left-20 w-6 h-6 bg-orange-500 rounded-full animate-pulse opacity-80 shadow-lg"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-orange-600 rounded-full animate-bounce opacity-70 shadow-lg"></div>
        <div className="absolute bottom-32 left-16 w-5 h-5 bg-orange-700 rounded-full animate-ping opacity-90 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-7 h-7 bg-orange-500 rounded-full animate-pulse opacity-60 shadow-lg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-9 h-9 bg-orange-600 rounded-full animate-bounce opacity-75 shadow-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-orange-700 rounded-full animate-ping opacity-80 shadow-lg"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-orange-500 rounded-full animate-pulse opacity-70 shadow-lg"></div>
      </div>

      {/* Header - Fixed */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 sticky top-0 z-20 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            AI Body Predictor Dashboard
          </h1>
          <p
            className={`text-xl opacity-90 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Explore our comprehensive suite of AI-powered health prediction models
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="w-full relative z-10">
        <div className="max-w-6xl mx-auto p-8 space-y-6">
          {models.map((model, index) => {
            const Icon = model.icon
            const isOpen = openSections.includes(model.id)

            return (
              <Collapsible key={model.id} open={isOpen} onOpenChange={() => toggleSection(model.id)}>
                <Card
                  className={`overflow-hidden transition-all duration-500 hover:shadow-xl bg-white/95 backdrop-blur-sm border-2 border-orange-200 hover:border-orange-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-orange-100/80 transition-colors duration-200">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-orange-500 rounded-lg shadow-md">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-orange-600 text-xl font-bold">{model.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="w-6 h-6 text-orange-600 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-6 h-6 text-orange-600 transition-transform duration-200" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="transition-all duration-300 ease-in-out">
                    <CardContent className="pt-0">
                      <p className="text-gray-700 mb-6 leading-relaxed">{model.description}</p>

                      {/* Real Image Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {model.images.map((imagePath, i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-orange-400"
                          >
                            <img
                              src={imagePath || "/placeholder.svg"}
                              alt={`${model.title} Visual ${i + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback to placeholder if image doesn't exist
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                target.parentElement!.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500">
                                    <div class="text-center">
                                      <div class="w-12 h-12 text-white mx-auto mb-2 flex items-center justify-center">
                                        ${Icon === Heart ? "❤️" : Icon === Brain ? "🧠" : Icon === Lungs ? "🫁" : Icon === Activity ? "📊" : Icon === TrendingUp ? "📈" : Icon === Moon ? "🌙" : "📊"}
                                      </div>
                                      <span class="text-sm text-white font-bold">Visual ${i + 1}</span>
                                    </div>
                                  </div>
                                `
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed bg-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
                        <span className="font-semibold text-orange-700">Insights: </span>
                        {model.explanation}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )
          })}

          {/* Launch AI Assistant Button */}
          <div
            className={`text-center pt-8 pb-16 transition-all duration-1000 ease-out delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              onClick={() => navigate("/authpage")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-orange-500"
            >
              Launch AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
