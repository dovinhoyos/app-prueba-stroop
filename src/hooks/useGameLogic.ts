// hooks/useGameLogic.ts
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

const COLORS = [
  "Amarillo", "Azul", "Naranja", "Negro",
  "Blanco", "Rojo", "Verde", "Púrpura",
] as const;

export type Color = typeof COLORS[number];

export const COLOR_MAP: Record<Color, string> = {
  Amarillo: "yellow",
  Azul: "blue",
  Naranja: "orange",
  Negro: "black",
  Blanco: "white",
  Rojo: "red",
  Verde: "green",
  Púrpura: "purple",
};

const getRandomColor = (): Color =>
  COLORS[Math.floor(Math.random() * COLORS.length)];

type WordPair = { word: Color; color: Color };

export const useGameLogic = () => {
  const { config } = useGameContext();
  const navigate = useNavigate();

  const [pair, setPair] = useState<WordPair>(() => ({
    word: getRandomColor(),
    color: getRandomColor(),
  }));

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.totalDuration);

  const startTimeRef = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasResponded = useRef(false);

  const generateNewPair = () => {
    setPair({ word: getRandomColor(), color: getRandomColor() });
    startTimeRef.current = Date.now();
    hasResponded.current = false;
  };

  const endGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const averageTime = history.length
      ? Math.round(history.reduce((acc, t) => acc + t, 0) / history.length)
      : 0;

    navigate("/results", { state: { correct, incorrect, averageTime } });
  };

  const moveToNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const remaining = timeLeft - config.timePerWord;
    setTimeLeft(remaining);
    remaining <= 0 ? endGame() : setStep((prev) => prev + 1);
  };

  const checkAnswer = (userSaysCorrect: boolean) => {
    if (hasResponded.current) return;
    hasResponded.current = true;

    const isActuallyCorrect = pair.word === pair.color;
    const isCorrect = userSaysCorrect === isActuallyCorrect;

    isCorrect ? (
      setCorrect((c) => c + 1),
      setHistory((h) => [...h, Date.now() - startTimeRef.current])
    ) : setIncorrect((i) => i + 1);

    moveToNext();
  };

  const markUnanswered = () => {
    if (hasResponded.current) return;
    hasResponded.current = true;
    setIncorrect((i) => i + 1);
    moveToNext();
  };

  useEffect(() => {
    if (timeLeft <= 0) return endGame();

    generateNewPair();
    timeoutRef.current = setTimeout(markUnanswered, config.timePerWord);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [step]);

  return {
    pair,
    correct,
    incorrect,
    timeLeft,
    checkAnswer,
  };
};