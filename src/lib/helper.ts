import { api } from "../lib/api";
import type { postAnswerPayload } from "./types";

export const checkSessionToken = async () => {
  const existing = sessionStorage.getItem("sessionToken");
  if (existing) return existing;

  try {
    const res = await api.get("/api/session");
    sessionStorage.setItem("sessionToken", res.data.token);

    return res.data.token;
  } catch (err) {
    console.error("Failed to get session token", err);
    throw err;
  }
};

export const fetchAllTasks = async () => {
  try {
    const res = await api.get("/api/worksheet/tasks");
    // console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch tasks", err);
    throw err;
  }
};

export const checkAnswer = async ({ taskId, optionId }: postAnswerPayload) => {
  try {
    const res = await api.post(`/api/worksheet/tasks/${taskId}/answer`, {
      optionId,
    });

    return res.data;
  } catch (err) {
    console.error("Failed to check this answer", err);
    throw err;
  }
};
