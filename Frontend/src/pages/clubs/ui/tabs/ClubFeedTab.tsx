import { Heart, MessageCircle, MoreHorizontal, Image, Paperclip, Send } from "lucide-react";
import { useAuthStore } from "@shared/store/auth-store";

const pinnedPost = {
  id: "p1",
  title: "Upcoming Hackathon",
  author: "Admin",
  time: "2 hours ago",
  badge: "Announcement",
  body: "Get ready for the annual 'Code the Future' Hackathon! This year we're focusing on Sustainable Tech. Prize pool of $5,000 and internship opportunities with our sponsors. Registration opens next Monday.",
  likes: 48,
  comments: 12,
};

const posts = [
  {
    id: "p2",
    author: "Alex Chen",
    role: "Moderator",
    time: "5 hours ago",
    badge: "Poll",
    body: "Next Workshop Topic?",
    type: "poll" as const,
    poll: [
      { option: "Web Development", percentage: 65 },
      { option: "AI & Machine Learning", percentage: 25 },
      { option: "Cloud Computing", percentage: 10 },
    ],
    votes: 112,
    comments: 8,
  },
  {
    id: "p3",
    author: "Sarah Williams",
    role: "Member",
    time: "8 hours ago",
    badge: null,
    body: "Finally finished my first Rust project! The memory management concepts are tough but so rewarding once you get them. Here's a snippet of the CLI tool I'm building.",
    type: "text" as const,
    likes: 32,
    comments: 5,
  },
];

export function ClubFeedTab() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-[700px] mx-auto space-y-4">
      {/* Create post */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center shrink-0 text-sm font-medium">
          {user?.name?.charAt(0) ?? "U"}
        </div>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-neutral-50 border-none rounded-lg px-3 py-2 text-sm outline-none"
        />
        <div className="flex items-center gap-1">
          <button className="p-2 text-neutral-400 hover:bg-neutral-100 rounded-full transition-all">
            <Image className="h-5 w-5" />
          </button>
          <button className="p-2 text-neutral-400 hover:bg-neutral-100 rounded-full transition-all">
            <Paperclip className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Pinned */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-2">
          <span className="text-neutral-400 text-xs">📌</span>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Pinned Posts
          </h3>
        </div>

        <article className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-sm">
                ⭐
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black">{pinnedPost.title}</h4>
                <p className="text-xs text-neutral-500">
                  {pinnedPost.author} &bull; {pinnedPost.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                {pinnedPost.badge}
              </span>
              <button className="text-neutral-400 hover:text-black">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-neutral-700">{pinnedPost.body}</p>
          <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
            <button className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-[13px]">{pinnedPost.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-[13px]">{pinnedPost.comments}</span>
            </button>
          </div>
        </article>
      </div>

      {/* Main feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-black">{post.author}</h4>
                  <p className="text-xs text-neutral-500">
                    {post.role} &bull; {post.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {post.badge && (
                  <span className="border border-neutral-200 text-neutral-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    {post.badge}
                  </span>
                )}
                <button className="text-neutral-400 hover:text-black">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {post.type === "poll" ? (
              <>
                <p className="text-sm font-medium text-black">{post.body}</p>
                <div className="space-y-2">
                  {post.poll.map((option) => (
                    <button
                      key={option.option}
                      className="w-full relative h-11 border border-neutral-200 rounded-lg overflow-hidden flex items-center px-3 hover:border-black transition-all"
                    >
                      <div
                        className="absolute inset-0 bg-black/5"
                        style={{ width: `${option.percentage}%` }}
                      />
                      <span className="relative z-10 text-sm font-medium flex-1 text-left">
                        {option.option}
                      </span>
                      <span className="relative z-10 text-xs text-neutral-500">
                        {option.percentage}%
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
                  <span className="text-[13px] text-neutral-500">
                    🗳 {post.votes} Votes
                  </span>
                  <button className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-[13px]">{post.comments}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-neutral-700">{post.body}</p>
                <div className="rounded-lg overflow-hidden border border-neutral-200 h-48 bg-neutral-100 flex items-center justify-center text-neutral-300 text-sm">
                  Image attachment
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-1 text-black font-medium transition-colors">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-[13px]">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-[13px]">{post.comments}</span>
                  </button>
                </div>

                {/* Comment input */}
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs shrink-0">
                    {user?.name?.charAt(0) ?? "U"}
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
