import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CellType, generateKey } from '@/utils/codenames-key';
import { downloadNodeAsPng } from '@/utils/download-png';
import { shareOrCopyLink } from '@/utils/share-link';
import { getQueryParam, setQueryParams } from '@/utils/url';
import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import {
  Download,
  Eye,
  EyeOff,
  Lock,
  RefreshCcw,
  Share2,
  Unlock,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type GuessSet = Set<string>;

const CELL_CLASS: Record<CellType, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  neutral: 'bg-stone-300',
  assassin: 'bg-black dark:bg-gray-800',
};

const GUESSED_CLASS: Record<CellType, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  neutral: 'text-stone-300',
  assassin: 'text-black dark:text-gray-800',
};

const keyOf = (r: number, c: number) => `${r},${c}`;

const randomSeed = () =>
  `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;

const buildUrl = (
  path: string,
  params: Record<string, string | number | undefined>,
) => {
  const u = new URL(path, window.location.origin);
  Object.entries(params).forEach(([k, v]) =>
    v != null ? u.searchParams.set(k, String(v)) : null,
  );
  return u.toString();
};

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Codenames', href: route('codenames.index') },
  ];

  const initialSeed = getQueryParam('seed') ?? '';
  const [seed, setSeed] = useState(initialSeed);
  const [card, setCard] = useState(() => generateKey(initialSeed || null));
  const [hidden, setHidden] = useState(false);
  const [locked, setLocked] = useState(false);
  const [guessed, setGuessed] = useState<GuessSet>(new Set());
  const [generatedAt, setGeneratedAt] = useState(new Date());
  const [domain, setDomain] = useState<string>('');

  // lazy domain for SSR safety
  useEffect(() => setDomain(window.location.hostname), []);

  // boot: ensure seed
  useEffect(() => {
    if (!initialSeed) {
      const s = randomSeed();
      setSeed(s);
      setCard(generateKey(s));
      setGuessed(new Set());
      setGeneratedAt(new Date());
    } else {
      handleGenerate(initialSeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep URL in sync
  useEffect(() => {
    if (card.seed) setQueryParams({ seed: card.seed });
  }, [card.seed]);

  const counts = useMemo(() => {
    const flat = card.grid.flat();
    return {
      red: flat.filter((c) => c === 'red').length,
      blue: flat.filter((c) => c === 'blue').length,
      neutral: flat.filter((c) => c === 'neutral').length,
      assassin: flat.filter((c) => c === 'assassin').length,
    };
  }, [card.grid]);

  const toggleGuess = useCallback((r: number, c: number) => {
    const k = keyOf(r, c);
    setGuessed((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  }, []);

  const handleGenerate = useCallback(
    (newSeed?: string) => {
      if (locked) return;
      const s = (newSeed ?? (seed || randomSeed())).trim();
      setSeed(s);
      setGuessed(new Set());
      setCard(generateKey(s));
      setGeneratedAt(new Date());
    },
    [locked, seed],
  );

  const spymasterUrl = useMemo(
    () =>
      buildUrl('/codenames', {
        seed: card.seed || '',
      }),
    [card.seed],
  );

  const operativeUrl = useMemo(
    () =>
      buildUrl('/codenames/board', {
        seed: card.seed || '',
        start: card.startingTeam,
      }),
    [card.seed, card.startingTeam],
  );

  const frameRef = useRef<HTMLDivElement>(null);

  const exportFullPng = useCallback(async () => {
    if (!frameRef.current) return;
    const wasHidden = hidden;
    setHidden(false);
    await new Promise((r) => setTimeout(r, 50));
    await downloadNodeAsPng(frameRef.current, {
      fileName: `codenames-key-${card.startingTeam}-${card.seed || Date.now()}`,
      pixelRatio: 2,
      bg: '#F5F5F4',
    });
    setHidden(wasHidden);
  }, [card.seed, card.startingTeam, hidden]);

  // --- Small shared UI pieces -------------------------------------------------

  const IconBtn = ({
    label,
    onClick,
    children,
  }: {
    label: string;
    onClick?: () => void;
    children: React.ReactNode;
  }) => (
    <Button
      variant="outline"
      size="icon-lg"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  const SeedControls = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        className="h-10 w-30 rounded px-4 text-sm font-semibold text-white disabled:opacity-40"
        onClick={() => handleGenerate(randomSeed())}
        disabled={locked}
      >
        <RefreshCcw /> {locked ? 'Locked' : 'Generate'}
      </Button>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Input seed"
          className="h-10 rounded border px-3 text-sm outline-none focus:ring-2 focus:ring-stone-400"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          disabled={locked}
          aria-label="Seed"
          maxLength={13}
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
  );

  const utilityActions = [
    {
      key: 'hide',
      label: hidden ? 'Show' : 'Hide',
      icon: hidden ? <Eye className="size-5" /> : <EyeOff className="size-5" />,
      onClick: () => setHidden((v) => !v),
    },
    {
      key: 'lock',
      label: locked ? 'Unlock' : 'Lock',
      icon: locked ? (
        <Unlock className="size-5" />
      ) : (
        <Lock className="size-5" />
      ),
      onClick: () => setLocked((v) => !v),
    },
    {
      key: 'download',
      label: 'Download',
      icon: <Download className="size-5" />,
      onClick: exportFullPng,
    },
    {
      key: 'share',
      label: 'Share',
      icon: <Share2 className="size-5" />,
      onClick: () => shareOrCopyLink('Codenames Spymaster Key', spymasterUrl),
    },
  ] as const;

  // ---------------------------------------------------------------------------

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Codenames" />

      <div className="mx-auto flex max-w-3xl flex-col gap-2 p-4 md:p-6">
        {/* Header toolbar: top utilities (right) + seed controls (left on md+) */}
        <div className="flex items-center justify-between gap-2">
          {/* Seed controls appear top on md+ */}
          <div className="hidden md:block">
            <SeedControls />
          </div>

          <div className="flex w-full justify-center gap-2 md:justify-end">
            {utilityActions.map((a) => (
              <IconBtn
                key={a.key}
                label={a.label}
                onClick={a.onClick}
              >
                {a.icon}
              </IconBtn>
            ))}
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
                  className={`font-semibold capitalize ${
                    card.startingTeam === 'red'
                      ? 'text-red-500'
                      : 'text-blue-500'
                  }`}
                >
                  {card.startingTeam}
                </span>
              </span>
              <span className="mx-2">•</span>
              <span>
                Seed: <span className="font-mono">{card.seed || '—'}</span>
              </span>
              {/* <span className="mx-1">•</span>
              <span>R:{counts.red} B:{counts.blue} N:{counts.neutral} X:{counts.assassin}</span> */}
            </div>
          </header>

          <div
            className={`grid grid-cols-5 gap-2 rounded md:gap-3 ${
              hidden ? 'blur select-none' : ''
            }`}
            aria-label="Secret key grid"
          >
            {card.grid.map((row, r) =>
              row.map((cell, c) => {
                const k = keyOf(r, c);
                const isGuessed = guessed.has(k);
                return (
                  <div
                    key={k}
                    onClick={() => !locked && toggleGuess(r, c)}
                    className={[
                      'relative aspect-square rounded',
                      CELL_CLASS[cell],
                      locked ? 'cursor-default' : 'cursor-pointer',
                      hidden ? 'pointer-events-none bg-stone-300' : '',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 rounded ring-white/20 ring-inset" />
                    {isGuessed && !hidden && (
                      <div
                        className={clsx(
                          'pointer-events-none absolute inset-0 z-10 m-2 flex items-center justify-center rounded-lg bg-white text-6xl font-normal backdrop-blur-[1px] md:m-3 md:text-8xl',
                          GUESSED_CLASS[cell],
                        )}
                      >
                        X
                      </div>
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
            <div>Generated {generatedAt.toLocaleString('id-ID')}</div>
            <div>{domain}</div>
          </div>
        </div>

        <div className="md:hidden">
          <SeedControls className="justify-center" />
        </div>
      </div>
    </AppLayout>
  );
}
