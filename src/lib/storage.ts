// Keep the demo usable when browser storage is unavailable or full.
const memory = new Map<string, string>();

export const readStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = memory.get(key) ?? window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
};

export const writeStored = (key: string, value: unknown) => {
  const raw = JSON.stringify(value);
  memory.set(key, raw);
  try {
    window.localStorage.setItem(key, raw);
    memory.delete(key);
  } catch {
    // Changes remain available for this visit.
  }
};