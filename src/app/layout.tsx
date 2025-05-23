import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {Button} from '@/components/ui/button';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '세나 - 나만의 AI비서 ',
  description: 'AI 기반 통화분석 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased gradient-bg`}>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header removed to match new UI */}
            {/* Original Header for reference:
            <header className="p-4 border-b bg-background shadow-sm sticky top-0 z-50">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90">
                  SenaGuard
                </Link>
                <div className="space-x-2">
                  <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                    <Link href="/">통화 녹음 분석</Link>
                  </Button>
                  <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                    <Link href="/real-time-analysis">실시간 통화 분석</Link>
                  </Button>
                </div>
              </nav>
            </header>
            */}
            <div className="flex-1 flex"> {/* Allows children to define their own flex layouts */}
              {children}
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
