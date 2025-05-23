
'use client';

import CallHistory, { type AnalysisResult } from '@/components/call-history';
import CallScreen from '@/components/call-screen';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { useState } from 'react';
import Link from 'next/link';
import { Headphones, ListChecks, Newspaper, CalendarDays, Mic, HomeIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function CallAnalysisOriginalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedMenu, setSelectedMenu] = useState('통화 녹음 분석'); // Default to "통화 녹음 분석"

  const addAnalysisResult = (result: AnalysisResult) => {
    setAnalysisResults((prevResults) => [result, ...prevResults]); // Add to the beginning of the array
  };

   const updateAnalysisResultAction = (id: string, action: 'Connected' | 'Blocked') => {
    setAnalysisResults((prevResults) =>
      prevResults.map((result) =>
        result.id === id ? { ...result, action } : result
      )
    );
  };

  const menuItems = [
    { name: '세나 홈', icon: <HomeIcon />, href: '/' },
    { name: '통화 녹음 분석', icon: <Headphones /> },
    { name: '실시간 통화 분석', icon: <Mic />, href: '/real-time-analysis' },
    { name: '오늘의 일정', icon: <ListChecks /> },
    { name: '추천 뉴스', icon: <Newspaper /> },
    { name: '소비 패턴', icon: <ListChecks /> },
    { name: '자산 현황', icon: <CalendarDays /> },
  ];


  return (
    <div className="flex flex-1 w-full bg-background relative">
      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Sidebar collapsible className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out md:relative md:flex`}>
        <SidebarHeader>
            <div className="flex items-center justify-between">
                 <h2 className="font-semibold text-lg px-2">메뉴</h2>
                 {/* Close button for mobile sidebar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close Menu"
                  >
                    X {/* Replace with a proper close icon if available */}
                  </Button>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                 <Button
                    variant={selectedMenu === item.name ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                        if (item.href) {
                            // Using window.location.href for simplicity in this example
                            window.location.href = item.href;
                        } else {
                            setSelectedMenu(item.name)
                        }
                    }}
                    asChild={!!item.href}
                  >
                  {item.href ? (
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <>
                      {item.icon}
                      <span>{item.name}</span>
                    </>
                  )}
                </Button>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className={`flex-1 p-6 space-y-6 overflow-auto transition-all duration-200 ease-in-out ${isSidebarOpen ? 'md:ml-[240px]' : ''} md:ml-[240px]`}>
         <h1 className="text-3xl font-bold text-foreground mb-6">통화 녹음 파일 분석</h1>
        <CallScreen addAnalysisResult={addAnalysisResult} />
        <CallHistory
            analysisResults={analysisResults}
            updateResultAction={updateAnalysisResultAction}
         />
      </main>
    </div>
  );
}
