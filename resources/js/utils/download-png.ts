import * as htmlToImage from 'html-to-image';

type ExportOpts = {
  fileName: string;
  pixelRatio?: number; // 2 or 3 for crisp output
  bg?: string; // background fill
};

export async function downloadNodeAsPng(node: HTMLElement, opts: ExportOpts) {
  const { fileName, pixelRatio = 2, bg = '#F5F5F4' } = opts; // stone-100
  try {
    // Ensure fonts are ready for correct text layout
    // @ts-ignore
    if (document.fonts?.ready) await (document.fonts as any).ready;

    const dataUrl = await htmlToImage.toPng(node, {
      cacheBust: true,
      pixelRatio,
      backgroundColor: bg,
      style: {
        // Guarantees a solid background and no blur in snapshot
        background: bg,
        filter: 'none',
      },
    });

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    a.click();
  } catch (err) {
    console.error('PNG export failed:', err);
  }
}
