import { useState } from "react";
import { type postAnswerPayload, type QAProps } from "../lib/types";
import QACard from "./QACard";
import { useCheckAnswer } from "../hooks/useCheckAnswer";

export default function QA({
  data,
  loading,
  error: tasksError,
  refetch,
}: QAProps) {
  const tasks = Array.isArray(data) ? data : [];

  const { error, result, checking, check, reset } = useCheckAnswer();

  const [selectedByTask, setSelectedByTask] = useState<
    Record<string, string | null>
  >({});

  const handleSelect = ({ taskId, optionId }: postAnswerPayload) => {
    setSelectedByTask((prev) => ({
      ...prev,
      [taskId]: prev[taskId] === optionId ? null : optionId,
    }));
  };

  const handleCheck = async ({ taskId, optionId }: postAnswerPayload) => {
    await check(taskId, optionId);
  };

  const handleReset = () => {
    reset();
    setSelectedByTask({});
  };

  if (loading) return <div className="text-center">Loading...</div>;

  if (tasksError) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <div className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm flex items-center justify-between gap-3">
          <span>{tasksError}</span>
          <button
            onClick={() => void refetch()}
            className="rounded-lg bg-red-200 px-3 py-1 text-xs font-medium text-red-800 hover:bg-red-300 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
      {error && (
        <div className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {tasks.map((task) => {
        const options = Array.isArray(task.task_options)
          ? task.task_options
          : [];
        const selectedOptionId = selectedByTask[task.id] ?? null;

        return (
          <QACard
            key={task.id}
            task={task}
            options={options}
            selectedOptionId={selectedOptionId}
            result={result[task.id] ?? null}
            checking={!!checking[task.id]}
            onSelect={handleSelect}
            onCheck={handleCheck}
          />
        );
      })}

      <button
        className="ml-auto bg-[#50c878] text-white py-2 px-4 rounded-xl hover:bg-[#3fa361] transition"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
