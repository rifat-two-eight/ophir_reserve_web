"use client";

import { useState } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const conversations = [
  {
    id: 1,
    name: "Julianna Sterling",
    initials: "JS",
    lastMessage: "Thank you for the quote! We'll review it and get back to you soon.",
    time: "2h ago",
    unread: true,
    status: "Online",
  },
  {
    id: 2,
    name: "Arthur Montgomery",
    initials: "AM",
    lastMessage: "Is the venue available on November 2nd?",
    time: "5h ago",
    unread: false,
    status: "Away",
  },
  {
    id: 3,
    name: "Elena Costas",
    initials: "EC",
    lastMessage: "We're excited about the Coastal Farewell Ceremony!",
    time: "Yesterday",
    unread: false,
    status: "Offline",
  },
  {
    id: 4,
    name: "Marcus Thorne",
    initials: "MT",
    lastMessage: "Can we schedule a site visit for next Tuesday?",
    time: "2 days ago",
    unread: false,
    status: "Offline",
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "Julianna Sterling",
    text: "Hi there! I'm interested in the Enchanted Garden Gala package.",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    text: "Hello Julianna! We'd be happy to help. What date are you considering?",
    time: "10:35 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Julianna Sterling",
    text: "We are looking at October 18th, 2024. Would that work?",
    time: "10:40 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    text: "Yes, that date is currently available. I can send over a detailed quote for 120 guests.",
    time: "10:45 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Julianna Sterling",
    text: "Thank you for the quote! We'll review it and get back to you soon.",
    time: "11:00 AM",
    isMe: false,
  },
];

// ─── Messages Page ───────────────────────────────────────────────────────────
export default function VendorMessagesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const selectedChat = conversations.find((c) => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-160px)] flex bg-[#111111] border border-white/5 rounded-sm overflow-hidden">
      {/* ── Left Sidebar: Conversations ── */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-[#141414]">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-serif font-semibold text-[#F2CA50]">Messages</h2>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-sm py-2 px-3 text-xs text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-[#F2CA50]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              className={`w-full p-5 flex gap-4 transition-all duration-200 border-l-2 ${
                selectedId === chat.id
                  ? "bg-[#F2CA50]/5 border-[#F2CA50]"
                  : "border-transparent hover:bg-white/2"
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="h-11 w-11 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center text-[#F2CA50] font-sans font-semibold text-sm">
                  {chat.initials}
                </div>
                <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#141414] ${
                  chat.status === "Online" ? "bg-green-500" : chat.status === "Away" ? "bg-amber-500" : "bg-stone-600"
                }`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <p className={`text-sm font-sans font-semibold truncate ${selectedId === chat.id ? "text-[#F2CA50]" : "text-stone-200"}`}>
                    {chat.name}
                  </p>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className={`text-xs font-sans line-clamp-1 ${chat.unread ? "text-stone-300 font-medium" : "text-stone-500"}`}>
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread && (
                <div className="h-2 w-2 rounded-full bg-[#F2CA50] self-center" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right Column: Chat Area ── */}
      <div className="flex-1 flex flex-col bg-[#0D0D0D]">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-[#111111]">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center text-[#F2CA50] font-sans font-semibold text-xs">
                  {selectedChat.initials}
                </div>
                <div>
                  <h3 className="text-sm font-sans font-semibold text-stone-100">{selectedChat.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      selectedChat.status === "Online" ? "bg-green-500" : selectedChat.status === "Away" ? "bg-amber-500" : "bg-stone-600"
                    }`} />
                    {selectedChat.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-stone-400 hover:text-[#F2CA50] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 text-stone-400 hover:text-[#F2CA50] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="flex justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600 bg-white/5 px-3 py-1 rounded-full font-sans">October 18, 2024</span>
              </div>
              
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    <div
                      className={`px-5 py-3.5 rounded-sm text-sm font-sans leading-relaxed ${
                        msg.isMe
                          ? "bg-[#F2CA50] text-[#0D0D0D] font-medium shadow-[0_4px_20px_rgba(242,202,80,0.15)]"
                          : "bg-[#161616] text-stone-200 border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-600 font-sans px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#111111] border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewMessage("");
                }}
                className="flex items-end gap-4"
              >
                <div className="flex-1 relative">
                  <textarea
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-sm py-4 px-5 pr-12 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#F2CA50]/30 transition-all resize-none min-h-[56px] max-h-32"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        setNewMessage("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`h-14 w-14 rounded-sm flex items-center justify-center transition-all duration-300 ${
                    newMessage.trim()
                      ? "bg-[#F2CA50] text-[#0D0D0D] shadow-[0_4px_20px_rgba(242,202,80,0.2)]"
                      : "bg-white/5 text-stone-600 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-stone-700 mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-medium text-stone-300 mb-2">Select a Conversation</h3>
            <p className="text-sm text-stone-500 max-w-xs mx-auto">Choose a conversation from the left to start messaging with your clients.</p>
          </div>
        )}
      </div>
    </div>
  );
}
