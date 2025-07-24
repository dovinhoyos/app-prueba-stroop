import { useGameContext } from "../context/GameContext";

const Config = () => {
  const { config, resetConfig } = useGameContext();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Configuración actual</h2>
      <ul className="text-lg space-y-2 mb-6">
        <li><strong>Nivel:</strong> {config.level}</li>
        <li><strong>Tiempo por palabra:</strong> {config.timePerWord / 1000}s</li>
        <li><strong>Duración total:</strong> {config.totalDuration / 1000}s</li>
        <li><strong>Personalizado:</strong> {config.isCustom ? "Sí" : "No"}</li>
      </ul>

      <button
        onClick={resetConfig}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Restaurar configuración por defecto
      </button>
    </div>
  );
};

export default Config;
