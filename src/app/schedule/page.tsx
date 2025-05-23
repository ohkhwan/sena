
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, ArrowLeft, Construction } from 'lucide-react';

export default function SchedulePage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <CalendarDays className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          일정 관리
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          오늘의 주요 일정을 확인하고, 다가오는 이벤트를 미리 준비하세요. AI가 중요한 일정을 놓치지 않도록 도와드립니다.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            스마트한 일정 관리 기능이 곧 제공될 예정입니다. AI 기반 일정 추천 및 리마인더 기능을 기대해주세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            여러분의 시간을 더욱 효율적으로 만들어 드릴 기능을 준비 중입니다.
          </p>
          <img data-ai-hint="calendar planner" src="https://placehold.co/600x300.png?text=Schedule+Feature+Coming+Soon" alt="일정 관리 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          대시보드로 돌아가기
        </Link>
      </Button>
    </main>
  );
}
