export type TaskOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Task = {
  id: string;
  instruction: string;
  task_options: TaskOption[];
};

export type QAProps = {
  data: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export type OptionProps = {
  text: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

export type QACardProps = {
  task: Task;
  options: TaskOption[];
  selectedOptionId: string | null;
  result: boolean | null;
  checking: boolean;
  onSelect: ({ taskId, optionId }: postAnswerPayload) => void;
  onCheck: ({ taskId, optionId }: postAnswerPayload) => void;
};

export type postAnswerPayload = {
  taskId: string;
  optionId: string;
};

export type UseFetchTasksResult = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};
