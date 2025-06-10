import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BarChart3, Users, TrendingUp, Brain, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M3.29 7L12 12.75 20.71 7" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">Customer Churn AI</span>
            </div>
            <nav>
              <div 
                onClick={() => navigate('/dashboard')} 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-500 bg-white/10 hover:bg-white/20 hover:text-gray-900 cursor-pointer transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Background Doodles with increased visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Analytics Doodles - Top Left */}
        <svg className="absolute -top-16 -left-16 w-64 h-64 text-blue-400/70 transform rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50h20v30H10z M40 30h20v50H40z M70 20h20v60H70z" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="45" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="25" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="15" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M20 45L50 25L80 15" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
        
        {/* Network Doodles - Top Right */}
        <svg className="absolute -top-16 -right-16 w-64 h-64 text-purple-400/70 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="30" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="30" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="70" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="70" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M50 50L20 30M50 50L80 30M50 50L20 70M50 50L80 70" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* AI/ML Doodles - Bottom Left */}
        <svg className="absolute -bottom-8 -left-8 w-64 h-64 text-blue-400/70 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20h60v60H20z" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M30 40h40M30 50h40M30 60h40" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="35" cy="40" r="2" fill="currentColor"/>
          <circle cx="65" cy="50" r="2" fill="currentColor"/>
          <circle cx="45" cy="60" r="2" fill="currentColor"/>
        </svg>

        {/* Customer Doodles - Bottom Right */}
        <svg className="absolute -bottom-16 -right-16 w-64 h-64 text-purple-400/70 transform rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M35 50c0-15 30-15 30 0v10c0 15-30 15-30 0z" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="30" cy="40" r="8" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="70" cy="40" r="8" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* New Doodles */}
        {/* Floating Data Points - Mid Left */}
        <svg className="absolute top-1/4 left-8 w-40 h-40 text-blue-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="3" fill="currentColor"/>
          <circle cx="30" cy="30" r="2" fill="currentColor"/>
          <circle cx="70" cy="30" r="2" fill="currentColor"/>
          <circle cx="30" cy="70" r="2" fill="currentColor"/>
          <circle cx="70" cy="70" r="2" fill="currentColor"/>
          <path d="M50 50L30 30M50 50L70 30M50 50L30 70M50 50L70 70" stroke="currentColor" strokeWidth="0.3"/>
        </svg>

        {/* Binary Code - Mid Right */}
        <div className="absolute top-1/3 -left-8 text-blue-400/70 transform rotate-12 text-xs font-mono">
          10110
          01001
          11010
          00101
        </div>

        {/* Pie Chart - Center Left */}
        <svg className="absolute top-1/2 left-24 w-24 h-24 text-blue-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50L50 10A40 40 0 0 1 85 65Z" fill="currentColor"/>
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* Floating Metrics - Center Right */}
        <svg className="absolute top-1/2 right-20 w-36 h-36 text-purple-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80L40 60L60 70L80 30" stroke="currentColor" strokeWidth="1"/>
          <circle cx="40" cy="60" r="2" fill="currentColor"/>
          <circle cx="60" cy="70" r="2" fill="currentColor"/>
          <circle cx="80" cy="30" r="2" fill="currentColor"/>
        </svg>

        {/* Neural Network - Mid Center */}
        <svg className="absolute top-1/2 -right-8 w-48 h-48 text-purple-400/70 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="30" r="3" fill="currentColor"/>
          <circle cx="20" cy="50" r="3" fill="currentColor"/>
          <circle cx="20" cy="70" r="3" fill="currentColor"/>
          <circle cx="50" cy="40" r="3" fill="currentColor"/>
          <circle cx="50" cy="60" r="3" fill="currentColor"/>
          <circle cx="80" cy="50" r="3" fill="currentColor"/>
          <path d="M20 30L50 40M20 30L50 60M20 50L50 40M20 50L50 60M20 70L50 40M20 70L50 60M50 40L80 50M50 60L80 50" stroke="currentColor" strokeWidth="0.3"/>
        </svg>

        {/* Data Flow Lines */}
        <svg className="absolute inset-0 w-full h-full text-blue-300/30" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20Q25 40 50 20T100 20" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0 20Q25 40 50 20T100 20;
                      M0 25Q25 45 50 25T100 25;
                      M0 20Q25 40 50 20T100 20" />
          </path>
          <path d="M0 40Q25 60 50 40T100 40" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0 40Q25 60 50 40T100 40;
                      M0 45Q25 65 50 45T100 45;
                      M0 40Q25 60 50 40T100 40" />
          </path>
          <path d="M0 60Q25 80 50 60T100 60" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M0 60Q25 80 50 60T100 60;
                      M0 65Q25 85 50 65T100 65;
                      M0 60Q25 80 50 60T100 60" />
          </path>
        </svg>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/70 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Predict & Prevent
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Customer Churn
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Leverage AI to identify at-risk customers and take proactive measures to retain them.
              Our advanced analytics help you stay ahead of customer churn.
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              Try Now!
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto px-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Real-time churn prediction with machine learning algorithms and comprehensive data analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Insights</h3>
              <p className="text-gray-600 leading-relaxed">Deep dive into customer behavior patterns and identify key risk factors</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Actions</h3>
              <p className="text-gray-600 leading-relaxed">Get actionable recommendations to retain customers and improve satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mx-auto mt-12 px-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
            <div className="text-gray-600">Churn Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Real-time Monitoring</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">&copy; 2025 Customer Churn AI. Powered by advanced machine learning.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
