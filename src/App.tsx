import Header from "./components/Header";
import QA from "./components/Q&A";
import { useFetchTasks } from "./hooks/useFetchTasks";

function App() {
  const { tasks, error, loading, refetch } = useFetchTasks();

  return (
    <main className="p-2">
      <Header />

      <QA data={tasks} loading={loading} error={error} refetch={refetch} />
    </main>
  );
}

export default App;
