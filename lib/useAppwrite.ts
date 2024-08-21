import { useEffect, useState } from "react";
import { Alert } from "react-native";

interface IUseAppwrite<T> {
  fn: () => Promise<T>;
}

const useAppWrite = <T>({ fn }: IUseAppwrite<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppWrite;
