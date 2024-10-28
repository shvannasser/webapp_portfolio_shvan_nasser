import { useState, useEffect } from "react";

export const useApi = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3999/api/projects");
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
};

// import axios from "axios";
// import { useState } from "react";

// export const useApi = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState();
//   const [error, setError] = useState();

//   const get = async (endpoint, params) => {
//     //endpoint: string, params: Record<string, string> = {}
//     setIsLoading(true);

//     // const url = new URL(`http://localhost:3999${endpoint}`);

//     // Object.keys(params).forEach((key) => {
//     //   url.searchParams.append(key, params[key]);
//     // });

//     try {
//       const response = await axios.get(`http://localhost:3999${endpoint}`, {
//         params,
//       });
//       setData(response.data);
//       setError();
//       setIsLoading(false);
//     } catch (err) {
//       setData();
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   return { get, data, error, isLoading };
// };
