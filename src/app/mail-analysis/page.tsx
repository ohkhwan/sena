
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ArrowLeft, Construction } from 'lucide-react';

export default function MailAnalysisPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          메일 분석
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          수신된 메일을 분석하여 중요한 내용을 요약하고 스팸 및 피싱 위험을 감지합니다.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            메일 분석 기능은 현재 열심히 개발 중에 있습니다. 곧 더욱 강력하고 편리한 기능으로 찾아뵙겠습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            조금만 기다려주시면 감사하겠습니다!
          </p>
          <img data-ai-hint="under construction" src="https://placehold.co/600x300.png?text=Mail+Analysis+Feature+Coming+Soon" alt="메일 분석 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
