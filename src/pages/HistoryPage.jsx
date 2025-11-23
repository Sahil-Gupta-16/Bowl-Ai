import React, { useEffect, useState } from 'react';
import { Download, Filter, Calendar, FileVideo, Clock, Camera, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const analyses = [
    { id: 1, name: 'Fast Bowling #12', date: 'Nov 20, 2025', time: '14:30', elbow: 164.2, accuracy: 96, status: 'Legal', angle: 'Front' },
    { id: 2, name: 'Practice Session #8', date: 'Nov 18, 2025', time: '10:15', elbow: 167.8, accuracy: 89, status: 'Review', angle: 'Side' },
    { id: 3, name: 'Match Simulation #5', date: 'Nov 15, 2025', time: '16:45', elbow: 163.5, accuracy: 94, status: 'Legal', angle: 'Front' },
    { id: 4, name: 'Training Drill #22', date: 'Nov 12, 2025', time: '09:20', elbow: 162.1, accuracy: 97, status: 'Legal', angle: 'Side' },
    { id: 5, name: 'Speed Test #3', date: 'Nov 10, 2025', time: '15:00', elbow: 168.5, accuracy: 85, status: 'Review', angle: 'Front' },
    { id: 6, name: 'Form Check #15', date: 'Nov 08, 2025', time: '11:30', elbow: 161.8, accuracy: 98, status: 'Legal', angle: 'Side' }
  ];

  const filteredAnalyses = analyses.filter(a => {
    if (filterStatus !== 'all' && a.status.toLowerCase() !== filterStatus) return false;
    if (filterDate === 'week' && new Date(a.date) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) return false;
    if (filterDate === 'month' && new Date(a.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) return false;
    if (searchText.trim() !== '' && !a.name.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className={`flex justify-between items-center mb-8 flex-wrap gap-4 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
              Analysis History
            </h1>
            <p className="text-gray-400 text-lg">View and manage all your past bowling analyses</p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-all flex items-center gap-2 shadow-md shadow-black/50 whitespace-nowrap">
            <Download className="w-5 h-5" /> Export All
          </button>
        </div>

        {/* Filters with search */}
        <div className="flex flex-wrap gap-6 mb-8 items-center transition-opacity duration-700" style={{opacity: mounted ? 1 : 0}}>
          {/* Search Box */}
          <div className="flex items-center gap-2 flex-grow md:flex-grow-0 max-w-md">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search analyses..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-16 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="all">All Status</option>
              <option value="legal">Legal</option>
              <option value="review">Review</option>
            </select>
          </div>

          {/* Date filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="px-16 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>

          {/* Result count */}
          <div className="ml-auto text-gray-400 font-semibold whitespace-nowrap">
            {filteredAnalyses.length} {filteredAnalyses.length === 1 ? 'result' : 'results'}
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="space-y-6">
          {filteredAnalyses.length ? filteredAnalyses.map((analysis, i) => (
            <div
              key={analysis.id}
              style={{ animationDelay: `${200 + i * 100}ms` }}
              className={`bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 shadow-lg shadow-black/20 cursor-pointer hover:border-emerald-500/50 hover:shadow-emerald-500/30 transition-all duration-300 animate-fade-in-up`}
            >
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-6 min-w-[200px]">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center">
                    <FileVideo className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">{analysis.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {analysis.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {analysis.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-4 h-4" /> {analysis.angle} View
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{analysis.elbow}°</div>
                    <div className="text-xs text-gray-400 mt-0.5">Elbow Angle</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{analysis.accuracy}%</div>
                    <div className="text-xs text-gray-400 mt-0.5">Accuracy</div>
                  </div>
                  <span className={`px-14 py-2 rounded-full text-sm font-semibold border ${
                    analysis.status === 'Legal'
                      ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                  }`}>
                    {analysis.status}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/analysis/${analysis.id}`)}
                      className="px-14 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors text-sm font-semibold"
                    >
                      View Details
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-16 text-gray-400">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <FileVideo className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No analyses found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
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
          animation: fade-in-up 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;
