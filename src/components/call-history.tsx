
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from 'date-fns'; // For formatting timestamps
import { AlertCircle, CheckCircle, PhoneForwarded, PhoneOff, ShieldAlert, ShieldCheck } from "lucide-react"; // Import icons

export interface AnalysisResult {
  id: string;
  fileName: string;
  phoneNumber: string; // Extracted or filename
  analysisTimestamp: string; // ISO string date
  transcribedText: string;
  spamProbability: number | null;
  spamReason: string;
  summary: string;
  action: 'Analyzed' | 'Connected' | 'Blocked' | 'Error';
}

interface CallHistoryProps {
    analysisResults: AnalysisResult[];
    updateResultAction: (id: string, action: 'Connected' | 'Blocked') => void;
}


const CallHistory = ({ analysisResults, updateResultAction }: CallHistoryProps) => {

   const getSpamBadgeVariant = (probability: number | null): "default" | "secondary" | "destructive" | "outline" => {
    if (probability === null) return "secondary";
    if (probability > 0.8) return "destructive";
    if (probability > 0.5) return "default"; // Use default (primary) for medium probability
    return "secondary"; // Use secondary for low probability
  };

  const getActionBadgeVariant = (action: AnalysisResult['action']): "default" | "secondary" | "destructive" | "outline" => {
    switch (action) {
      case 'Connected': return "secondary"; // Greenish/Success style if customized
      case 'Blocked': return "destructive";
      case 'Error': return "outline"; // Or destructive
      case 'Analyzed':
      default: return "default"; // Blue/Info style
    }
  };

   const getActionIcon = (action: AnalysisResult['action']) => {
    switch (action) {
      case 'Connected': return <PhoneForwarded className="h-4 w-4 mr-1 text-green-600" />;
      case 'Blocked': return <PhoneOff className="h-4 w-4 mr-1 text-red-600" />;
      case 'Error': return <AlertCircle className="h-4 w-4 mr-1 text-yellow-600" />;
      case 'Analyzed':
      default: return null; // Or a default icon like CheckCircle
    }
   };


  return (
    <Card className="shadow-lg mt-6">
      <CardHeader>
        <CardTitle>통화 분석 기록</CardTitle>
        <CardDescription>
          분석된 모든 통화, AI 평가 및 사용자 조치 로그입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full"> {/* Adjust height as needed */}
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>파일 이름</TableHead>
                  <TableHead>전화 번호</TableHead>
                  <TableHead>분석 시간</TableHead>
                  <TableHead className="text-center">스팸 확률</TableHead>
                   <TableHead>요약</TableHead>
                   <TableHead>조치</TableHead>
                   <TableHead className="text-right">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisResults.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      분석 기록이 없습니다. 파일을 로드하고 분석하세요.
                    </TableCell>
                  </TableRow>
                )}
                {analysisResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.fileName}</TableCell>
                    <TableCell>{result.phoneNumber}</TableCell>
                    <TableCell>{format(new Date(result.analysisTimestamp), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                    <TableCell className="text-center">
                       {result.spamProbability !== null ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant={getSpamBadgeVariant(result.spamProbability)}>
                                 {result.spamProbability > 0.8 ? <ShieldAlert className="h-3 w-3 mr-1"/> : result.spamProbability > 0.5 ? <ShieldCheck className="h-3 w-3 mr-1" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                                 {`${(result.spamProbability * 100).toFixed(0)}%`}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs max-w-xs">{result.spamReason || '이유 분석 없음'}</p>
                            </TooltipContent>
                        </Tooltip>

                      ) : (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                    </TableCell>
                     <TableCell className="max-w-xs truncate">
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <span>{result.summary || '요약 없음'}</span>
                         </TooltipTrigger>
                         <TooltipContent side="top" align="start">
                           <p className="text-sm max-w-md">{result.summary || '요약 없음'}</p>
                           <p className="text-xs text-muted-foreground mt-2">---</p>
                           <p className="text-xs text-muted-foreground">전사 내용:</p>
                            <p className="text-xs max-w-md">{result.transcribedText}</p>
                         </TooltipContent>
                       </Tooltip>
                     </TableCell>
                     <TableCell>
                       <Badge variant={getActionBadgeVariant(result.action)}>
                         {getActionIcon(result.action)}
                         {result.action === 'Analyzed' ? '분석됨' : result.action === 'Connected' ? '연결됨' : result.action === 'Blocked' ? '차단됨' : '오류'}
                       </Badge>
                     </TableCell>
                     <TableCell className="text-right">
                       {result.action !== 'Error' && (
                           <div className="flex gap-1 justify-end">
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => updateResultAction(result.id, 'Connected')}
                               disabled={result.action === 'Connected'}
                               className="text-green-600 hover:text-green-700 hover:bg-green-100 disabled:text-muted-foreground"
                             >
                               <PhoneForwarded className="h-4 w-4 mr-1"/> 연결
                             </Button>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => updateResultAction(result.id, 'Blocked')}
                               disabled={result.action === 'Blocked'}
                               className="text-red-600 hover:text-red-700 hover:bg-red-100 disabled:text-muted-foreground"
                             >
                                <PhoneOff className="h-4 w-4 mr-1"/> 차단
                             </Button>
                           </div>
                       )}
                     </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CallHistory;
