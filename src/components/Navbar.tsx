import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">課程輔助學習系統</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/courses"
              className="text-foreground hover:text-foreground/90 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Courses
            </Link>
            <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
              <span className="text-sm text-foreground">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

