import { type FC, useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select';
import { toast } from '~/components/ui/use-toast';

export function SingleBadgeSelector({
  options,
  onValueChange,
  value,
}: {
  options: { value: string; label: FC }[];
  onValueChange: (value: string) => Promise<void>;
  value: string;
}) {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleStatusChange = (newValue: typeof options[number]['value']) => {
    if (isLoading) return; // Prevent multiple submissions
    setLoading(true);
    onValueChange(newValue).catch((error) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    }).finally(() => {
      setLoading(false);
    })
  }

  const selectedOption = options.find(option => option.value === value);

  return (
    <Select value={value} onValueChange={handleStatusChange}>
      <SelectTrigger size="sm" disabled={isLoading} className="border-none p-2 rounded-sm shadow-none hover:shadow-md hover:border transition-all">
        {isLoading ? (
          <span className="text-gray-500">กำลังเปลี่ยนสถานะ...</span>
        ) : selectedOption ? (
          <selectedOption.label />
        ) : (
          <Badge className="bg-gray-200 text-gray-800">เลือกสถานะ</Badge>
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <option.label />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}