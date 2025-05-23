
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {useState} from 'react';

const Whitelist = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const {toast} = useToast();

  const handleAddToWhitelist = () => {
    if (phoneNumber && !whitelist.includes(phoneNumber)) {
      setWhitelist([...whitelist, phoneNumber]);
      setPhoneNumber('');
      toast({
        title: '번호 화이트리스트에 추가됨',
        description: `${phoneNumber}이(가) 화이트리스트에 추가되었습니다.`,
      });
    } else {
      toast({
        title: '오류',
        description: '고유한 전화 번호를 입력하세요.',
      });
    }
  };

  const handleRemoveFromWhitelist = (numberToRemove: string) => {
    setWhitelist(whitelist.filter((number) => number !== numberToRemove));
    toast({
      title: '번호 삭제됨',
      description: `${numberToRemove}이(가) 화이트리스트에서 삭제되었습니다.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>화이트리스트 관리</CardTitle>
        <CardDescription>
          AI 통화 선별을 우회하기 위해 신뢰할 수 있는 번호를 추가하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Input
            type="tel"
            placeholder="전화 번호"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button onClick={handleAddToWhitelist}>화이트리스트에 추가</Button>
        </div>
        <ul>
          {whitelist.map((number) => (
            <li key={number} className="flex items-center justify-between">
              {number}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFromWhitelist(number)}
              >
                제거
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Whitelist;
