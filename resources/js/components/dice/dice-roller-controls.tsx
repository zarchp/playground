import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Counter } from '@/components/ui/shadcn-io/counter';

interface DiceRollerControlsProps {
  qty: number;
  sides: number;
  setQty: (value: number) => void;
  setSides: (value: number) => void;
  onRoll: () => void;
}

const SIDES_OPTIONS = [4, 6, 8, 10, 12, 20];

export function DiceRollerControls({
  qty,
  sides,
  setQty,
  setSides,
  onRoll,
}: DiceRollerControlsProps) {
  const handleSetQty = (value: number) => {
    setQty(Math.max(1, Math.min(20, value)));
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-full">
        <Select
          value={sides.toString()}
          onValueChange={(value) => setSides(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sides" />
          </SelectTrigger>
          <SelectContent>
            {SIDES_OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={option.toString()}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Counter
          number={qty}
          setNumber={handleSetQty}
          className="w-full bg-white p-0"
          slidingNumberProps={{ className: 'w-full justify-center' }}
          buttonProps={{ className: 'bg-accent' }}
        />
      </div>

      <Button
        className="h-full w-full text-xl"
        onClick={onRoll}
      >
        Roll
      </Button>
    </div>
  );
}
