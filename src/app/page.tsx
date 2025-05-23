
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Phone,
  Mic,
  Mail,
  MessageSquare,
  CalendarDays,
  Newspaper,
  Landmark,
  CreditCard,
  Sparkles,
  Users,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  List,
  ArrowLeft,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Placeholder data
const quantifiedData = {
  call: { normal: 120, spam: 15, phishing: 5, total: 140 },
  mail: { normal: 350, spam: 50, phishing: 12, total: 412 },
  sms: { normal: 80, spam: 25, phishing: 8, total: 113 },
};

const topContactsData = [
  { name: '아내', value: 150, type: '통화' },
  { name: '부모님', value: 120, type: '문자' },
  { name: '김철수 팀장', value: 90, type: '메일' },
  { name: '친구A', value: 75, type: '통화' },
  { name: '거래처B', value: 60, type: '메일' },
];

const topContentTypesData = [
  { name: '안부인사', value: 200 },
  { name: '업무요청', value: 150 },
  { name: '일정협의', value: 100 },
  { name: '광고/스팸', value: 80 },
  { name: '정보문의', value: 50 },
];

const dailyUsageData = [
  { date: '07-01', calls: 30, mails: 50, sms: 20 },
  { date: '07-02', calls: 45, mails: 60, sms: 25 },
  { date: '07-03', calls: 20, mails: 40, sms: 15 },
  { date: '07-04', calls: 60, mails: 70, sms: 30 },
  { date: '07-05', calls: 35, mails: 55, sms: 22 },
  { date: '07-06', calls: 50, mails: 65, sms: 28 },
  { date: '07-07', calls: 40, mails: 50, sms: 18 },
];

const iconGridFeatures = [
  { name: '통화 분석', icon: <Phone className="h-8 w-8" />, href: '/call-analysis-original', description: '녹음된 통화 파일을 분석합니다.' },
  { name: '실시간 통화분석', icon: <Mic className="h-8 w-8" />, href: '/real-time-analysis', description: '진행중인 통화를 실시간으로 분석합니다.' },
  { name: '메일 분석', icon: <Mail className="h-8 w-8" />, href: '/mail-analysis', description: '수신된 메일을 분석합니다.' },
  { name: '문자 분석', icon: <MessageSquare className="h-8 w-8" />, href: '/sms-analysis', description: '수신된 문자를 분석합니다.' },
  { name: '일정', icon: <CalendarDays className="h-8 w-8" />, href: '/schedule', description: '오늘의 주요 일정을 확인합니다.' },
  { name: '뉴스', icon: <Newspaper className="h-8 w-8" />, href: '/news', description: '관심 분야의 최신 뉴스를 제공합니다.' },
  { name: '자산', icon: <Landmark className="h-8 w-8" />, href: '/assets', description: '연동된 자산 현황을 보여줍니다.' },
  { name: '소비', icon: <CreditCard className="h-8 w-8" />, href: '/spending', description: '최근 소비 패턴을 분석합니다.' },
  { name: '운세', icon: <Sparkles className="h-8 w-8" />, href: '/fortune', description: '오늘의 운세를 확인합니다.' },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, href, className }) => {
  const cardContent = (
    <>
      <CardHeader className="flex flex-col items-center justify-center text-center p-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
          {icon}
        </div>
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1">{description}</CardDescription>
      </CardHeader>
    </>
  );

  const cardClasses = `hover:shadow-primary/30 dark:hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col justify-between shadow-md dark:shadow-slate-700/50 hover:scale-[1.02] ${className}`;

  if (href) {
    return (
      <Link href={href} passHref className="flex">
        <Card className={cardClasses}>
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cardClasses}>
      {cardContent}
    </Card>
  );
};


