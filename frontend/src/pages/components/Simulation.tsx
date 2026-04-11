import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Mail,
  Flag,
  Archive,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building2,
  Tag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Correo } from "../../types/correo";
import { obtenerCorreos } from "../../api/correo.api";
import { EmailUI } from "../../types/EmailUI";
import ReactMarkdown from "react-markdown";

export function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { dificultad, cantidad } = location.state as {
    dificultad: number;
    cantidad: number;
  };

  const [correos, setCorreos] = useState<Correo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEmails = async () => {
      const data = await obtenerCorreos(dificultad, cantidad);

      setCorreos(data);
    };

    loadEmails();
  }, []);
  useEffect(() => {
    const loadEmails = async () => {
      const systemEmails = await obtenerCorreos(dificultad, cantidad);

      const customEmails = JSON.parse(
        localStorage.getItem("customEmails") || "[]",
      );

      setCorreos([...systemEmails, ...customEmails]);
    };

    loadEmails();
  }, []);

  const [allEmails, setAllEmails] = useState<Correo[]>(() => {
    const customEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]",
    );

    return [...customEmails];
  });

  // Select only the specified number of emails
  const [emails, setEmails] = useState<EmailUI[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Correo | null>(null);
  const [responses, setResponses] = useState<{
    [key: number]: { action: string; correct: boolean };
  }>({});
  const [currentFeedback, setCurrentFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  // Initialize emails on mount
  useEffect(() => {
    const loadEmails = async () => {
      const systemEmails = await obtenerCorreos(dificultad, cantidad);

      const customEmails = JSON.parse(
        localStorage.getItem("customEmails") || "[]",
      );

      setEmails([...systemEmails, ...customEmails]);
    };

    loadEmails();
  }, [dificultad, cantidad]);

  const totalEmails = emails.length;
  const completedEmails = Object.keys(responses).length;
  const currentEmailIndex = selectedEmail
    ? emails.findIndex((e) => e.idCorreo === selectedEmail.idCorreo) + 1
    : 0;
  const progressPercentage =
    totalEmails > 0 ? (completedEmails / totalEmails) * 100 : 0;

  const handleAction = (action: "report" | "ignore" | "open") => {
    if (!selectedEmail || responses[selectedEmail.idCorreo]) return;

    let correct = false;
    let message = "";

    if (selectedEmail.esPhishing && action === "report") {
      correct = true;
      message = "¡Correcto! Este era un email de phishing.";
    } else if (!selectedEmail.esPhishing && action === "open") {
      correct = true;
      message = "¡Correcto! Este era un email legítimo.";
    } else if (selectedEmail.esPhishing && action === "open") {
      correct = false;
      message =
        "Incorrecto. Este era un email de phishing - deberías haberlo reportado.";
    } else if (!selectedEmail.esPhishing && action === "report") {
      correct = false;
      message = "Incorrecto. Este era un email legítimo.";
    } else {
      correct = false;
      message = "Elegiste ignorar este email.";
    }

    setResponses((prev) => ({
      ...prev,
      [selectedEmail.idCorreo]: { action, correct },
    }));

    setCurrentFeedback({ correct, message });

    setTimeout(() => {
      setCurrentFeedback(null);
    }, 3000);
  };

  const handleFinish = () => {
    const correctCount = Object.values(responses).filter(
      (r) => r.correct,
    ).length;
    const totalCount = Object.keys(responses).length;
    const detectionRate =
      totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const errorRate =
      totalCount > 0
        ? Math.round(((totalCount - correctCount) / totalCount) * 100)
        : 0;

    navigate("/results", {
      state: {
        detectionRate,
        errorRate,
        correctCount,
        totalCount,
        responses,
      },
    });
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "#F5F7FA" }}
    >
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bandeja de Entrada
            </h1>
            <p className="text-sm text-gray-600">
              Revisa cada email y decide si es seguro o phishing
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Progreso</p>
              <p className="text-lg font-semibold" style={{ color: "#3B82F6" }}>
                {completedEmails} / {totalEmails}
              </p>
            </div>
            {completedEmails === totalEmails && completedEmails > 0 && (
              <Button
                onClick={handleFinish}
                className="rounded-lg"
                style={{ backgroundColor: "#22C55E" }}
              >
                Ver Resultados
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#3B82F6",
            }}
          />
        </div>

        {/* Current Email Indicator */}
        {selectedEmail && (
          <div className="mt-2 text-sm text-gray-600">
            Viendo Email {currentEmailIndex} de {totalEmails}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Inbox List - Left Panel */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Bandeja de Entrada ({totalEmails})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {emails.map((email) => {
              const response = responses[email.idCorreo];
              return (
                <div
                  key={email.idCorreo}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedEmail?.idCorreo === email.idCorreo
                      ? "border-l-4 pl-3"
                      : "hover:bg-gray-50"
                    }`}
                  style={{
                    backgroundColor:
                      selectedEmail?.idCorreo === email.idCorreo
                        ? "#EFF6FF"
                        : undefined,
                    borderLeftColor:
                      selectedEmail?.idCorreo === email.idCorreo
                        ? "#3B82F6"
                        : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {email.nombreRemitente}
                        </p>
                        {email.isCustom && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "#DBEAFE",
                              color: "#1E40AF",
                            }}
                          >
                            Personalizado
                          </span>
                        )}
                        {response && (
                          <div className="flex-shrink-0">
                            {response.correct ? (
                              <CheckCircle
                                className="w-4 h-4"
                                style={{ color: "#22C55E" }}
                              />
                            ) : (
                              <XCircle
                                className="w-4 h-4"
                                style={{ color: "#EF4444" }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 truncate mb-1">
                        {email.asunto}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {email.cuerpoCorreo}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Detail - Right Panel */}
        <div className="flex-1 bg-white flex flex-col">
          {selectedEmail ? (
            <>
              {/* Email Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 flex-1">
                    {selectedEmail.asunto}
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: "#3B82F6" }}
                    >
                      {selectedEmail.nombreRemitente.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedEmail.nombreRemitente}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedEmail.correoRemitente}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl">
                  <ReactMarkdown>
                    {selectedEmail.cuerpoCorreo}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Action Buttons */}
              {!responses[selectedEmail.idCorreo] && (
                <div
                  className="p-6 border-t border-gray-200"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <div className="max-w-3xl">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      ¿Qué harías con este email?
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAction("open")}
                        className="flex items-center gap-2 rounded-lg"
                        style={{ backgroundColor: "#3B82F6" }}
                      >
                        <Eye className="w-4 h-4" />
                        Abrir
                      </Button>
                      <Button
                        onClick={() => handleAction("ignore")}
                        variant="outline"
                        className="flex items-center gap-2 rounded-lg border-gray-300"
                      >
                        <Archive className="w-4 h-4" />
                        Ignorar
                      </Button>
                      <Button
                        onClick={() => handleAction("report")}
                        className="flex items-center gap-2 rounded-lg text-white"
                        style={{ backgroundColor: "#EF4444" }}
                      >
                        <Flag className="w-4 h-4" />
                        Reportar Phishing
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Message */}
              {responses[selectedEmail.idCorreo] && (
                <div
                  className="p-6 border-t border-gray-200"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <div
                    className="max-w-3xl p-4 rounded-xl flex items-start gap-3"
                    style={{
                      backgroundColor: responses[selectedEmail.idCorreo].correct
                        ? "#F0FDF4"
                        : "#FEF2F2",
                      border: `1px solid ${responses[selectedEmail.idCorreo].correct
                          ? "#22C55E"
                          : "#EF4444"
                        }`,
                    }}
                  >
                    {responses[selectedEmail.idCorreo].correct ? (
                      <CheckCircle
                        className="w-6 h-6 flex-shrink-0"
                        style={{ color: "#22C55E" }}
                      />
                    ) : (
                      <XCircle
                        className="w-6 h-6 flex-shrink-0"
                        style={{ color: "#EF4444" }}
                      />
                    )}
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{
                          color: responses[selectedEmail.idCorreo].correct
                            ? "#166534"
                            : "#991B1B",
                        }}
                      >
                        {responses[selectedEmail.idCorreo].correct
                          ? "¡Correcto!"
                          : "Incorrecto"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedEmail.esPhishing
                          ? "Este era un email de phishing. Señales de alerta: dominio sospechoso del remitente, lenguaje urgente, solicitudes de información sensible."
                          : "Este era un email legítimo de una fuente confiable."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Selecciona un email para ver</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {currentFeedback && (
        <div
          className="fixed bottom-6 right-6 p-4 rounded-xl shadow-xl max-w-md animate-in slide-in-from-bottom z-50"
          style={{
            backgroundColor: currentFeedback.correct ? "#F0FDF4" : "#FEF2F2",
            border: `1px solid ${currentFeedback.correct ? "#22C55E" : "#EF4444"}`,
          }}
        >
          <div className="flex items-start gap-3">
            {currentFeedback.correct ? (
              <CheckCircle
                className="w-6 h-6 flex-shrink-0"
                style={{ color: "#22C55E" }}
              />
            ) : (
              <XCircle
                className="w-6 h-6 flex-shrink-0"
                style={{ color: "#EF4444" }}
              />
            )}
            <p
              className="font-medium"
              style={{
                color: currentFeedback.correct ? "#166534" : "#991B1B",
              }}
            >
              {currentFeedback.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
