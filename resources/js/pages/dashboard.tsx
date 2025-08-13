import Duck from '@/components/icons/duck';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Dice6,
  Grid3X3,
  Hash,
  KeyRound,
  Rocket,
} from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const features: Feature[] = [
  {
    title: 'Dice',
    description: 'Simple 3D dice roller for quick decisions & games.',
    href: route('dice.index'),
    icon: Dice6,
  },
  {
    title: 'Codenames',
    description: 'Generate secret key cards and share with your team.',
    href: route('codenames.index'),
    icon: KeyRound,
    badge: 'New',
  },
  {
    title: 'Tic Tac Toe',
    description: 'PvP & AI modes (easy/medium/hard).',
    href: route('tic-tac-toe.index'),
    icon: Hash,
  },
  {
    title: 'Sudoku',
    description: 'Playable generator, solver, hints, and leaderboard.',
    href: route('sudoku.index'),
    icon: Grid3X3,
  },
  {
    title: 'More Apps',
    description: 'Coming soon, stay tuned!',
    href: '#',
    icon: Rocket,
  },
];

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: route('home'),
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Home" />

      <div className="space-y-8">
        <div className="relative overflow-hidden bg-gradient-to-b from-cyan-50 via-sky-50 to-background p-8 dark:via-none dark:from-cyan-950 dark:to-background">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm backdrop-blur dark:bg-zinc-900/60">
              <Duck className="h-4 w-4" />
              <span>Welcome to Playground</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A Curated Collection of Mini-Games & Utilities
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Explore the tools below for quick games and utilities to help you
              learn, play, and have fun.
            </p>

            {/* <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href={features[0].href}>
                  Get started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
              >
                <Link href="#apps">See all apps</Link>
              </Button>
            </div> */}
          </motion.div>

          {/* subtle background pattern */}
          {/* <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-400/20 to-amber-400/20 blur-3xl dark:from-sky-500/10 dark:to-amber-500/10" /> */}
        </div>

        {/* Apps */}
        <section
          id="apps"
          className="space-y-4 px-8"
        >
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Available Apps</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Click a card to open.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={f.href}
                  className={`h-full ${f.href === '#' ? 'pointer-events-none cursor-default' : ''}`}
                >
                  <Card className="group h-full transition-colors hover:border-sky-300 hover:shadow-md dark:hover:border-sky-800">
                    <CardHeader className="flex flex-row items-center gap-3">
                      <div className="rounded-2xl bg-sky-100 p-2 text-sky-700 ring-1 ring-sky-200 group-hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:ring-sky-900/60">
                        <f.icon className="h-6 w-6" />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <CardTitle className="text-lg">{f.title}</CardTitle>
                        {f.badge && (
                          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                            {f.badge}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-zinc-600 group-hover:text-zinc-800 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                        {f.description}
                      </p>
                      {f.href !== '#' && (
                        <div className="mt-4 inline-flex items-center text-sm font-medium text-sky-700 group-hover:translate-x-0.5 dark:text-sky-300">
                          Open <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
