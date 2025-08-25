import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CellType, generateKey } from '@/utils/codenames-key';
import { downloadNodeAsPng } from '@/utils/download-png';
import { shareOrCopyLink } from '@/utils/share-link';
import { getQueryParam, setQueryParams } from '@/utils/url';
import { Head } from '@inertiajs/react';
import {
  Download,
  Eye,
  EyeOff,
  Lock,
  RefreshCcw,
  Share2,
  Unlock,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type GuessSet = Set<string>;

function keyOf(rc: { r: number; c: number }) {
  return `${rc.r},${rc.c}`;
}

function classForCell(cell: CellType) {
  switch (cell) {
    case 'red':
      return 'bg-red-500';
    case 'blue':
      return 'bg-blue-500';
    case 'neutral':
      return 'bg-stone-300';
    case 'assassin':
      return 'bg-black dark:bg-gray-800';
  }
}

function randomSeed() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

const domain = window.location.hostname;

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Codenames', href: route('codenames.index') },
  ];

  const initialSeed = getQueryParam('seed') ?? '';

  const [seed, setSeed] = useState<string>(initialSeed);
  const [card, setCard] = useState(() => generateKey(initialSeed || null));
  const [hidden, setHidden] = useState(false);
  const [locked, setLocked] = useState(false);
  const [guessed, setGuessed] = useState<GuessSet>(new Set());
  const [generatedAt, setGeneratedAt] = useState(new Date());

  useEffect(() => {
    if (!initialSeed) {
      const s = randomSeed();
      setSeed(s);
      setGuessed(new Set());
      setCard(generateKey(s));
    } else {
      handleGenerate(initialSeed);
    }
  }, []);

  useEffect(() => {
    if (card.seed) {
      setQueryParams({
        seed: card.seed,
      });
    }
  }, [card.seed]);

  const counts = useMemo(() => {
    let red = 0,
      blue = 0,
      neutral = 0,
      assassin = 0;
    card.grid.flat().forEach((c) => {
      if (c === 'red') red++;
      else if (c === 'blue') blue++;
      else if (c === 'neutral') neutral++;
      else assassin++;
    });
    return { red, blue, neutral, assassin };
  }, [card]);

  function toggleGuess(r: number, c: number) {
    const k = keyOf({ r, c });
    setGuessed((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function handleGenerate(newSeed?: string) {
    if (locked) return;
    const s = (newSeed ?? (seed || randomSeed())).trim();
    setSeed(s);
    setGuessed(new Set());
    setCard(generateKey(s));
    setGeneratedAt(new Date());
  }

  const spymasterUrl = (() => {
    const url = new URL(window.location.origin + '/codenames');
    url.searchParams.set('seed', card.seed || '');
    return url.toString();
  })();

  const operativeUrl = (() => {
    const url = new URL(window.location.origin + '/codenames/board');
    url.searchParams.set('seed', card.seed || '');
    url.searchParams.set('start', card.startingTeam);
    return url.toString();
  })();

  const gridRef = useRef<HTMLDivElement>(null);

  const frameRef = useRef<HTMLDivElement>(null);

  async function exportFullPng() {
    if (!frameRef.current) return;

    const prevHidden = hidden;
    setHidden(false);

    await new Promise((r) => setTimeout(r, 50));
    await downloadNodeAsPng(frameRef.current, {
      fileName: `codenames-key-${card.startingTeam}-${card.seed || Date.now()}`,
      pixelRatio: 2,
      bg: '#F5F5F4',
    });
    setHidden(prevHidden);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Codenames" />

      <div className="">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 p-4 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="hidden gap-2 md:flex">
              <Button
                className="h-10 rounded px-4 text-sm font-semibold text-white disabled:opacity-40"
                onClick={() => handleGenerate(randomSeed())}
                disabled={locked}
              >
                <RefreshCcw /> {locked ? 'Locked' : 'Generate'}
              </Button>
              <div>
                <input
                  type="text"
                  placeholder="Input seed"
                  className="h-10 rounded border px-3 text-sm outline-none focus:ring-2 focus:ring-stone-400"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  disabled={locked}
                  aria-label="Seed"
                />
                <Button
                  variant="secondary"
                  className="-ml-18 h-8 rounded px-4 text-sm font-semibold disabled:opacity-40"
                  onClick={() => handleGenerate()}
                  disabled={locked}
                >
                  Seed
                </Button>
              </div>
            </div>
            <div className="flex w-full justify-center gap-2 md:justify-end">
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setHidden((v) => !v)}
              >
                {hidden ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setLocked((v) => !v)}
              >
                {locked ? (
                  <Unlock className="size-5" />
                ) : (
                  <Lock className="size-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={exportFullPng}
                title="Download"
              >
                <Download className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() =>
                  shareOrCopyLink('Codenames Spymaster Key', spymasterUrl)
                }
              >
                <Share2 className="size-5" />
              </Button>
            </div>
          </div>

          <div
            ref={frameRef}
            className="rounded-xl bg-background p-4 ring-1 ring-stone-200"
          >
            <header className="mb-3">
              <h1 className="text-xl font-bold">Codenames Secret Key</h1>
              <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">
                <span>
                  Starting:{' '}
                  <span
                    className={`font-semibold capitalize ${card.startingTeam === 'red' ? 'text-red-500' : 'text-blue-500'}`}
                  >
                    {card.startingTeam}
                  </span>
                </span>
                <span className="mx-2">•</span>
                <span>
                  Seed: <span className="font-mono">{card.seed || '—'}</span>
                </span>
                {/* <span className="mx-1">•</span>
                <span>
                  R:{counts.red} B:{counts.blue} N:{counts.neutral} X:
                  {counts.assassin}
                </span> */}
              </div>
            </header>

            <div
              className={`grid grid-cols-5 gap-2 rounded md:gap-3 ${hidden ? 'blur select-none' : ''}`}
              aria-label="Secret key grid"
            >
              {card.grid.map((row, r) =>
                row.map((cell, c) => {
                  const k = `${r},${c}`;
                  const isGuessed = guessed.has(k);
                  return (
                    <div
                      key={k}
                      onClick={() => toggleGuess(r, c)}
                      className={`relative aspect-square rounded ${classForCell(cell)} ${locked ? 'cursor-default' : 'cursor-pointer'} ${
                        hidden ? 'pointer-events-none bg-stone-300' : ''
                      }`}
                    >
                      <div className="absolute inset-0 rounded ring-white/20 ring-inset" />
                      {isGuessed && !hidden && (
                        <div className="pointer-events-none absolute inset-0 m-2 flex items-center justify-center rounded-lg bg-white font-bold backdrop-blur-[1px] md:m-4" />
                      )}
                      {cell === 'assassin' && !hidden && (
                        <div className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  );
                }),
              )}
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-stone-500 dark:text-stone-400">
              <div className="">
                Generated {generatedAt.toLocaleString('id-ID')}
              </div>
              <div className="">{domain}</div>
            </div>
          </div>

          <div className="flex justify-center gap-2 md:hidden">
            <Button
              className="h-10 rounded px-4 text-sm font-semibold text-white disabled:opacity-40"
              onClick={() => handleGenerate(randomSeed())}
              disabled={locked}
            >
              <RefreshCcw /> {locked ? 'Locked' : 'Generate'}
            </Button>
            <div>
              <input
                type="text"
                placeholder="Input seed"
                className="h-10 rounded border px-3 text-sm outline-none focus:ring-2 focus:ring-stone-400"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                disabled={locked}
                aria-label="Seed"
              />
              <Button
                variant="secondary"
                className="-ml-18 h-8 rounded px-4 text-sm font-semibold disabled:opacity-40"
                onClick={() => handleGenerate()}
                disabled={locked}
              >
                Seed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function IconButton({ label, onClick, children }: any) {
  return (
    <button
      className="size-10 rounded-lg border bg-card transition hover:bg-accent focus:ring focus:outline-none"
      aria-label={label}
      onClick={onClick}
      title={label}
    >
      <span className="grid place-items-center">{children}</span>
    </button>
  );
}
