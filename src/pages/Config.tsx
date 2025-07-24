import { useGameContext } from "../context/GameContext";

const presets = {
  god: {
    level: "god",
    timePerWord: 1000,
    totalDuration: 10000,
    isCustom: false,
  },
  veteran: {
    level: "veteran",
    timePerWord: 2000,
    totalDuration: 20000,
    isCustom: false,
  },
  normal: {
    level: "normal",
    timePerWord: 3000,
    totalDuration: 30000,
    isCustom: false,
  },
} as const;

const Config = () => {
  const { config, setConfig, resetConfig } = useGameContext();

  const handleSelectLevel = (level: keyof typeof presets) => {
    setConfig(presets[level]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Configuración actual</h2>

      <ul className="text-lg space-y-2 mb-6">
        <li>
          <strong>Nivel:</strong> {config.level}
        </li>
        <li>
          <strong>Tiempo por palabra:</strong> {config.timePerWord / 1000}s
        </li>
        <li>
          <strong>Duración total:</strong> {config.totalDuration / 1000}s
        </li>
        <li>
          <strong>Personalizado:</strong> {config.isCustom ? "Sí" : "No"}
        </li>
      </ul>

      <div className="space-y-2">
        <p className="font-semibold text-gray-700 mb-2">
          Cambiar configuración:
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleSelectLevel("god")}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Nivel Dios (1s)
          </button>

          <button
            onClick={() => handleSelectLevel("veteran")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Nivel Veterano (2s)
          </button>

          <button
            onClick={() => handleSelectLevel("normal")}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Nivel Normal (3s)
          </button>

          <button
            onClick={resetConfig}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 mt-4"
          >
            Restaurar por defecto (Normal)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Config;
