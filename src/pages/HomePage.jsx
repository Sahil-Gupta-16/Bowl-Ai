import React, { useEffect, useState } from 'react';
import { CheckCircle, Video, BarChart3, Upload, Clock, Play, ArrowRight, Activity, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="overflow-hidden px-8">
      {/* Hero Section */}
      <section className="relative py-20 px-16">
        <div className="max-w-screen mx-auto">
          {/* flex with equal height, min height for hero */}
          <div className="flex lg:flex-row flex-col gap-12 items-stretch min-h-[500px]">
            {/* Left content with fade/slide animation */}
            <div className={`flex flex-1 h-full flex-col justify-between space-y-8 p-8 bg-transparent transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-gray-300">ICC Compliant • Trusted by 10,000+ Bowlers</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-10">
                  <span className="bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent">
                    Analyze Your Bowling Action
                  </span>
                  <br />
                  <span className="text-white">Like Never Before</span>
                </h1>
              </div>
              <div>
                <p className="text-xl text-gray-400 mt-4 mb-10">
                  Advanced AI-powered biomechanical analysis to perfect your technique,
                  <br />
                  ensure ICC compliance, and elevate your game to professional standards.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/analysis')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    Start Free Analysis <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-all flex items-center gap-2">
                    <Play className="w-5 h-5" /> Watch Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right video container with fade-in and fill height */}
            <div className={`relative flex-1 h-full flex flex-col rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 p-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex-grow h-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                <Video className="w-24 h-24 text-slate-600" />
              </div>

              {/* Floating Stats - unchanged */}
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-xl rounded-xl p-4 border border-emerald-500/30 animate-pulse">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Status: Legal</span>
                </div>
                <div className="text-2xl font-bold">165.3°</div>
                <div className="text-xs text-gray-400">Elbow Angle</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Accuracy</span>
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs text-gray-400">AI Confidence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-16 bg-slate-900/30">
        <div className="max-w-screen mx-auto">
          <div className="text-center mb-16 text-gray-400 transition-opacity duration-700" style={{opacity: mounted ? 1 : 0}}>
            <h2 className="text-4xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl">Everything you need for professional bowling analysis</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Upload, title: 'Easy Upload', desc: 'Drag & drop videos for instant analysis', color: 'from-blue-500 to-blue-600' },
              { icon: Clock, title: 'Real-time Analysis', desc: 'Get results in under 60 seconds', color: 'from-purple-500 to-purple-600' },
              { icon: BarChart3, title: 'Detailed Metrics', desc: 'Comprehensive biomechanical data', color: 'from-emerald-500 to-emerald-600' },
              { icon: Target, title: 'Actionable Insights', desc: 'AI-powered coaching recommendations', color: 'from-orange-500 to-orange-600' }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-2"
                style={{transitionDelay: `${i * 150}ms`, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)'}}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-16">
        <div className="max-w-screen mx-auto">
          <div className={`text-center mb-16 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Three simple steps to perfect your action</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                num: '1',
                icon: Upload,
                title: 'Upload Video',
                color: 'from-blue-500 to-blue-600',
                features: ['HD video support', 'Multiple formats', 'Secure upload']
              },
              {
                num: '2',
                icon: Activity,
                title: 'AI Analysis',
                color: 'from-purple-500 to-purple-600',
                features: ['Joint detection', 'Angle calculation', 'ICC compliance check']
              },
              {
                num: '3',
                icon: BarChart3,
                title: 'Get Results',
                color: 'from-emerald-500 to-emerald-600',
                features: ['Detailed report', 'Visual feedback', 'Improvement tips']
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative transition-opacity duration-700"
                style={{transitionDelay: `${i * 200}ms`, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)'}}
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xl font-bold mb-4`}>
                    {step.num}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/analysis')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold transition-all transform hover:scale-105"
            >
              Start Free Analysis
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-emerald-500/20 border border-emerald-500/30 p-12 text-center">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl" />
            <div className="relative z-10 transition-opacity duration-700" style={{opacity: mounted ? 1 : 0}}>
              <h2 className="text-4xl font-extrabold mb-4">
                Ready to Perfect Your Bowling Action?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of bowlers using AI to improve their technique
              </p>
              <button
                onClick={() => navigate('/analysis')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold transition-all transform hover:scale-105 mb-6"
              >
                Get Started Free
              </button>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Free analysis
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Instant results
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
