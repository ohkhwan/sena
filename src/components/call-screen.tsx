
'use client';

import { detectSpamProbability } from '@/ai/flows/detect-spam-probability';
import { summarizeCallReason } from '@/ai/flows/summarize-call-reason';
import { transcribeAudio } from '@/ai/flows/transcribe-audio-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { useState, type ChangeEvent } from 'react';
import type { AnalysisResult } from './call-history'; // Import AnalysisResult type

interface CallScreenProps {
  addAnalysisResult: (result: AnalysisResult) => void;
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);


const CallScreen = ({ addAnalysisResult }: CallScreenProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    setProgress(0);
    setCurrentFileIndex(0);
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyzeFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: '오류',
        description: '분석할 오디오 파일을 하나 이상 선택하세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    const totalFiles = selectedFiles.length;

    for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        setCurrentFileIndex(i + 1);
        const currentProgressStart = (i / totalFiles) * 100;
        const currentProgressEnd = ((i + 1) / totalFiles) * 100;

        toast({ title: `${i + 1}/${totalFiles} 파일 분석 중: ${file.name}` });
        setProgress(currentProgressStart + 5); // Small initial progress for the current file

        try {
            setProgress(currentProgressStart + 10);
            const audioDataUri = await fileToDataUri(file);
            setProgress(currentProgressStart + 20);

            toast({ title: `${file.name}: 오디오 전사 중...` });
            const transcriptionResult = await transcribeAudio({ audioDataUri });
            const transcribedText = transcriptionResult.transcribedText;
            setProgress(currentProgressStart + 40);


            if (!transcribedText) {
                throw new Error('전사 실패 또는 빈 텍스트 반환.');
            }

            toast({ title: `${file.name}: 스팸 확률 분석 중...` });
            const spamResult = await detectSpamProbability({ callerResponse: transcribedText });
            setProgress(currentProgressStart + 60);


            toast({ title: `${file.name}: 통화 이유 요약 중...` });
            const summaryResult = await summarizeCallReason({ callerReason: transcribedText });
            setProgress(currentProgressEnd - 10); // Almost done with this file


            // Add result to the history
            const newResult: AnalysisResult = {
              id: generateId(), // Generate a unique ID for each result
              fileName: file.name,
              // Attempt to extract phone number (basic example, needs improvement)
              phoneNumber: file.name.replace(/[^0-9\-]/g, '').split('-')[0] || file.name,
              analysisTimestamp: new Date().toISOString(),
              transcribedText: transcribedText,
              spamProbability: spamResult.spamProbability,
              spamReason: spamResult.reason,
              summary: summaryResult.summary,
              action: 'Analyzed', // Initial action state
            };
            addAnalysisResult(newResult);


            setProgress(currentProgressEnd); // Mark file as completed


            toast({
              title: `분석 완료: ${file.name}`,
              description: `스팸 확률: ${(spamResult.spamProbability * 100).toFixed(0)}%`,
            });

        } catch (error: any) {
            console.error(`Error screening file ${file.name}:`, error);
            toast({
                title: '오류',
                description: `${file.name} 분석 실패: ${error.message}`,
                variant: 'destructive',
            });
             // Add error result to history
            const errorResult: AnalysisResult = {
               id: generateId(),
               fileName: file.name,
               phoneNumber: file.name.replace(/[^0-9\-]/g, '').split('-')[0] || file.name,
               analysisTimestamp: new Date().toISOString(),
               transcribedText: '오류 발생',
               spamProbability: null,
               spamReason: `분석 오류: ${error.message}`,
               summary: '오류 발생',
               action: 'Error',
            };
            addAnalysisResult(errorResult);

             // Continue to the next file despite the error
            setProgress(currentProgressEnd); // Still update progress for overall completion
        }
    }


    setIsLoading(false);
    setSelectedFiles(null); // Clear selection after analysis
    // Reset file input visually (optional, but good UX)
    const fileInput = document.getElementById('audio-files') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }

     toast({
        title: '모든 파일 분석 완료',
        description: `${totalFiles}개의 파일 분석이 완료되었습니다. 통화 기록을 확인하세요.`,
     });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>통화 녹음 분석</CardTitle>
        <CardDescription>
          내장 저장공간의 'Recordings/Call' 폴더 또는 다른 곳에서 녹음 파일을 선택하여 스팸 및 피싱 가능성을 분석하세요. 여러 파일을 한 번에 선택할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="audio-files">녹음 파일 선택:</Label>
          <Input
            id="audio-files"
            type="file"
            accept="audio/*"
            multiple // Allow multiple file selection
            onChange={handleFileChange}
            disabled={isLoading}
            className="cursor-pointer file:cursor-pointer file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:rounded-md file:border-0 file:px-3 file:py-1.5"
          />
          <Button onClick={handleAnalyzeFiles} disabled={isLoading || !selectedFiles || selectedFiles.length === 0}>
            {isLoading ? `분석 중 (${currentFileIndex}/${selectedFiles?.length ?? 0})...` : '선택한 파일 로드 및 분석'}
          </Button>
        </div>

         {isLoading && (
          <div className="grid gap-2">
            <Label>전체 진행률:</Label>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">{progress.toFixed(0)}% 완료</p>
          </div>
        )}
        {/* Individual result display removed, results will show in CallHistory */}
      </CardContent>
    </Card>
  );
};

export default CallScreen;
