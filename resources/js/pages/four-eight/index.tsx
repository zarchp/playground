import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { JSX } from 'react';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Dice', href: route('dice.index') },
  ];

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 16;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(
        <div
          className="h-16 w-16 rounded bg-neutral-300 lg:h-32 lg:w-32"
          key={index}
        />,
      );
    }

    return cells;
  };

  /* const renderTiles = () => {
    return getTiles().map((tile: TileModel) => (
      <Tile
        key={`${tile.id}`}
        {...tile}
      />
    ));
  }; */

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="2048" />

      <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto p-4">
        <div className="grid grid-cols-4 grid-rows-4 gap-4 rounded-lg bg-neutral-500 p-4">
          {renderGrid()}
        </div>
      </div>
    </AppLayout>
  );
}
