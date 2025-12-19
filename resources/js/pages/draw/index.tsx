import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Eraser, Pen, Redo, Trash2, Undo } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export default function Index() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: route('home') },
    { title: 'Free Draw', href: route('draw.index') },
  ];

  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Free Draw" />

      <div className="mt-2 flex h-full w-full flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            disabled={!eraseMode}
            onClick={handlePenClick}
          >
            <Pen /> Pen
          </Button>
          <Button
            type="button"
            disabled={eraseMode}
            onClick={handleEraserClick}
          >
            <Eraser /> Eraser
          </Button>
          <Button
            type="button"
            onClick={handleUndoClick}
          >
            <Undo /> Undo
          </Button>
          <Button
            type="button"
            onClick={handleRedoClick}
          >
            <Redo /> Redo
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleClearClick}
          >
            <Trash2 /> Clear
          </Button>
        </div>
        <ReactSketchCanvas
          ref={canvasRef}
          canvasColor="transparent"
          strokeColor="oklch(37.1% 0 0)"
        />
      </div>
    </AppLayout>
  );
}
