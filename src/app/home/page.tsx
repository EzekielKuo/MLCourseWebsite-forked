import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center bg-background">
          <h1 className="text-4xl font-bold bg-background text-foreground sm:text-5xl md:text-6xl mb-6">
            課程輔助學習系統
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            架設類似 NTU Cool 的課程網站，會同步上傳老師的 ML 2026 課程錄影
          </p>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-accent text-background font-semibold rounded-2xl transition shadow-sm"
          >
            進入課程列表
          </Link>
        </div>
      </main>
    </div>
  );
}
