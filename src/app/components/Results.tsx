import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Award, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    detectionRate = 0,
    errorRate = 0,
    correctCount = 0,
    totalCount = 0,
  } = location.state || {};

  // Pie chart data
  const pieData = [
    { name: "Correcto", value: correctCount, color: "#22C55E" },
    { name: "Incorrecto", value: totalCount - correctCount, color: "#EF4444" },
  ];

  // Bar chart data
  const barData = [
    { name: "Tasa de detección", value: detectionRate, color: "#22C55E" },
    { name: "Tasa de errores", value: errorRate, color: "#EF4444" },
  ];

  const getPerformanceMessage = () => {
    if (detectionRate >= 90) {
      return {
        title: "¡Rendimiento excelente!",
        message: "Tienes una sólida comprensión de los indicadores de phishing. ¡Sigue así!",
        riskLevel: "Riesgo bajo",
        riskColor: "#22C55E",
        riskBgColor: "#F0FDF4",
        icon: Award,
        color: "#22C55E",
      };
    } else if (detectionRate >= 70) {
      return {
        title: "Buen nivel de detección",
        message: "Lo estás haciendo bien, pero hay espacio para mejorar. Revisa los correos que fallaste para aprender más.",
        riskLevel: "Riesgo medio",
        riskColor: "#F59E0B",
        riskBgColor: "#FFFBEB",
        icon: TrendingUp,
        color: "#3B82F6",
      };
    } else if (detectionRate >= 50) {
      return {
        title: "Necesita mejorar",
        message: "Fallaste en identificar varios intentos de phishing. Revisa las señales comunes y vuelve a intentar la simulación.",
        riskLevel: "Alto riesgo",
        riskColor: "#EF4444",
        riskBgColor: "#FEF2F2",
        icon: AlertTriangle,
        color: "#F59E0B",
      };
    } else {
      return {
        title: "Crítico - Se necesita más entrenamiento",
        message: "Eres vulnerable a ataques de phishing. Por favor revisa las buenas prácticas de seguridad y practica regularmente.",
        riskLevel: "Riesgo crítico",
        riskColor: "#DC2626",
        riskBgColor: "#FEF2F2",
        icon: AlertTriangle,
        color: "#EF4444",
      };
    }
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#F5F7FA" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-4 rounded-lg border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Inicio
        </Button>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${performance.color}20` }}
            >
              <PerformanceIcon className="w-8 h-8" style={{ color: performance.color }} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {performance.title}
              </h1>
              <p className="text-lg text-gray-600">
                {performance.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Tasa de detección</p>
            <p className="text-4xl font-bold mb-1" style={{ color: "#22C55E" }}>
              {detectionRate}%
            </p>
            <p className="text-sm text-gray-500">
              Phishing identificado correctamente 
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Tasa de error</p>
            <p className="text-4xl font-bold mb-1" style={{ color: "#EF4444" }}>
              {errorRate}%
            </p>
            <p className="text-sm text-gray-500">
              Resultados no detectados o falsos positivos
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total de Emails</p>
            <p className="text-4xl font-bold mb-1" style={{ color: "#3B82F6" }}>
              {totalCount}
            </p>
            <p className="text-sm text-gray-500">
              Revisado y evaluado
            </p>
          </div>

          <div
            className="rounded-xl p-6 shadow-sm border-2"
            style={{
              backgroundColor: performance.riskBgColor,
              borderColor: performance.riskColor,
            }}
          >
            <p className="text-sm mb-2" style={{ color: performance.riskColor }}>
              Su nivel de riesgo
            </p>
            <p className="text-3xl font-bold mb-1" style={{ color: performance.riskColor }}>
              {performance.riskLevel.split(' ')[0]}
            </p>
            <p className="text-sm font-medium" style={{ color: performance.riskColor }}>
              {performance.riskLevel.includes(' ') ? performance.riskLevel.split(' ')[1] : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Breakdown - Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Desglose del rendimiento
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#22C55E" }}
                />
                <span className="text-sm text-gray-700">Correcto ({correctCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#EF4444" }}
                />
                <span className="text-sm text-gray-700">
                  Incorrecto ({totalCount - correctCount})
                </span>
              </div>
            </div>
          </div>

          {/* Detection vs Error Rate - Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tasa de detección vs Tasa de error
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Indicadores clave de phishing que debes recordar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Direcciones de remitente sospechosas</p>
                  <p className="text-sm text-gray-600">
                    Busque errores ortográficos, dominios inusuales o direcciones de correo electrónico que no coincidan con el nombre del remitente.                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Lenguaje urgente o amenazante</p>
                  <p className="text-sm text-gray-600">
                    Los correos electrónicos de phishing suelen crear una sensación de urgencia para presionarte a actuar rápidamente.                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Solicitudes de información confidencial</p>
                  <p className="text-sm text-gray-600">
                    Legitimate organizations never ask for passwords, SSN, or financial details via email
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Enlaces sospechosos</p>
                  <p className="text-sm text-gray-600">
                    Pasa el cursor sobre los enlaces para comprobar la URL real antes de hacer clic. Ten cuidado con los enlaces acortados.                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Saludos genéricos</p>
                  <p className="text-sm text-gray-600">
                    El uso de "Estimado cliente" o "Estimado usuario" en lugar de su nombre real suele ser una señal de alerta.                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                <div>
                  <p className="font-medium text-gray-900">Mala gramática y ortografía</p>
                  <p className="text-sm text-gray-600">
                    Las organizaciones profesionales revisan cuidadosamente sus comunicaciones.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-5xl mx-auto mt-8 flex gap-4 justify-center">
        <Button
          onClick={() => navigate("/simulation")}
          className="px-8 py-6 h-auto text-lg rounded-xl"
          style={{ backgroundColor: "#3B82F6" }}
        >
          Intenta otra vez
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="px-8 py-6 h-auto text-lg rounded-xl border-gray-300"
        >
          Volver a Inicio
        </Button>
      </div>
    </div>
  );
}