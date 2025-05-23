
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Construction } from 'lucide-react';

export default function FortunePage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          오늘의 운세
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          AI가 분석해주는 오늘의 운세를 확인하고 하루를 계획해보세요.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            흥미로운 AI 기반 운세 서비스가 곧 여러분을 찾아갑니다. 기대해주세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            오늘 하루, 어떤 즐거운 일이 생길까요?
          </p>
          <img data-ai-hint="fortune telling crystal ball" src="https://placehold.co/600x300.png?text=Fortune+Telling+Coming+Soon" alt="운세 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
