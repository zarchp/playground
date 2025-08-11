import { copyToClipboard } from './url';

export async function shareOrCopyLink(title: string, url: string) {
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return { shared: true, copied: false };
    } catch (err) {
      console.warn('Share canceled or failed:', err);
      return { shared: false, copied: false };
    }
  } else {
    const copied = await copyToClipboard(url);
    if (copied) {
      alert('Link copied to clipboard!');
    } else {
      prompt('Copy this link:', url); // Fallback if clipboard fails
    }
    return { shared: false, copied };
  }
}
