"use client";

import { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(`${BACKEND_URL}/ask`, { question });
      setResponse(res.data.answer || "No response received.");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to get a response. Try again!");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && question.trim()) {
      askQuestion();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">

      <h1 className="text-3xl font-bold mb-6">Admission Chatbot</h1>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="text"
          id="query-field"
          className="w-full p-3 text-black rounded-md"
          placeholder="How may I help you?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={askQuestion}
          className="w-full mt-4 bg-[rgba(2,72,88,0.6)] hover:bg-[rgba(2,90,110,0.8)] active:scale-95 text-white py-2 px-4 rounded-md transition-transform"
          disabled={loading}
        >
          {loading ? "Retrieving Info..." : "Ask"}
        </button>
      </div>

      {response && (
        <div
          className="mt-6 p-4 bg-gray-700 rounded-lg w-full max-w-2xl max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 break-words"
        >
          <div className="mt-2 text-white"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(response)) }}
          />
        </div>
      )}

      <footer className="absolute bottom-4 w-full flex justify-center">
        <p className="text-gray-400">
          Developed with ❤️ by{" "}
          <a
            href="https://github.com/RawAtCode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            RawAtCode
          </a>
        </p>
      </footer>
    </div>
  );
}