export default function DashboardPage() {
  return (
    <main className="flex-1 w-full p-4 md:p-8 lg:p-10 space-y-8 overflow-auto text-foreground bg-background">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-sky-500 mb-2">
          SENA AI 대시보드
        </h1>
        <p className="text-md md:text-lg text-muted-foreground">
          나만의 AI 비서가 제공하는 분석 및 편의 기능을 확인하세요.
        </p>
      </div>

      {/* Icon Grid Section */}
      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">
          {iconGridFeatures.map((feature) => (
            <FeatureCard
              key={feature.name}
              title={feature.name}
              icon={feature.icon}
              href={feature.href}
              description={feature.description}
              className="bg-card/70 backdrop-blur-sm"
            />
          ))}
        </div>
      </section>

      {/* Quantified Data Section */}
      <section className="mb-10">
        <Card className="shadow-xl bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BarChart3 className="mr-3 h-7 w-7 text-primary" /> 통계 요약
            </CardTitle>
            <CardDescription>통화, 메일, 문자 분석 현황입니다.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            {(['call', 'mail', 'sms'] as const).map((type) => {
              const data = quantifiedData[type];
              const title = type === 'call' ? '통화' : type === 'mail' ? '메일' : '문자';
              const icon = type === 'call' ? <Phone className="h-5 w-5"/> : type === 'mail' ? <Mail className="h-5 w-5"/> : <MessageSquare className="h-5 w-5"/>;
              return (
                <Card key={type} className="bg-card/80 dark:bg-slate-800/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center font-semibold">
                        <span className="p-2.5 rounded-full bg-primary/10 text-primary mr-3">{icon}</span>
                        {title} 분석 ({data.total}건)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5 text-sm pl-6 pr-4 pb-4">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="flex items-center text-green-500 dark:text-green-400"><CheckCircle2 className="mr-2 h-4 w-4" />정상:</span>
                      <span className="font-medium">{data.normal}건</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="flex items-center text-yellow-500 dark:text-yellow-400"><AlertTriangle className="mr-2 h-4 w-4" />스팸:</span>
                      <span className="font-medium">{data.spam}건</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="flex items-center text-red-500 dark:text-red-400"><AlertTriangle className="mr-2 h-4 w-4" />피싱 의심:</span>
                      <span className="font-medium">{data.phishing}건</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </section>

      {/* Graph Data Section */}
      <section className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-card/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center font-semibold">
                <Users className="mr-3 h-6 w-6 text-primary" /> 주요 연락처 (Top 5)
            </CardTitle>
            <CardDescription>최근 연락 빈도가 높은 상위 5개 연락처입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {topContactsData.map((contact, index) => (
                <li key={index} className="flex justify-between items-center text-sm p-2.5 rounded-lg hover:bg-muted/60 transition-colors">
                  <span className="font-medium">{index + 1}. {contact.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted/80 px-2 py-0.5 rounded-full">{contact.type} {contact.value}건</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-card/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center font-semibold">
                <List className="mr-3 h-6 w-6 text-primary" /> 주요 내용 유형 (Top 5)
            </CardTitle>
            <CardDescription>자주 분석된 상위 5개 내용 유형입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {topContentTypesData.map((content, index) => (
                <li key={index} className="flex justify-between items-center text-sm p-2.5 rounded-lg hover:bg-muted/60 transition-colors">
                  <span className="font-medium">{index + 1}. {content.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted/80 px-2 py-0.5 rounded-full">{content.value}건</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 bg-card/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center font-semibold">
                <TrendingUp className="mr-3 h-6 w-6 text-primary" /> 일별 사용량 추이
            </CardTitle>
            <CardDescription>최근 7일간 통화, 메일, 문자 사용량입니다.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[280px] p-2 pr-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyUsageData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={5} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 12px hsl(var(--shadow)/0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 'bold' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend wrapperStyle={{fontSize: "13px", paddingTop: "10px"}} />
                <Line type="monotone" dataKey="calls" name="통화" stroke="hsl(var(--chart-1))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--chart-1))', strokeWidth:0 }} activeDot={{ r: 7, strokeWidth:1, stroke: 'hsl(var(--background))' }} />
                <Line type="monotone" dataKey="mails" name="메일" stroke="hsl(var(--chart-2))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--chart-2))', strokeWidth:0 }} activeDot={{ r: 7, strokeWidth:1, stroke: 'hsl(var(--background))' }}/>
                <Line type="monotone" dataKey="sms" name="문자" stroke="hsl(var(--chart-3))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--chart-3))', strokeWidth:0 }} activeDot={{ r: 7, strokeWidth:1, stroke: 'hsl(var(--background))' }}/>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
    
