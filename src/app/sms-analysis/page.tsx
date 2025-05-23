
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, ArrowLeft, Construction } from 'lucide-react';

export default function SmsAnalysisPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          문자 분석
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          수신된 SMS 및 MMS 메시지를 분석하여 스미싱 위험을 감지하고 중요한 정보를 추출합니다.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            문자 분석 기능은 현재 열심히 개발 중에 있습니다. 스미싱 방지 및 유용한 정보 요약 기능을 기대해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            더욱 안전하고 편리한 문자 생활을 위해 노력하고 있습니다!
          </p>
          <img data-ai-hint="text message" src="https://placehold.co/600x300.png?text=SMS+Analysis+Feature+Coming+Soon" alt="문자 분석 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
