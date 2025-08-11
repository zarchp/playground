export function getQueryParam(name: string, search = window.location.search) {
  const p = new URLSearchParams(search);
  const val = p.get(name);
  return val && val.trim().length ? val.trim() : null;
}

export function setQueryParams(
  params: Record<string, string | null | undefined>,
) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null || v === '') url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  });
  window.history.replaceState({}, '', url.toString());
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
