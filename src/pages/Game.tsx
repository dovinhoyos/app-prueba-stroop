import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

type Color =
  | "Amarillo"
  | "Azul"
  | "Naranja"
  | "Negro"
  | "Blanco"
  | "Rojo"
  | "Verde"
  | "Púrpura";

const COLOR_MAP: Record<Color, string> = {
  Amarillo: "yellow",
  Azul: "blue",
  Naranja: "orange",
  Negro: "black",
  Blanco: "white",
  Rojo: "red",
  Verde: "green",
  Púrpura: "purple",
};

const COLORS: Color[] = [
  "Amarillo",
  "Azul",
  "Naranja",
  "Negro",
  "Blanco",
  "Rojo",
  "Verde",
  "Púrpura",
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const Game = () => {
  const { config } = useGame();
  const navigate = useNavigate();

  const [word, setWord] = useState<Color>(getRandomColor());
  const [color, setColor] = useState<Color>(getRandomColor());
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [history, setHistory] = useState<{ time: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState(config.totalDuration);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const nextWord = () => {
    setWord(getRandomColor());
    setColor(getRandomColor());
    setStartTime(Date.now());
  };

  const checkAnswer = (isCorrect: boolean) => {
    const isActuallyCorrect = word === color;
    const isRight = isCorrect === isActuallyCorrect;

    if (isRight) {
      setCorrect((prev) => prev + 1);
      setHistory((prev) => [...prev, { time: Date.now() - startTime }]);
    } else {
      setIncorrect((prev) => prev + 1);
    }

    nextWord();
  };

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= config.timePerWord) {
          clearInterval(gameInterval);
          navigate("/results", {
            state: {
              correct,
              incorrect,
              averageTime: history.length
                ? Math.round(
                    history.reduce((acc, h) => acc + h.time, 0) / history.length
                  )
                : 0,
            },
          });
          return 0;
        }
        return prev - config.timePerWord;
      });
    }, config.timePerWord);

    setIntervalId(gameInterval);
    setStartTime(Date.now());

    return () => {
      clearInterval(gameInterval);
    };
  }, []);

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold">Juego en curso</h1>
      <div className="text-xl">
        Tiempo restante: {(timeLeft / 1000).toFixed(1)}s
      </div>

      <div
        className="text-5xl font-black p-4 border rounded"
        style={{ color: COLOR_MAP[color] }}
      >
        {word.toUpperCase()}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          onClick={() => checkAnswer(true)}
        >
          Correcto
        </button>
        <button
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
          onClick={() => checkAnswer(false)}
        >
          Incorrecto
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-700">
        <p>Palabras correctas: {correct}</p>
        <p>Palabras incorrectas: {incorrect}</p>
      </div>
    </div>
  );
};

export default Game;
