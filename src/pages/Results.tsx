import { useLocation, useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useEffect } from "react";

interface ResultData {
  correct: number;
  incorrect: number;
  averageTime: number;
}

interface ScoreEntry {
  id: string;
  correct: number;
  percentage: number;
  averageTime: number;
  level: string;
  date: string;
}

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { config } = useGame();

  const result: ResultData = state;

  const total = result.correct + result.incorrect;
  const percentage = total ? Math.round((result.correct / total) * 100) : 0;

  useEffect(() => {
    if (!config.isCustom) {
      const prev = JSON.parse(
        localStorage.getItem("strooper_scores") || "[]"
      ) as ScoreEntry[];

      const newEntry: ScoreEntry = {
        id: crypto.randomUUID(),
        correct: result.correct,
        percentage,
        averageTime: result.averageTime,
        level: config.level,
        date: new Date().toISOString(),
      };

      const updated = [...prev, newEntry]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

      localStorage.setItem("strooper_scores", JSON.stringify(updated));
    }
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Resultados</h1>

      <p className="text-lg">
        Correctas: <strong>{result.correct}</strong>
      </p>
      <p className="text-lg">
        Incorrectas: <strong>{result.incorrect}</strong>
      </p>
      <p className="text-lg">
        Porcentaje de aciertos: <strong>{percentage}%</strong>
      </p>
      <p className="text-lg">
        Promedio de respuesta: <strong>{result.averageTime}ms</strong>
      </p>
      <p className="text-sm mt-4 text-gray-500">
        Juego:{" "}
        <strong>
          {config.isCustom ? "Personalizado" : "Por defecto"} ({config.level})
        </strong>
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Results;
