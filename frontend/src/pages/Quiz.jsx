import { submitQuiz } from "../api/api";

export default function Quiz() {
  const handleSubmit = async () => {
    const result = await submitQuiz({
      student_id: "demo-student-id",
      topic: "Mathematics",
      score: 65
    });
    alert(result.lesson);
  };

  return (
    <div className="p-6">
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
}