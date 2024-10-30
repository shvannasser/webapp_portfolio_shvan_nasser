import { useState, useEffect } from "react";

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export default function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result.data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, isLoading, error };
}
