import Button from "../components/Button";
import { FaPlay, FaCogs, FaTrophy } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-5xl font-black text-gray-800 mb-4">🎨 Strooper</h1>
      <p className="text-gray-600 mb-8 text-lg">¡Probá tu velocidad mental!</p>

      <div className="flex flex-col gap-4 w-full items-center">
        <Button to="/game" icon={<FaPlay />}>
          Jugar
        </Button>
        <Button to="/config" icon={<FaCogs />}>
          Configuración
        </Button>
        <Button to="/scores" icon={<FaTrophy />}>
          Ver Puntajes
        </Button>
      </div>
    </div>
  );
};

export default Home;
