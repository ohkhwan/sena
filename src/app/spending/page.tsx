
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreditCard, ArrowLeft, Construction } from 'lucide-react';

export default function SpendingPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <CreditCard className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          소비 패턴 분석
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          카드 사용 내역 및 지출을 분석하여 소비 패턴을 파악하고, AI가 절약 팁을 제공합니다.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            AI 기반 소비 패턴 분석 및 맞춤형 절약 조언 기능이 곧 추가될 예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            현명한 소비 생활을 위한 도우미가 되겠습니다.
          </p>
          <img data-ai-hint="pie chart spending" src="https://placehold.co/600x300.png?text=Spending+Analysis+Coming+Soon" alt="소비 패턴 분석 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
