import React, { useState } from 'react';
import { Video, Upload, CheckCircle, Play, X, FileVideo, Zap, Info } from 'lucide-react';

const AnalysisPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    const maxSize = 100 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid video file (MP4, AVI, MOV)');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 100MB');
      return;
    }

    setUploadedFile(file);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setIsAnalyzing(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen py-8 px-16">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-16 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-emerald-500 font-semibold">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">Analyze Your Action</h1>
          <p className="text-gray-400">Upload your bowling video for instant biomechanical analysis</p>
        </div>

        {/* Single Upload (removed angle selection) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Upload Video</h2>
          <p className="text-gray-400">We support a single upload flow — simply choose your video and start analysis.</p>
        </div>

        {/* Upload or Preview Zone */}
        {!uploadedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-12 border-2 border-dashed transition-all ${
              isDragging
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-emerald-500" />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {isDragging ? 'Drop your video here' : 'Upload Your Video'}
              </h3>
              <p className="text-gray-400 mb-6">
                {isDragging ? 'Release to upload' : 'Drag and drop or click to browse'}
              </p>

              <label className="inline-block">
                <input
                  type="file"
                  accept="video/mp4,video/avi,video/quicktime"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold transition-all cursor-pointer inline-flex items-center gap-2">
                  <FileVideo className="w-5 h-5" /> Choose Video File
                </span>
              </label>

              <p className="text-sm text-gray-500 mt-4">MP4, AVI, MOV • Max 100MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{uploadedFile.name}</h3>
                  <p className="text-sm text-gray-400">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={handleRemove}
                  className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                <Play className="w-16 h-16 text-slate-600" />
              </div>
            </div>

            {/* Analysis Configuration */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4">Analysis Configuration</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Video</span>
                  <span className="font-semibold">Uploaded Video</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Analysis Type</span>
                  <span className="font-semibold">Biomechanical</span>
                </div>

                {isAnalyzing && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Processing...</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-5 h-5" />
                  {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                </button>
                <button
                  onClick={handleRemove}
                  className="px-6 py-3 rounded-xl border-2 border-slate-700 hover:border-slate-600 font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips Card */}
        <div className="mt-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-blue-500/30">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Ensure good lighting and clear visibility of the bowler</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Use a steady camera or tripod to avoid shaky footage</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Capture the complete bowling action from run-up to follow-through</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Avoid obstructions between the camera and the bowler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
