
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Landmark, ArrowLeft, Construction } from 'lucide-react';

export default function AssetsPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 space-y-8 text-foreground bg-background">
      <div className="w-full max-w-2xl text-center">
        <Landmark className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
          자산 현황
        </h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8">
          연동된 금융 계좌의 자산 현황을 한눈에 파악하고, AI 기반 자산 관리 조언을 받아보세요.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Construction className="mr-2 h-6 w-6 text-amber-500" />
            개발 중인 기능
          </CardTitle>
          <CardDescription>
            여러분의 자산을 더욱 스마트하게 관리할 수 있도록 자산 현황 연동 및 분석 기능을 개발하고 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            안전하고 효율적인 자산 관리를 경험해보세요.
          </p>
          <img data-ai-hint="financial graph" src="https://placehold.co/600x300.png?text=Assets+Feature+Coming+Soon" alt="자산 관리 기능 개발 중" className="rounded-lg mx-auto shadow-md" />
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
