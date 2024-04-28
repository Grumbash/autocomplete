const CACHE_LIFETIME = 5 * 60 * 1000; // 300,000 ms

export const fetchWithCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  lifetime: number = CACHE_LIFETIME
): Promise<T> => {
  const cachedEntry = localStorage.getItem(key);

  if (cachedEntry) {
    const { data, timestamp } = JSON.parse(cachedEntry);

    // Check if the cache has expired
    if (Date.now() - timestamp < lifetime) {
      return data as T;
    }
  }

  // If no cache is found or it has expired, fetch new data
  const data = await fetcher();
  const entry = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(entry));

  return data;
};
