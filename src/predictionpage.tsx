"use client"

import { Button } from "./components/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/card"
import { ArrowLeft, Brain } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function PredictionPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">AI Prediction Assistant</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-orange-600 text-2xl">AI Assistant Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-100 rounded-full">
                <Brain className="w-12 h-12 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 text-lg mb-8">
              Our advanced AI prediction models are being fine-tuned for optimal accuracy. The interactive prediction
              interface will be available soon.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/dashboard")} className="bg-orange-600 hover:bg-orange-700">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
