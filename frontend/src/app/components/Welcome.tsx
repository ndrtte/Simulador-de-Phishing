import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Shield, Mail, CheckCircle, Plus, ArrowRight, BookOpen, Target, Zap, Trophy, BookOpenIcon, } from "lucide-react";

type DifficultyLevel = "facil" | "intermedio" | "dificil";

export function Welcome() {
  const navigate = useNavigate();
  const [emailCount, setEmailCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("intermedio");
  const [showConfig, setShowConfig] = useState(false);

  const handleStartSimulation = () => {
    if (!showConfig) {
      setShowConfig(true);
    } else {
      navigate("/simulation", { state: { emailCount, difficulty } });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F5F7FA" }}
    >
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg"
          style={{ backgroundColor: "#3B82F6" }}
        >
          <Shield className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Simulador de Phishing en Email
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
          Pon a prueba tu capacidad para identificar correos electrónicos de
          phishing en un entorno seguro.
        </p>

        {/* Configuration Section */}
        {showConfig && (
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8 animate-in slide-in-from-top">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Configura tu Simulación
            </h2>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <p className="text-gray-700 font-medium mb-4">
                Selecciona el nivel de dificultad:
              </p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setDifficulty("facil")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    difficulty === "facil"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <Target
                    className={`w-8 h-8 mx-auto mb-2 ${difficulty === "facil" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <div
                    className="text-lg font-bold mb-1"
                    style={{
                      color: difficulty === "facil" ? "#22C55E" : "#6B7280",
                    }}
                  >
                    Fácil
                  </div>
                  <div className="text-xs text-gray-600">Señales obvias</div>
                </button>
                <button
                  onClick={() => setDifficulty("intermedio")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    difficulty === "intermedio"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <Zap
                    className={`w-8 h-8 mx-auto mb-2 ${difficulty === "intermedio" ? "text-blue-600" : "text-gray-500"}`}
                  />
                  <div
                    className="text-lg font-bold mb-1"
                    style={{
                      color:
                        difficulty === "intermedio" ? "#3B82F6" : "#6B7280",
                    }}
                  >
                    Intermedio
                  </div>
                  <div className="text-xs text-gray-600">Señales moderadas</div>
                </button>
                <button
                  onClick={() => setDifficulty("dificil")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    difficulty === "dificil"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <Trophy
                    className={`w-8 h-8 mx-auto mb-2 ${difficulty === "dificil" ? "text-red-600" : "text-gray-500"}`}
                  />
                  <div
                    className="text-lg font-bold mb-1"
                    style={{
                      color: difficulty === "dificil" ? "#EF4444" : "#6B7280",
                    }}
                  >
                    Difícil
                  </div>
                  <div className="text-xs text-gray-600">Señales sutiles</div>
                </button>
              </div>
            </div>

            {/* Email Count Selection */}
            <div>
              <p className="text-gray-700 font-medium mb-4">
                ¿Cuántos emails deseas revisar?
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    onClick={() => setEmailCount(count)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      emailCount === count
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{
                        color: emailCount === count ? "#3B82F6" : "#6B7280",
                      }}
                    >
                      {count}
                    </div>
                    <div className="text-sm text-gray-600">
                      {count === 5
                        ? "Rápido"
                        : count === 10
                          ? "Estándar"
                          : "Completo"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ~{count === 5 ? "3" : count === 10 ? "5" : "8"} min
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        {!showConfig && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Mail
                className="w-8 h-8 mb-3 mx-auto"
                style={{ color: "#3B82F6" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Escenarios realistas
              </h3>
              <p className="text-sm text-gray-600">
                Practica con ejemplos reales de phishing.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <CheckCircle
                className="w-8 h-8 mb-3 mx-auto"
                style={{ color: "#22C55E" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Retroalimentación inmediata
              </h3>
              <p className="text-sm text-gray-600">
                Aprende de tus decisiones inmediatamente.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Shield
                className="w-8 h-8 mb-3 mx-auto"
                style={{ color: "#3B82F6" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Entrenamiento seguro
              </h3>
              <p className="text-sm text-gray-600">
                No hay datos ni cuentas reales en riesgo.
              </p>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleStartSimulation}
            className="text-lg px-12 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto flex items-center gap-2"
            style={{ backgroundColor: "#3B82F6" }}
          >
            {showConfig ? (
              <>
                Iniciar simulación
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              "Iniciar simulación"
            )}
          </Button>

          {!showConfig && (
            <Button
              onClick={() => navigate("/create-email")}
              variant="outline"
              className="text-lg px-12 py-6 h-auto rounded-xl border-2 hover:bg-gray-50 transition-all flex items-center gap-2 w-full sm:w-auto"
              style={{ borderColor: "#3B82F6", color: "#3B82F6" }}
            >
              <Plus className="w-5 h-5" />
              Crear Email
            </Button>
          )}

          {!showConfig && (
            <Button
              onClick={() => navigate("/about-simulator")}
              className="text-lg px-12 py-6 h-auto rounded-xl   hover:shadow-xl transition-all flex items-center w-full sm:w-auto"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              <BookOpenIcon className="w-6 h-6 text-white" />
              Sobre este simulador
            </Button>
          )}
        </div>

        {/* Footer Text */}
        {!showConfig && (
          <p className="text-sm text-gray-500 mt-8">
            Esta simulación dura aproximadamente entre 5 y 10 minutos.
          </p>
        )}
      </div>
    </div>
  );
}
