import { useState, useCallback } from "react";

interface SpeedTestResults {
  ping: number | null;
  download: number | null;
  upload: number | null;
}

interface SpeedTestState {
  isRunning: boolean;
  currentTest: "ping" | "download" | "upload" | null;
  progress: number;
  results: SpeedTestResults;
}

export const useSpeedTest = () => {
  const [state, setState] = useState<SpeedTestState>({
    isRunning: false,
    currentTest: null,
    progress: 0,
    results: {
      ping: null,
      download: null,
      upload: null,
    },
  });

  const measurePing = useCallback(async (): Promise<number> => {
    const pings: number[] = [];
    const iterations = 5;

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      try {
        const response = await fetch("/api/ping");
        if (!response.ok) throw new Error("Ping failed");
        const end = performance.now();
        pings.push(end - start);
      } catch (error) {
        console.error("Ping error:", error);
      }

      // Small delay between pings
      if (i < iterations - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Calculate median ping
    pings.sort((a, b) => a - b);
    const medianIndex = Math.floor(pings.length / 2);
    return pings[medianIndex];
  }, []);

  const measureDownload = useCallback(async (): Promise<number> => {
    const startTime = performance.now();
    let bytesReceived = 0;
    const totalBytes = 10 * 1024 * 1024; // 10MB

    try {
      const response = await fetch("/api/download");
      if (!response.ok) throw new Error("Download failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        bytesReceived += value.length;
        const progress = (bytesReceived / totalBytes) * 100;

        setState((prev) => ({
          ...prev,
          progress: Math.min(progress, 100),
        }));
      }

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const mbps = (bytesReceived * 8) / durationSeconds / 1_000_000;

      return mbps;
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    }
  }, []);

  const measureUpload = useCallback(async (): Promise<number> => {
    const startTime = performance.now();
    const uploadSize = 5 * 1024 * 1024; // 5MB

    // Create a buffer with predictable data
    const buffer = new ArrayBuffer(uploadSize);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < uploadSize; i++) {
      view[i] = i % 256;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: buffer,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) throw new Error("Upload failed");

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const mbps = (uploadSize * 8) / durationSeconds / 1_000_000;

      return mbps;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }, []);

  const runSpeedTest = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      currentTest: "ping",
      progress: 0,
      results: { ping: null, download: null, upload: null },
    }));

    try {
      // Test 1: Ping
      setState((prev) => ({ ...prev, currentTest: "ping" }));
      const ping = await measurePing();

      setState((prev) => ({
        ...prev,
        results: { ...prev.results, ping },
        currentTest: "download",
        progress: 0,
      }));

      // Test 2: Download
      const download = await measureDownload();

      setState((prev) => ({
        ...prev,
        results: { ...prev.results, download },
        currentTest: "upload",
        progress: 0,
      }));

      // Test 3: Upload
      const upload = await measureUpload();

      setState((prev) => ({
        ...prev,
        results: { ...prev.results, upload },
        currentTest: null,
        progress: 100,
      }));
    } catch (error) {
      console.error("Speed test failed:", error);
    } finally {
      setState((prev) => ({
        ...prev,
        isRunning: false,
        currentTest: null,
      }));
    }
  }, [measurePing, measureDownload, measureUpload]);

  const resetTest = useCallback(() => {
    setState({
      isRunning: false,
      currentTest: null,
      progress: 0,
      results: { ping: null, download: null, upload: null },
    });
  }, []);

  return {
    ...state,
    runSpeedTest,
    resetTest,
  };
};
