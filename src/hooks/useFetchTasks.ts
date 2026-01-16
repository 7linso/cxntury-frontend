import { useCallback, useEffect, useState } from "react";
import { checkSessionToken, fetchAllTasks } from "../lib/helper";
import type { Task, UseFetchTasksResult } from "../lib/types";
import axios from "axios";

export const useFetchTasks = (): UseFetchTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      await checkSessionToken();
      const data = await fetchAllTasks();

      setTasks(Array.isArray(data) ? data : []);
    } catch (e: unknown) {
      // console.error("Failed to check answer", e);

      if (axios.isAxiosError(e) && e.code === "ECONNABORTED")
        setError(
          "Server is taking too long to respond. Please try again later."
        );

      setError("Something went wrong. Please try again later.");

      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { tasks, loading, error, refetch };
};
