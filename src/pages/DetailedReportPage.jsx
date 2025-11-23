import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle, 
  Activity, BarChart3, TrendingUp, Download, Share2,
  Video, Target, Zap, Award
} from 'lucide-react';

const DetailedReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data - Replace with API call based on id
  const analysisData = {
    id: id,
    name: 'Fast Bowling #12',
    date: 'Nov 20, 2025',
    time: '14:30',
    status: 'Legal',
    elbowAngle: 164.2,
    accuracy: 96,
    overallScore: 92,
    videoUrl: '/sample-video.mp4',
    metrics: {
      elbowExtension: { value: 14.2, max: 15, unit: '°', status: 'Legal' },
      shoulderRotation: { value: 87, target: 90, unit: '°', status: 'Good' },
      kneeAngle: { value: 143, target: 140, unit: '°', status: 'Good' },
      strideLength: { value: 2.3, target: 2.5, unit: 'm', status: 'Acceptable' },
      releaseHeight: { value: 2.8, target: 2.7, unit: 'm', status: 'Excellent' },
      followThrough: { value: 95, target: 90, unit: '%', status: 'Excellent' }
    },
    recommendations: [
      'Maintain your current elbow angle - excellent ICC compliance',
      'Consider increasing stride length by 8cm for more power',
      'Shoulder rotation timing is good, maintain consistency',
      'Follow-through technique is excellent, keep it up'
    ],
    comparisonData: [
      { session: 'Session 1', score: 85 },
      { session: 'Session 2', score: 88 },
      { session: 'Session 3', score: 90 },
      { session: 'Current', score: 92 }
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Legal':
      case 'Excellent':
      case 'Good':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'Acceptable':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Review':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen mx-auto">
        {/* Back Button & Header */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back 
          </button>
          
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-emerald-400 via-emerald-500 to-purple-500 bg-clip-text text-transparent">
                {analysisData.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {analysisData.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {analysisData.time}
                </span>
                <span className={`px-4 py-1 rounded-full text-xs font-bold border ${getStatusColor(analysisData.status)}`}>
                  {analysisData.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-2 font-semibold">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2 font-semibold">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Overall Score', value: analysisData.overallScore + '/100', icon: Award, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Elbow Angle', value: analysisData.elbowAngle + '°', icon: Activity, color: 'from-blue-500 to-blue-600' },
            { label: 'Accuracy', value: analysisData.accuracy + '%', icon: Target, color: 'from-purple-500 to-purple-600' },
            { label: 'Status', value: analysisData.status, icon: CheckCircle, color: 'from-orange-500 to-orange-600' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 100}ms` }}
              className={`
                bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700
                hover:border-emerald-500/50 hover:shadow-lg
                transition-all duration-300 hover:-translate-y-2
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
              `}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Video & Metrics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-emerald-400" />
                Analysis Video
              </h3>
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                <Video className="w-16 h-16 text-slate-600" />
                <p className="text-gray-500 ml-4">Video Player Placeholder</p>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Biomechanical Metrics
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(analysisData.metrics).map(([key, metric], i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{metric.value}</span>
                      <span className="text-gray-500">{metric.unit}</span>
                      {metric.target && (
                        <span className="text-sm text-gray-500">/ Target: {metric.target}{metric.unit}</span>
                      )}
                      {metric.max && (
                        <span className="text-sm text-gray-500">/ Max: {metric.max}{metric.unit}</span>
                      )}
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                        style={{ 
                          width: `${metric.max ? (metric.value / metric.max * 100) : (metric.value / metric.target * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Progress Over Time
              </h3>
              <div className="flex items-end justify-between h-64 gap-4">
                {analysisData.comparisonData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-700"
                      style={{ height: `${item.score}%` }}
                    />
                    <div className="text-center">
                      <div className="text-lg font-bold">{item.score}</div>
                      <div className="text-xs text-gray-500">{item.session}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations & Tips */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                AI Recommendations
              </h3>
              <ul className="space-y-4 text-sm">
                {analysisData.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-3 group/tip hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 group-hover/tip:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover/tip:text-gray-300 transition-colors">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-2xl p-6 border border-emerald-500/40">
              <h3 className="text-xl font-bold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/analysis')}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Analyze Another Video
                </button>
                <button 
                  onClick={() => navigate('/history')}
                  className="w-full px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  View All Analyses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DetailedReportPage;
