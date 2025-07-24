import { useGame } from "../context/GameContext";

const Home = () => {
  const { config } = useGame();

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Home - Strooper</h1>
      <p className="mt-2 text-gray-600">
        Nivel actual: <strong>{config.level}</strong>
      </p>
    </div>
  );
};

export default Home;