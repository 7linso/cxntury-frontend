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
      if (axios.isAxiosError(e)) {
        // timeout
        if (e.code === "ECONNABORTED" || e.code === "ETIMEDOUT") {
          setError(
            "Server is taking too long to respond. Please try again later.",
          );
        }
        // dead backend
        else if (!e.response) {
          setError("Cannot reach the server. Please try again later.");
        }
      } // general error message
      else {
        setError("Something went wrong. Please try again later.");
      }

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
