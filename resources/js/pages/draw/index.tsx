import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Free Draw', href: route('draw.index') },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Free Draw" />

      <div className="h-full w-full">
        <Tldraw
          persistenceKey="playgroung-draw"
          onMount={(editor) => {
            editor.setCurrentTool('draw');
          }}
        />
      </div>
    </AppLayout>
  );
}
