import React, { useEffect, useState } from 'react';
import { Upload, Clock, BarChart3, FileVideo, Activity, CheckCircle, Calendar, TrendingUp, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentAnalyses = [
    { id: 1, name: 'Fast Bowling #12', date: 'Nov 20, 2025', time: '14:30', elbow: 164.2, accuracy: 96, status: 'Legal' },
    { id: 2, name: 'Practice Session #8', date: 'Nov 18, 2025', time: '10:15', elbow: 167.8, accuracy: 89, status: 'Review' },
    { id: 3, name: 'Match Simulation #5', date: 'Nov 15, 2025', time: '16:45', elbow: 163.5, accuracy: 94, status: 'Legal' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen mx-auto">
        {/* Header with fade-in animation */}
        <div className={`mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-emerald-400 via-emerald-500 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Welcome back! Here's your bowling performance overview</p>
        </div>

        {/* Quick Actions with staggered animation */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              icon: Upload, 
              title: 'New Analysis', 
              desc: 'Upload and analyze a new video', 
              gradient: 'from-emerald-500 to-emerald-600',
              hoverGradient: 'hover:from-emerald-600 hover:to-emerald-700',
              action: () => navigate('/analysis'),
              delay: '100ms'
            },
            { 
              icon: Clock, 
              title: 'View History', 
              desc: 'Browse past analyses', 
              gradient: 'from-purple-500 to-purple-600',
              hoverGradient: 'hover:from-purple-600 hover:to-purple-700',
              action: () => navigate('/history'),
              delay: '200ms'
            },
            { 
              icon: BarChart3, 
              title: 'Reports', 
              desc: 'View detailed reports', 
              gradient: 'from-blue-500 to-blue-600',
              hoverGradient: 'hover:from-blue-600 hover:to-blue-700',
              action: () => {},
              delay: '300ms'
            }
          ].map((action, i) => (
            <button
              key={i}
              onClick={action.action}
              style={{ animationDelay: action.delay }}
              className={`
                bg-gradient-to-br ${action.gradient} ${action.hoverGradient}
                rounded-2xl p-8 text-left 
                transform transition-all duration-300
                hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                group relative overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <action.icon className="w-10 h-10 mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
              <p className="opacity-90 text-sm">{action.desc}</p>
            </button>
          ))}
        </div>

        {/* Stats Cards with staggered animation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Analyses', value: '24', trend: '+12%', icon: FileVideo, color: 'from-emerald-500 to-emerald-600', delay: '400ms' },
            { label: 'Avg Elbow Angle', value: '163.5°', trend: '+2.3°', icon: Activity, color: 'from-blue-500 to-blue-600', delay: '500ms' },
            { label: 'Legal Actions', value: '87%', trend: '+5%', icon: CheckCircle, color: 'from-purple-500 to-purple-600', delay: '600ms' },
            { label: 'This Month', value: '8', trend: '+3', icon: Calendar, color: 'from-orange-500 to-orange-600', delay: '700ms' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{ animationDelay: stat.delay }}
              className={`
                bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700
                hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10
                transition-all duration-300 hover:-translate-y-2
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                group cursor-pointer
              `}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mb-3">{stat.label}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Analyses & Sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Analyses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold">Recent Analyses</h2>
              <button 
                onClick={() => navigate('/history')}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-2 group"
              >
                View All
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className={`
                  bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700
                  hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5
                  transition-all duration-300
                  ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                  group
                `}
              >
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                      {analysis.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {analysis.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {analysis.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">{analysis.elbow}°</div>
                      <div className="text-xs text-gray-500 mt-1">Elbow Angle</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{analysis.accuracy}%</div>
                      <div className="text-xs text-gray-500 mt-1">Accuracy</div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                      analysis.status === 'Legal' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {analysis.status}
                    </span>
                    <button 
                      onClick={() => navigate(`/analysis/${analysis.id}`)}
                      className="px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-emerald-600 transition-all text-sm font-semibold flex items-center gap-2 group/btn"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Performance Summary, Tips, CTA */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <div
              style={{ animationDelay: '1100ms' }}
              className={`
                bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700
                hover:border-purple-500/50 transition-all duration-300
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
              `}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Performance Summary
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-400">Overall Score</span>
                    <span className="font-bold text-lg">92/100</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-progress-92"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-400">Consistency</span>
                    <span className="font-bold text-lg">88/100</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-progress-88"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div
              style={{ animationDelay: '1200ms' }}
              className={`
                bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700
                hover:border-blue-500/50 transition-all duration-300
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
              `}
            >
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                Quick Tips
              </h3>
              <ul className="space-y-4 text-sm">
                {[
                  'Maintain elbow angle below 15° extension',
                  'Keep consistent stride length',
                  'Focus on shoulder rotation timing'
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 group/tip hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 group-hover/tip:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover/tip:text-gray-300 transition-colors">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              style={{ animationDelay: '1300ms' }}
              className={`
                bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-2xl p-6 border border-emerald-500/40
                hover:border-emerald-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
                relative overflow-hidden group/cta
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-emerald-500/10 animate-gradient-shift"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Ready for more?</h3>
                <p className="text-sm text-gray-400 mb-5">Upload a new video to continue improving</p>
                <button
                  onClick={() => navigate('/analysis')}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-bold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2 group"
                >
                  <Upload className="w-5 h-5 group-hover:animate-bounce" />
                  New Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
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

        @keyframes progress-92 {
          from { width: 0%; }
          to { width: 92%; }
        }

        @keyframes progress-88 {
          from { width: 0%; }
          to { width: 88%; }
        }

        @keyframes gradient-shift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-progress-92 {
          animation: progress-92 1.5s ease-out 0.5s forwards;
        }

        .animate-progress-88 {
          animation: progress-88 1.5s ease-out 0.7s forwards;
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
