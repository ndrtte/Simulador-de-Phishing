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

type EmailTag = {
  label: string;
  color: string;
  bgColor: string;
};

type Email = {
  id: number;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  time: string;
  isPhishing: boolean;
  body: string;
  isCustom?: boolean;
  tags?: EmailTag[];
};

const defaultEmails: Email[] = [
  {
    id: 1,
    from: "Equipo de Soporte IT",
    fromEmail: "support@yourcompany.com",
    subject: "Actualización semanal de seguridad",
    preview: "Tu resumen semanal de seguridad está listo para revisión...",
    time: "10:30 AM",
    isPhishing: false,
    body: "Hola,\n\nTu reporte semanal de seguridad ya está disponible. Aquí tienes un resumen:\n\n• No se detectaron intentos de acceso sospechosos\n• Todos los sistemas funcionando correctamente\n• No hay alertas de seguridad esta semana\n\nGracias por mantenerte alerta.\n\nSaludos,\nEquipo de Soporte IT\nyourcompany.com",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
  },
  {
    id: 2,
    from: "Alerta de Seguridad",
    fromEmail: "no-reply@secure-verify-account.net",
    subject: "URGENTE: Verifica tu cuenta ahora",
    preview: "Tu cuenta será suspendida en 24 horas si no verificas...",
    time: "9:45 AM",
    isPhishing: true,
    body: "ALERTA DE SEGURIDAD URGENTE\n\nEstimado usuario,\n\nHemos detectado actividad inusual en tu cuenta. Para evitar la suspensión permanente, debes verificar tu identidad inmediatamente.\n\nHaz clic aquí para verificar: http://secure-verify-account.net/login\n\nSolo tienes 24 horas para completar este proceso o tu cuenta será cerrada permanentemente.\n\nNo ignores este mensaje.\n\nDepartamento de Seguridad",
    tags: [{ label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" }],
  },
  {
    id: 3,
    from: "LinkedIn",
    fromEmail: "notifications@linkedin.com",
    subject: "Tienes 5 nuevas visitas en tu perfil",
    preview: "Mira quién ha visto tu perfil esta semana...",
    time: "Ayer",
    isPhishing: false,
    body: "Hola,\n\n¡Tu perfil está recibiendo atención! Estas son las personas que han visto tu perfil recientemente:\n\n• Sarah Johnson - Directora de Marketing\n• Michael Chen - Ingeniero de Software\n• Jessica Williams - Gerente de Producto\n• David Brown - CEO\n• Emily Davis - Especialista en RRHH\n\nMira todas las visitas en LinkedIn.\n\nSaludos,\nEl equipo de LinkedIn",
    tags: [{ label: "Social", color: "#8B5CF6", bgColor: "#EDE9FE" }],
  },
  {
    id: 4,
    from: "PayPal",
    fromEmail: "service@paypa1-security.com",
    subject: "Actividad de pago inusual detectada",
    preview: "Se procesó un pago de $847.99 desde tu cuenta...",
    time: "Ayer",
    isPhishing: true,
    body: "Aviso de Seguridad PayPal\n\nHemos detectado un pago de $847.99 USD desde tu cuenta.\n\nDetalles de la transacción:\nMonto: $847.99 USD\nDestinatario: TechStore International\nFecha: 18 de marzo de 2026\n\nSi no autorizaste este pago, inicia sesión inmediatamente:\nhttp://paypa1-security.com/dispute-transaction\n\nNota: El correo contiene un '1' en lugar de 'l' en paypal, una técnica común de phishing.\n\nEquipo de Seguridad PayPal",
    tags: [
      { label: "Banco", color: "#059669", bgColor: "#D1FAE5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
  },
  {
    id: 5,
    from: "Amazon",
    fromEmail: "orders@amazon.com",
    subject: "Tu pedido ha sido enviado",
    preview: "El pedido #123-4567890-1234567 está en camino...",
    time: "Hace 2 días",
    isPhishing: false,
    body: "Hola,\n\n¡Buenas noticias! Tu pedido ha sido enviado.\n\nNúmero de pedido: #123-4567890-1234567\nTransportista: UPS\nNúmero de seguimiento: 1Z999AA10123456784\n\nEntrega estimada: 20 de marzo de 2026\n\nRastrea tu paquete en Amazon.com\n\nGracias por comprar con nosotros.\n\nServicio al Cliente Amazon",
    tags: [{ label: "Compras", color: "#F59E0B", bgColor: "#FEF3C7" }],
  },
  {
    id: 6,
    from: "CEO - John Smith",
    fromEmail: "jsmith@temp-mail-service.biz",
    subject: "Urgente: Necesito tu ayuda",
    preview: "Necesito que manejes algo confidencial de inmediato...",
    time: "Hace 3 días",
    isPhishing: true,
    body: "Hola,\n\nEstoy en reuniones continuas y necesito que manejes algo urgente.\n\n¿Puedes comprar $500 en tarjetas de regalo (Apple o Google) para un evento de clientes?\n\nEnvíame los códigos por correo. Te reembolsaré inmediatamente.\n\nEsto es confidencial y urgente.\n\nGracias,\nJohn Smith\nCEO",
    tags: [
      { label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
  },
  {
    id: 7,
    from: "Cuenta Microsoft",
    fromEmail: "account-security@microsoft.com",
    subject: "Se agregó información de seguridad a tu cuenta",
    preview: "Se agregó un nuevo método de verificación...",
    time: "Hace 4 días",
    isPhishing: false,
    body: "Hola,\n\nSe agregó recientemente un nuevo método de verificación a tu cuenta Microsoft:\n\nMétodo: Aplicación autenticadora\nDispositivo: iPhone 13\nUbicación: San Francisco, CA\nFecha: 14 de marzo de 2026\n\nSi no fuiste tú, protege tu cuenta en account.microsoft.com\n\nSaludos,\nEquipo Microsoft",
    tags: [{ label: "Seguridad", color: "#6366F1", bgColor: "#E0E7FF" }],
  },
  {
    id: 8,
    from: "Seguridad Bancaria",
    fromEmail: "alerts@bankofamerica-secure.com",
    subject: "Tu cuenta ha sido bloqueada",
    preview: "Hemos bloqueado tu cuenta por actividad sospechosa...",
    time: "Hace 5 días",
    isPhishing: true,
    body: "ALERTA DE SEGURIDAD DE CUENTA\n\nTu cuenta ha sido bloqueada temporalmente debido a múltiples intentos fallidos de inicio de sesión.\n\nPara desbloquearla, verifica tu identidad:\n\nUsuario: [Tu Usuario]\nSSN: [Últimos 4 dígitos]\nNúmero de cuenta: [Número completo]\n\nHaz clic aquí para verificar: http://bankofamerica-secure.com/unlock\n\nImportante: Los bancos reales nunca solicitan información sensible completa por correo.\n\nDepartamento de Seguridad",
    tags: [
      { label: "Banco", color: "#059669", bgColor: "#D1FAE5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
  },
  {
    id: 9,
    from: "Netflix",
    fromEmail: "billing@netflix.com",
    subject: "Tu método de pago necesita actualización",
    preview: "Tenemos problemas con tu información de pago...",
    time: "Hace 6 días",
    isPhishing: false,
    body: "Hola,\n\nEstamos teniendo problemas al procesar tu pago de Netflix.\n\nPara mantener tu cuenta activa, actualiza tu método de pago en los próximos 5 días.\n\nActualizar método de pago\n\nSi ya lo hiciste, ignora este mensaje.\n\nGracias,\nEquipo de Netflix",
    tags: [{ label: "Suscripción", color: "#EC4899", bgColor: "#FCE7F3" }],
  },
  {
    id: 10,
    from: "Notificación IRS",
    fromEmail: "notices@irs-refund.biz",
    subject: "Reembolso de impuestos disponible",
    preview: "Eres elegible para un reembolso de $1,847...",
    time: "Hace 1 semana",
    isPhishing: true,
    body: "SERVICIO DE IMPUESTOS INTERNOS\n\nEstimado contribuyente,\n\nNuestros registros indican que eres elegible para un reembolso de $1,847.00.\n\nPara reclamarlo, verifica tu información:\n- Número de Seguro Social\n- Datos bancarios\n- Licencia de conducir\n\nReclamar reembolso: http://irs-refund.biz/claim\n\nEsta oferta expira en 48 horas.\n\nDepartamento de Reembolsos",
    tags: [
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
      { label: "Promoción", color: "#10B981", bgColor: "#D1FAE5" },
    ],
  },
  {
    id: 11,
    from: "Spotify",
    fromEmail: "support@spotify.com",
    subject: "¡Tu Spotify Wrapped 2026 está listo!",
    preview: "Descubre tus canciones y artistas más escuchados...",
    time: "Hace 1 semana",
    isPhishing: false,
    body: "¡Hola amante de la música!\n\nTu Spotify Wrapped 2026 ya está disponible.\n\nArtista más escuchado: Taylor Swift\nCanción más escuchada: Anti-Hero\nMinutos escuchados: 45,230\n\nVer Wrapped\n\n¡Gracias por otro gran año!\nEquipo Spotify",
    tags: [{ label: "Entretenimiento", color: "#14B8A6", bgColor: "#CCFBF1" }],
  },
  {
    id: 12,
    from: "Soporte Apple",
    fromEmail: "support@apple-security.net",
    subject: "Tu Apple ID ha sido bloqueado",
    preview: "Actividad sospechosa detectada...",
    time: "Hace 1 semana",
    isPhishing: true,
    body: "Alerta de seguridad Apple ID\n\nTu cuenta ha sido bloqueada por intentos sospechosos.\n\nDispositivo: PC Windows\nUbicación: Moscú, Rusia\nFecha: 15 de marzo de 2026\n\nDesbloquea tu cuenta:\nhttp://apple-security.net/unlock\n\nProporciona tu contraseña para restaurar acceso.\n\nEquipo Apple",
    tags: [
      { label: "Seguridad", color: "#6366F1", bgColor: "#E0E7FF" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
  },
  {
    id: 13,
    from: "Google Workspace",
    fromEmail: "admin@googleworkspace.com",
    subject: "Límite de almacenamiento alcanzado",
    preview: "Tu Google Drive está al 95%...",
    time: "Hace 2 semanas",
    isPhishing: false,
    body: "Hola,\n\nTu almacenamiento está casi lleno (19 de 20 GB).\n\nPuedes:\n• Eliminar archivos\n• Comprar más almacenamiento\n\nAdministrar almacenamiento\n\nGracias,\nEquipo Google",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
  },
  {
    id: 14,
    from: "DHL Entregas",
    fromEmail: "tracking@dh1-delivery.com",
    subject: "Entrega fallida - acción requerida",
    preview: "No pudimos entregar tu paquete...",
    time: "Hace 2 semanas",
    isPhishing: true,
    body: "Aviso DHL\n\nIntentamos entregar tu paquete pero no había nadie.\n\nPara reprogramar:\nhttp://dh1-delivery.com/reschedule\n\nNota: El dominio usa '1' en lugar de 'l'.\n\nServicio DHL",
    tags: [
      { label: "Entrega", color: "#F97316", bgColor: "#FFEDD5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
  },
  {
    id: 15,
    from: "GitHub",
    fromEmail: "noreply@github.com",
    subject: "Nuevo push en tu repositorio",
    preview: "Se agregaron 3 commits...",
    time: "Hace 2 semanas",
    isPhishing: false,
    body: "Hola,\n\nHubo actividad reciente en tu repositorio.\n\n3 commits nuevos:\n• Actualizar README\n• Corregir bug\n• Nueva feature\n\nVer en GitHub\n\nSaludos,\nGitHub",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
  },
];

export function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailCount = location.state?.emailCount || 10;

  // Load custom emails from localStorage and merge with default emails
  const [allEmails, setAllEmails] = useState<Email[]>(() => {
    const customEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]",
    );
    return [...defaultEmails, ...customEmails];
  });

  // Select only the specified number of emails
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [responses, setResponses] = useState<{
    [key: number]: { action: string; correct: boolean };
  }>({});
  const [currentFeedback, setCurrentFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  // Initialize emails on mount
  useEffect(() => {
    const customEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]",
    );
    const mergedEmails = [...defaultEmails, ...customEmails];
    setAllEmails(mergedEmails);

    // Shuffle and select emails
    const shuffled = [...mergedEmails].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, emailCount);
    setEmails(selected);
    setSelectedEmail(selected[0] || null);
  }, [emailCount]);

  const totalEmails = emails.length;
  const completedEmails = Object.keys(responses).length;
  const currentEmailIndex = selectedEmail
    ? emails.findIndex((e) => e.id === selectedEmail.id) + 1
    : 0;
  const progressPercentage =
    totalEmails > 0 ? (completedEmails / totalEmails) * 100 : 0;

  const handleAction = (action: "report" | "ignore" | "open") => {
    if (!selectedEmail || responses[selectedEmail.id]) return;

    let correct = false;
    let message = "";

    if (selectedEmail.isPhishing && action === "report") {
      correct = true;
      message = "¡Correcto! Este era un correo electrónico de phishing.";
    } else if (!selectedEmail.isPhishing && action === "open") {
      correct = true;
      message = "¡Correcto! Este era un correo electrónico legítimo.";
    } else if (selectedEmail.isPhishing && action === "open") {
      correct = false;
      message =
        "Incorrecto. Se trataba de un correo electrónico de phishing; deberías haberlo denunciado.";
    } else if (!selectedEmail.isPhishing && action === "report") {
      correct = false;
      message = "Incorrecto. Este era un correo electrónico legítimo.";
    } else {
      // Ignore action
      correct = false;
      message = "Usted optó por ignorar este correo electrónico.";
    }

    setResponses((prev) => ({
      ...prev,
      [selectedEmail.id]: { action, correct },
    }));

    setCurrentFeedback({ correct, message });

    // Auto-dismiss feedback after 3 seconds
    setTimeout(() => {
      setCurrentFeedback(null);
    }, 3000);
  };

  const handleFinish = () => {
    // Pass results via state to results page
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
            <h1 className="text-2xl font-bold text-gray-900">Email Inbox</h1>
            <p className="text-sm text-gray-600">
              Revisa cada correo electrónico y decide si es seguro o si se trata
              de phishing.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Progress</p>
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
                View Results
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
            Viewing Email {currentEmailIndex} of {totalEmails}
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
              Inbox ({totalEmails})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {emails.map((email) => {
              const response = responses[email.id];
              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                    selectedEmail?.id === email.id
                      ? "border-l-4 pl-3"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor:
                      selectedEmail?.id === email.id ? "#EFF6FF" : undefined,
                    borderLeftColor:
                      selectedEmail?.id === email.id ? "#3B82F6" : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {email.from}
                        </p>
                        {email.isCustom && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "#DBEAFE",
                              color: "#1E40AF",
                            }}
                          >
                            Custom
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
                        {email.subject}
                      </p>
                      {email.tags && email.tags.length > 0 && (
                        <div className="flex gap-1 mb-1">
                          {email.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: tag.bgColor,
                                color: tag.color,
                              }}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 truncate">
                        {email.preview}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                      {email.time}
                    </span>
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
                    {selectedEmail.subject}
                  </h2>
                  {selectedEmail.tags && selectedEmail.tags.length > 0 && (
                    <div className="flex gap-2 ml-4">
                      {selectedEmail.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-sm px-3 py-1 rounded-lg font-medium"
                          style={{
                            backgroundColor: tag.bgColor,
                            color: tag.color,
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: "#3B82F6" }}
                    >
                      {selectedEmail.from.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedEmail.from}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedEmail.fromEmail}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 ml-auto">
                    {selectedEmail.time}
                  </span>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!responses[selectedEmail.id] && (
                <div
                  className="p-6 border-t border-gray-200"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <div className="max-w-3xl">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      What would you do with this email?
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAction("open")}
                        className="flex items-center gap-2 rounded-lg"
                        style={{ backgroundColor: "#3B82F6" }}
                      >
                        <Eye className="w-4 h-4" />
                        Open
                      </Button>
                      <Button
                        onClick={() => handleAction("ignore")}
                        variant="outline"
                        className="flex items-center gap-2 rounded-lg border-gray-300"
                      >
                        <Archive className="w-4 h-4" />
                        Ignore
                      </Button>
                      <Button
                        onClick={() => handleAction("report")}
                        className="flex items-center gap-2 rounded-lg text-white"
                        style={{ backgroundColor: "#EF4444" }}
                      >
                        <Flag className="w-4 h-4" />
                        Report Phishing
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Message */}
              {responses[selectedEmail.id] && (
                <div
                  className="p-6 border-t border-gray-200"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <div
                    className="max-w-3xl p-4 rounded-xl flex items-start gap-3"
                    style={{
                      backgroundColor: responses[selectedEmail.id].correct
                        ? "#F0FDF4"
                        : "#FEF2F2",
                      border: `1px solid ${
                        responses[selectedEmail.id].correct
                          ? "#22C55E"
                          : "#EF4444"
                      }`,
                    }}
                  >
                    {responses[selectedEmail.id].correct ? (
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
                          color: responses[selectedEmail.id].correct
                            ? "#166534"
                            : "#991B1B",
                        }}
                      >
                        {responses[selectedEmail.id].correct
                          ? "¡Correcto!"
                          : "Incorrecto"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedEmail.isPhishing
                          ? "Este era un correo de phishing. Señales de alerta: dominio del remitente sospechoso, lenguaje urgente, solicitudes de información sensible."
                          : "Este era un correo legítimo de una fuente confiable."}
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
                <p className="text-lg">Select an email to view</p>
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
