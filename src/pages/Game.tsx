import { COLOR_MAP, useGameLogic } from "../hooks/useGameLogic";
import clsx from "clsx";

const Game = () => {
  const { pair, correct, incorrect, timeLeft, checkAnswer } = useGameLogic();

  return (
    <div className="p-6 text-center space-y-6 transition-all duration-300">
      <h1 className="text-3xl font-bold">🧠 Juego en curso</h1>

      <div className="text-lg font-medium">
        Tiempo restante: <span className="font-bold">{(timeLeft / 1000).toFixed(1)}s</span>
      </div>

      <div
        className={clsx(
          "text-6xl font-extrabold p-4 border-4 rounded-lg transition-colors duration-200 ease-in",
          "min-h-[4rem]"
        )}
        style={{ color: COLOR_MAP[pair.color] }}
      >
        {pair.word.toUpperCase()}
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg transition"
          onClick={() => checkAnswer(true)}
        >
          ✅ Correcto
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg transition"
          onClick={() => checkAnswer(false)}
        >
          ❌ Incorrecto
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600 space-y-1">
        <p>✅ Correctas: {correct}</p>
        <p>❌ Incorrectas: {incorrect}</p>
      </div>
    </div>
  );
};

export default Game;
