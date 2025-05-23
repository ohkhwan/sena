
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, ArrowLeft, Construction } from 'lucide-react';

export default function NewsPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <Newspaper className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          맞춤 뉴스
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          관심사에 맞는 최신 뉴스를 AI가 선별하여 제공합니다. 중요한 정보를 놓치지 마세요.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            AI 기반 맞춤 뉴스 추천 기능이 준비 중입니다. 사용자에게 꼭 필요한 정보만 모아 보여드릴 예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            세상의 모든 소식을 스마트하게 접할 수 있도록 만들겠습니다.
          </p>
          <img data-ai-hint="newspaper article" src="https://placehold.co/600x300.png?text=News+Feature+Coming+Soon" alt="뉴스 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
