import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { Head } from '@inertiajs/react';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Free Draw', href: route('draw.index') },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Free Draw" />

      <div className="h-full w-full">
        <Excalidraw
          initialData={{
            appState: {
              activeTool: { type: 'freedraw' },
            },
            scrollToContent: true,
          }}
        />
      </div>
    </AppLayout>
  );
}
