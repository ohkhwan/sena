
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { transcribeAudio, TranscribeAudioOutput } from '@/ai/flows/transcribe-audio-flow';
import { detectSpamProbability, DetectSpamProbabilityOutput } from '@/ai/flows/detect-spam-probability';
import { blobToDataUri } from '@/lib/utils'; // Ensure this utility is created
import { Mic, StopCircle, AlertTriangle } from 'lucide-react';

interface SpamResult extends DetectSpamProbabilityOutput {
  // any additional fields if needed
}

export default function RealTimeAnalysisPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [spamResult, setSpamResult] = useState<SpamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('대기 중');
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    async function getMicPermission() {
      try {
        // Try to get the stream to check for permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicPermission(true);
        // Immediately stop the tracks if we're just checking permission
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("마이크 접근 오류:", err);
        toast({
          title: "마이크 권한 필요",
          description: "실시간 통화 분석을 사용하려면 마이크 권한을 허용해 주세요.",
          variant: "destructive",
        });
        setHasMicPermission(false);
      }
    }
    getMicPermission();
  }, [toast]);

  const handleStartRecording = async () => {
    if (!hasMicPermission) {
      toast({ title: "마이크 권한 없음", description: "마이크 권한을 먼저 허용해주세요.", variant: "destructive" });
      return;
    }
    setTranscribedText(null);
    setSpamResult(null);
    setIsLoading(true);
    setStatusMessage('녹음 시작 중...');
    setProgressValue(10);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // Save stream to stop it later
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setStatusMessage('오디오 처리 중...');
        setProgressValue(50);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Common format
        
        try {
          const audioDataUri = await blobToDataUri(audioBlob);
          setProgressValue(60);
          setStatusMessage('음성 변환 중...');
          const transcriptionResult: TranscribeAudioOutput = await transcribeAudio({ audioDataUri });
          setTranscribedText(transcriptionResult.transcribedText);
          setProgressValue(80);

          if (transcriptionResult.transcribedText && transcriptionResult.transcribedText.trim() !== "") {
            setStatusMessage('스팸 확률 분석 중...');
            const spamDetectionResult: DetectSpamProbabilityOutput = await detectSpamProbability({ callerResponse: transcriptionResult.transcribedText });
            setSpamResult(spamDetectionResult);
            setStatusMessage('분석 완료');
          } else {
            setStatusMessage('음성 변환 결과가 비어있어 스팸 분석을 건너<0xEB><08><0xB5>니다.');
            setSpamResult(null);
          }
          setProgressValue(100);
        } catch (aiError: any) {
          console.error("AI 처리 오류:", aiError);
          toast({ title: "AI 분석 오류", description: aiError.message || "AI 모델 처리 중 오류가 발생했습니다.", variant: "destructive" });
          setStatusMessage(`오류: ${aiError.message}`);
           setTranscribedText(transcribedText || "음성 변환 중 오류 발생"); // Keep previous text if transcription succeeded
        } finally {
          setIsLoading(false);
          // Stop all tracks on the stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatusMessage('녹음 중... 버튼을 다시 눌러 중지 및 분석하세요.');
      setProgressValue(30);
    } catch (err) {
      console.error("녹음 시작 오류:", err);
      toast({ title: "녹음 시작 오류", description: "녹음을 시작할 수 없습니다. 마이크 연결을 확인해주세요.", variant: "destructive" });
      setIsLoading(false);
      setStatusMessage('녹음 시작 실패');
      setProgressValue(0);
    }
  };

  const handleStopRecordingAndAnalyze = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // setIsLoading(true) will be set in onstop
      setStatusMessage('녹음 중지. 분석을 시작합니다...');
      // No need to stop stream tracks here, it's handled in onstop
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center p-6 space-y-6 bg-background overflow-auto">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-foreground text-center">실시간 통화 분석</h1>
        
        {!hasMicPermission && (
          <Alert variant="destructive" className="w-full">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>마이크 권한 필요</AlertTitle>
            <AlertDescription>
              이 기능을 사용하려면 브라우저 설정에서 마이크 접근 권한을 허용해야 합니다.
            </AlertDescription>
          </Alert>
        )}

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>전화통화 시뮬레이션</CardTitle>
            <CardDescription>버튼을 눌러 음성 녹음을 시작하고, 다시 눌러 중지 및 분석을 수행합니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button 
              onClick={isRecording ? handleStopRecordingAndAnalyze : handleStartRecording} 
              disabled={!hasMicPermission || (isLoading && !isRecording)}
              className="w-full max-w-xs text-lg p-6 rounded-lg"
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? <StopCircle className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
              {isLoading && !isRecording ? '처리 중...' : (isRecording ? '녹음 중지 및 분석' : '녹음 시작')}
            </Button>
            <p className="text-sm text-muted-foreground">{statusMessage}</p>
            {isLoading && <Progress value={progressValue} className="w-full mt-2" />}
          </CardContent>
        </Card>

        {transcribedText && (
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>변환된 텍스트</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{transcribedText}</p>
            </CardContent>
          </Card>
        )}

        {spamResult && (
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>스팸 분석 결과</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">
                스팸 확률: 
                <span className={`font-bold ml-2 ${
                  spamResult.spamProbability > 0.8 ? 'text-destructive' : 
                  spamResult.spamProbability > 0.5 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {(spamResult.spamProbability * 100).toFixed(0)}%
                </span>
              </p>
              <p className="text-sm text-muted-foreground">판단 이유: {spamResult.reason}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
