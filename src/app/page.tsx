"use client";

import { useSpeedTest } from "@/hooks/useSpeedTest";

export default function SpeedTestPage() {
  const { isRunning, currentTest, progress, results, runSpeedTest, resetTest } =
    useSpeedTest();

  const formatSpeed = (mbps: number | null): string => {
    if (mbps === null) return "--";
    if (mbps >= 1000) return `${(mbps / 1000).toFixed(2)} Gbps`;
    return `${mbps.toFixed(2)} Mbps`;
  };

  const formatPing = (ms: number | null): string => {
    if (ms === null) return "--";
    return `${ms.toFixed(1)} ms`;
  };

  const getTestStatus = () => {
    if (!isRunning) return "Ready to test";
    switch (currentTest) {
      case "ping":
        return "Testing ping...";
      case "download":
        return "Testing download speed...";
      case "upload":
        return "Testing upload speed...";
      default:
        return "Processing...";
    }
  };

  const getProgressColor = () => {
    if (currentTest === "ping") return "from-blue-500 to-blue-600";
    if (currentTest === "download") return "from-emerald-500 to-emerald-600";
    if (currentTest === "upload") return "from-violet-500 to-violet-600";
    return "from-gray-500 to-gray-600";
  };

  const getTestIcon = () => {
    switch (currentTest) {
      case "ping":
        return "⚡";
      case "download":
        return "⬇️";
      case "upload":
        return "⬆️";
      default:
        return "🚀";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl animate-float">
            <span className="text-3xl">🌐</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Internet Speed Test
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Measure your connection&apos;s ping, download, and upload speeds
            with precision and real-time feedback
          </p>
        </div>

        {/* Test Controls */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-white/20 animate-slide-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <button
              onClick={runSpeedTest}
              disabled={isRunning}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isRunning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    Start Test
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {!isRunning &&
              (results.ping !== null ||
                results.download !== null ||
                results.upload !== null) && (
                <button
                  onClick={resetTest}
                  className="px-8 py-5 bg-gradient-to-r from-slate-100 to-gray-200 hover:from-slate-200 hover:to-gray-300 text-slate-700 font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔄 Reset
                </button>
              )}
          </div>

          {/* Test Status */}
          {isRunning && (
            <div className="mt-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl animate-pulse">{getTestIcon()}</span>
                <p className="text-xl font-semibold text-slate-700">
                  {getTestStatus()}
                </p>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 ease-out shadow-lg`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-sm text-slate-600">
                <span>0%</span>
                <span className="font-medium">
                  {progress.toFixed(1)}% complete
                </span>
                <span>100%</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Ping */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Ping</h3>
            <p className="text-4xl font-black text-blue-600 mb-2">
              {formatPing(results.ping)}
            </p>
            <p className="text-slate-600 font-medium">Latency</p>
            {results.ping !== null && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-700">
                  {results.ping < 50
                    ? "Excellent"
                    : results.ping < 100
                    ? "Good"
                    : results.ping < 200
                    ? "Fair"
                    : "Poor"}
                </p>
              </div>
            )}
          </div>

          {/* Download */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">⬇️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Download</h3>
            <p className="text-4xl font-black text-emerald-600 mb-2">
              {formatSpeed(results.download)}
            </p>
            <p className="text-slate-600 font-medium">Download Speed</p>
            {results.download !== null && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl">
                <p className="text-xs text-emerald-700">
                  {results.download > 100
                    ? "Ultra Fast"
                    : results.download > 50
                    ? "Fast"
                    : results.download > 25
                    ? "Good"
                    : "Basic"}
                </p>
              </div>
            )}
          </div>

          {/* Upload */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">⬆️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Upload</h3>
            <p className="text-4xl font-black text-violet-600 mb-2">
              {formatSpeed(results.upload)}
            </p>
            <p className="text-slate-600 font-medium">Upload Speed</p>
            {results.upload !== null && (
              <div className="mt-4 p-3 bg-violet-50 rounded-xl">
                <p className="text-xs text-violet-700">
                  {results.upload > 50
                    ? "Excellent"
                    : results.upload > 25
                    ? "Good"
                    : results.upload > 10
                    ? "Fair"
                    : "Basic"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 animate-slide-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📡</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-3 text-lg">
                Ping Test
              </h4>
              <p className="leading-relaxed">
                Measures round-trip time to our servers using multiple requests
                and calculates median latency for accuracy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-3 text-lg">
                Download Test
              </h4>
              <p className="leading-relaxed">
                Downloads a 10MB file and measures the time to calculate your
                download speed in real-time with streaming.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📤</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-3 text-lg">
                Upload Test
              </h4>
              <p className="leading-relaxed">
                Uploads a 5MB file to measure your upload speed and connection
                stability for comprehensive testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
