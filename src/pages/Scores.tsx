import { useEffect, useState } from "react";

interface ScoreEntry {
  id: string;
  correct: number;
  percentage: number;
  averageTime: number;
  level: string;
  date: string;
};

const Scores = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("strooper_scores");
    if (data) {
      const parsed: ScoreEntry[] = JSON.parse(data);
      setScores(parsed);
    }
  }, []);

  if (scores.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">🏆 Puntajes</h2>
        <p className="mt-4 text-gray-600">Aún no hay puntajes guardados</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🏆 Top 5 Puntajes</h2>

      <ul className="space-y-4">
        {scores.map((score, i) => (
          <li
            key={score.id}
            className="p-4 rounded shadow bg-white border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                #{i + 1} - Nivel: <strong>{score.level}</strong>
              </span>
              <span className="text-sm text-gray-500">
                {new Date(score.date).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-2 text-gray-700">
              ✅ Correctas: <strong>{score.correct}</strong>
              <br />
              📊 Acierto: <strong>{score.percentage}%</strong>
              <br />
              ⏱️ Promedio: <strong>{score.averageTime}ms</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scores;