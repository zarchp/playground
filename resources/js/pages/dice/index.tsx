import { DiceRollerControls } from '@/components/dice/dice-roller-controls';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CountingNumber } from '@/components/ui/shadcn-io/counting-number';
import { useDiceBox } from '@/hooks/useDiceBox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Dices } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Dice', href: route('dice.index') },
  ];

  const [qty, setQty] = useState(1);
  const [sides, setSides] = useState(6);
  const [result, setResult] = useState(0);
  const [rolls, setRolls] = useState<number[]>([]);

  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const toggleRef = useRef(false);

  const onBeforeRoll = () => {
    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    setResult(0);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRollComplete = (results: any[]) => {
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
      rollIntervalRef.current = null;
    }

    const finalResult = results.reduce((sum, r) => sum + r.value, 0);
    setResult(finalResult);

    const rolledValues = results[0].rolls.map(
      (roll: { value: number }) => roll.value,
    );
    setRolls(rolledValues);
  };

  const diceBoxRef = useDiceBox(onRollComplete, onBeforeRoll);

  const handleRoll = () => {
    diceBoxRef.current?.roll({ qty, sides });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dice" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div
          className="relative h-full w-full border rounded"
          onClick={handleRoll}
        >
          <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center">
            Tap <strong>here</strong> or click button below to roll
          </div>
          <div
            id="dice-box"
            className="relative z-10 h-full w-full"
          ></div>
        </div>

        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-4 rounded border bg-white/75 p-2 dark:bg-neutral-950/75">
                <Dices size={30} />
                <div className="text-3xl">
                  <CountingNumber
                    number={result}
                    className="text-4xl"
                    transition={{ stiffness: 500, damping: 50 }}
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-auto bg-white/75 p-2 text-center dark:bg-neutral-950/75"
            >
              {rolls.join(' + ')}
            </PopoverContent>
          </Popover>
        </div>

        <DiceRollerControls
          qty={qty}
          sides={sides}
          setQty={setQty}
          setSides={setSides}
          onRoll={handleRoll}
        />
      </div>
    </AppLayout>
  );
}
