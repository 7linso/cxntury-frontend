import { useState } from "react";
import { checkAnswer } from "../lib/helper";
import axios from "axios";

export const useCheckAnswer = () => {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, boolean>>({});
  const [checking, setChecking] = useState<Record<string, boolean>>({});

  const check = async (taskId: string, optionId: string) => {
    try {
      setError(null);
      setChecking((p) => ({ ...p, [taskId]: true }));

      const res = await checkAnswer({ taskId, optionId });

      setResult((p) => ({ ...p, [taskId]: res.correct }));
      return res.correct;
    } catch (e: unknown) {
      console.error("Failed to check answer", e);

      if (axios.isAxiosError(e) && e.code === "ECONNABORTED") {
        setError(
          "Server is taking too long to respond. Please try again later."
        );
        return null;
      }

      setError("Something went wrong. Please try again later.");

      return null;
    } finally {
      setChecking((p) => ({ ...p, [taskId]: false }));
    }
  };

  const reset = () => {
    setError(null);
    setResult({});
    setChecking({});
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  const resetError = () => setError(null);

  return { error, resetError, reset, result, checking, check };
};
