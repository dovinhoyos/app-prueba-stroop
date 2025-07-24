import { createContext, useContext, useState, type ReactNode } from "react";

export type GameLevel = "normal" | "veteran" | "god";

interface Config {
  level: GameLevel;
  timePerWord: number;
  totalDuration: number;
  isCustom: boolean;
}

const defaultConfig: Config = {
  level: "normal",
  timePerWord: 3000,
  totalDuration: 30000,
  isCustom: false,
};

interface GameContextType {
  config: Config;
  setConfig: (config: Config) => void;
  resetConfig: () => void;
}

interface Props {
  children: ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: Props) => {
  const [config, setConfigState] = useState<Config>(defaultConfig);

  const validateLevelHierarchy = (cfg: Config) => {
  if (
    cfg.level === "god" && cfg.timePerWord >= 2000 ||
    cfg.level === "veteran" && cfg.timePerWord >= 3000
  ) {
    throw new Error("Nivel no respeta jerarquía. God < Veteran < Normal.");
  }
};
  const setConfig = (cfg: Config) => {
  validateLevelHierarchy(cfg);
  setConfigState(cfg);
};
  const resetConfig = () => setConfigState(defaultConfig);

  return (
    <GameContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame debe usarse dentro de GameProvider");
  return ctx;
};
