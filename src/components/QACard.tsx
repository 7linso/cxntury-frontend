import { type QACardProps } from "../lib/types";
import Option from "./Option";

export default function QACard({
  task,
  options,
  selectedOptionId,
  result,
  checking,
  onSelect,
  onCheck,
}: QACardProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOptionId || checking) return;

    onCheck({ taskId: task.id, optionId: selectedOptionId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-green-500 rounded-lg p-4"
    >
      <h2 className="text-[#50c878] text-lg font-semibold mb-3">
        {task.instruction}
      </h2>

      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <Option
              key={opt.id}
              text={opt.text}
              selected={isSelected}
              disabled={checking || result !== null}
              onSelect={() => onSelect({ taskId: task.id, optionId: opt.id })}
            />
          );
        })}
      </div>

      <div className="flex items-center mt-4">
        {result !== null && (
          <div
            className={[
              "text-sm flex items-center gap-2",
              result ? "text-green-600" : "text-red-600",
            ].join(" ")}
          >
            {result ? "✔ Correct answer" : "✘ Wrong answer"}
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedOptionId || checking || result !== null}
          className="ml-auto bg-[#50c878] text-white py-2 px-4 rounded-xl disabled:bg-[#99e999] hover:bg-[#3fa361] transition"
        >
          {checking ? "Checking..." : "Check"}
        </button>
      </div>
    </form>
  );
}
