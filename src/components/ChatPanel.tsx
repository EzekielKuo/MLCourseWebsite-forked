"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  videoTimestamp?: string;
}

interface ChatPanelProps {
  courseId: string;
  currentVideoTime: number;
}

export default function ChatPanel({ courseId, currentVideoTime }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好！我是 AI 助教，有什麼問題都可以問我。",
      timestamp: new Date().toLocaleTimeString("zh-TW"),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const insertTimestamp = () => {
    const timestamp = `[${formatTime(currentVideoTime)}] `;
    setInput((prev) => timestamp + prev);
  };

  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("梯度") || lowerMessage.includes("gradient")) {
      return "梯度下降是一種優化演算法，用於尋找函數的最小值。它通過計算損失函數對參數的梯度，然後沿著梯度的反方向更新參數。";
    }
    if (lowerMessage.includes("神經網路") || lowerMessage.includes("neural")) {
      return "神經網路是由多個層級組成的計算模型，每一層包含多個神經元。通過前向傳播和反向傳播，神經網路可以學習複雜的模式。";
    }
    if (lowerMessage.includes("過擬合") || lowerMessage.includes("overfitting")) {
      return "過擬合是指模型在訓練資料上表現很好，但在測試資料上表現較差的現象。可以通過正則化、dropout、增加資料量等方法來緩解。";
    }
    if (lowerMessage.includes("損失函數") || lowerMessage.includes("loss")) {
      return "損失函數用來衡量模型預測值與真實值之間的差異。常見的損失函數包括均方誤差（MSE）和交叉熵（Cross-Entropy）。";
    }
    return "這是一個很好的問題！根據您提到的內容，我建議您可以參考課程教材中的相關章節，或者查看相關的補充資料。如果還有其他問題，歡迎繼續提問！";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const videoTimestamp = input.match(/\[(\d{2}:\d{2})\]/)?.[1];
    const cleanContent = input.replace(/\[\d{2}:\d{2}\]\s*/, "");

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("zh-TW"),
      videoTimestamp: videoTimestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Mock response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(cleanContent),
        timestamp: new Date().toLocaleTimeString("zh-TW"),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, Math.random() * 600 + 600); // 600-1200ms
  };

  return (
    <div className="flex flex-col h-full bg-white border border-transparent rounded-lg overflow-hidden">
      <div className="border-b px-4 py-3 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">AI 助教</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" ? (
              <div className="max-w-[80%]">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.videoTimestamp && (
                  <div className="mt-2">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {message.videoTimestamp}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-[80%] rounded-lg p-3 bg-blue-500 text-white">
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.videoTimestamp && (
                  <div className="mt-2">
                    <span className="text-xs px-1.5 py-0.5 bg-white/20 rounded">
                      {message.videoTimestamp}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 pb-4 flex-shrink-0">
        <div className="border border-gray-200 rounded-md p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={insertTimestamp}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              插入時間戳
            </button>
            <span className="text-xs text-gray-500">
              目前時間: {formatTime(currentVideoTime)}
            </span>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="輸入問題..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

