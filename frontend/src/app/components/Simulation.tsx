import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Mail, Flag, Archive, Eye, CheckCircle, XCircle, AlertTriangle, Building2, Tag } from "lucide-react";
import { Button } from "./ui/button";

type EmailTag = {
  label: string;
  color: string;
  bgColor: string;
};

type DifficultyLevel = "facil" | "intermedio" | "dificil";

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
  difficulty: DifficultyLevel;
};

const defaultEmails: Email[] = [
  {
    id: 1,
    from: "Equipo de Soporte TI",
    fromEmail: "soporte@tuempresa.com",
    subject: "Actualización Semanal de Seguridad",
    preview: "Tu resumen de seguridad semanal está listo para revisar...",
    time: "10:30 AM",
    isPhishing: false,
    body: "Hola,\n\nTu reporte semanal de seguridad ya está disponible. Aquí un resumen:\n\n• No se detectaron intentos de inicio de sesión sospechosos\n• Todos los sistemas operando normalmente\n• Sin alertas de seguridad esta semana\n\nGracias por mantenerte vigilante.\n\nSaludos,\nEquipo de Soporte TI\ntuempresa.com",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
    difficulty: "intermedio",
  },
  {
    id: 2,
    from: "Alerta de Seguridad",
    fromEmail: "no-responder@verificar-cuenta-segura.net",
    subject: "URGENTE: Verifica tu Cuenta Ahora",
    preview: "Tu cuenta será suspendida en 24 horas a menos que la verifiques...",
    time: "9:45 AM",
    isPhishing: true,
    body: "ALERTA DE SEGURIDAD URGENTE\n\nEstimado Usuario,\n\nHemos detectado actividad inusual en tu cuenta. Para prevenir la suspensión permanente, debes verificar tu identidad inmediatamente.\n\nHaz clic aquí para verificar: http://verificar-cuenta-segura.net/login\n\nSolo tienes 24 horas para completar esta verificación o tu cuenta será cerrada permanentemente.\n\nNo ignores este mensaje.\n\nDepartamento de Seguridad",
    tags: [{ label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" }],
    difficulty: "facil",
  },
  {
    id: 3,
    from: "LinkedIn",
    fromEmail: "notificaciones@linkedin.com",
    subject: "Tienes 5 nuevas vistas de perfil",
    preview: "Mira quién ha visto tu perfil de LinkedIn esta semana...",
    time: "Ayer",
    isPhishing: false,
    body: "Hola,\n\n¡Tu perfil está recibiendo atención! Aquí están quienes vieron tu perfil recientemente:\n\n• María González - Directora de Marketing\n• Carlos Ramírez - Ingeniero de Software\n• Ana Torres - Gerente de Producto\n• Luis Martínez - CEO\n• Patricia López - Especialista en RRHH\n\nVer todas las vistas de perfil en LinkedIn.\n\nSaludos,\nEl Equipo de LinkedIn",
    tags: [{ label: "Social", color: "#8B5CF6", bgColor: "#EDE9FE" }],
    difficulty: "intermedio",
  },
  {
    id: 4,
    from: "PayPal",
    fromEmail: "servicio@paypa1-seguridad.com",
    subject: "Actividad de Pago Inusual Detectada",
    preview: "Un pago de $847.99 acaba de procesarse desde tu cuenta...",
    time: "Ayer",
    isPhishing: true,
    body: "Aviso de Seguridad de PayPal\n\nHemos detectado un pago de $847.99 USD desde tu cuenta.\n\nDetalles de la Transacción:\nMonto: $847.99 USD\nDestinatario: TechStore International\nFecha: 18 de Marzo, 2026\n\nSi no autorizaste este pago, por favor inicia sesión inmediatamente:\nhttp://paypa1-seguridad.com/disputa-transaccion\n\nNota: El correo del remitente contiene un '1' en lugar de 'l' en paypal - una táctica común de phishing.\n\nEquipo de Seguridad de PayPal",
    tags: [
      { label: "Banco", color: "#059669", bgColor: "#D1FAE5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    difficulty: "facil",
  },
  {
    id: 5,
    from: "Amazon",
    fromEmail: "pedidos@amazon.com",
    subject: "Tu pedido ha sido enviado",
    preview: "El pedido #123-4567890-1234567 está en camino...",
    time: "Hace 2 días",
    isPhishing: false,
    body: "Hola,\n\n¡Buenas noticias! Tu pedido ha sido enviado.\n\nNúmero de Pedido: #123-4567890-1234567\nTransportista: UPS\nNúmero de Rastreo: 1Z999AA10123456784\n\nEntrega Estimada: 20 de Marzo, 2026\n\nRastrear tu paquete en Amazon.com\n\n¡Gracias por comprar con nosotros!\n\nServicio al Cliente de Amazon",
    tags: [{ label: "Compras", color: "#F59E0B", bgColor: "#FEF3C7" }],
    difficulty: "intermedio",
  },
  {
    id: 6,
    from: "CEO - Juan Pérez",
    fromEmail: "jperez@servicio-correo-temp.biz",
    subject: "Urgente: Necesito tu Ayuda",
    preview: "Necesito que manejes algo confidencial de inmediato...",
    time: "Hace 3 días",
    isPhishing: true,
    body: "Hola,\n\nEstoy en reuniones consecutivas y necesito que manejes algo urgente.\n\n¿Puedes comprar $500 en tarjetas de regalo (Apple o Google) para un evento de apreciación de clientes? Las necesitamos en una hora.\n\nPor favor cómpralas y envíame los códigos por correo. Te reembolsaré inmediatamente.\n\nEsto es urgente y confidencial.\n\nGracias,\nJuan Pérez\nCEO",
    tags: [
      { label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    difficulty: "facil",
  },
  {
    id: 7,
    from: "Cuenta de Microsoft",
    fromEmail: "seguridad-cuenta@microsoft.com",
    subject: "Se agregó información de seguridad a tu cuenta",
    preview: "Se añadió un nuevo método de seguridad a tu cuenta Microsoft...",
    time: "Hace 4 días",
    isPhishing: false,
    body: "Hola,\n\nRecientemente se agregó un nuevo método de verificación de seguridad a tu cuenta de Microsoft:\n\nMétodo: Aplicación autenticadora\nDispositivo: iPhone 13\nUbicación: Ciudad de México, MX\nFecha: 14 de Marzo, 2026\n\nSi no fuiste tú, por favor asegura tu cuenta inmediatamente en account.microsoft.com\n\nSaludos,\nEquipo de Cuenta Microsoft",
    tags: [{ label: "Seguridad", color: "#6366F1", bgColor: "#E0E7FF" }],
    difficulty: "dificil",
  },
  {
    id: 8,
    from: "Seguridad Bancaria",
    fromEmail: "alertas@banco-seguro.com",
    subject: "Tu Cuenta Ha Sido Bloqueada",
    preview: "Hemos bloqueado tu cuenta debido a actividad sospechosa...",
    time: "Hace 5 días",
    isPhishing: true,
    body: "ALERTA DE SEGURIDAD DE CUENTA\n\nTu cuenta ha sido bloqueada temporalmente debido a múltiples intentos fallidos de inicio de sesión.\n\nPara desbloquear tu cuenta, por favor verifica tu identidad:\n\nNombre de usuario: [Tu Nombre de Usuario]\nRFC: [Últimos 4 dígitos]\nNúmero de Cuenta: [Número de Cuenta Completo]\n\nHaz clic aquí para verificar: http://banco-seguro.com/desbloquear\n\nImportante: Los bancos reales nunca piden RFC completo o números de cuenta por correo.\n\nDepartamento de Seguridad Bancaria",
    tags: [
      { label: "Banco", color: "#059669", bgColor: "#D1FAE5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    difficulty: "facil",
  },
  {
    id: 9,
    from: "Netflix",
    fromEmail: "facturacion@netflix.com",
    subject: "Tu método de pago necesita actualización",
    preview: "Estamos teniendo problemas con tu información de facturación actual...",
    time: "Hace 6 días",
    isPhishing: false,
    body: "Hola,\n\nEstamos teniendo problemas para procesar tu pago de tu membresía de Netflix.\n\nPara mantener tu cuenta activa, por favor actualiza tu información de pago en los próximos 5 días.\n\nActualizar Método de Pago\n\nSi recientemente actualizaste tu información de pago, por favor ignora este mensaje.\n\nGracias,\nEl Equipo de Netflix",
    tags: [{ label: "Suscripción", color: "#EC4899", bgColor: "#FCE7F3" }],
    difficulty: "dificil",
  },
  {
    id: 10,
    from: "Aviso SAT",
    fromEmail: "avisos@sat-devolucion.biz",
    subject: "Devolución de Impuestos Disponible - Reclama Ahora",
    preview: "Eres elegible para una devolución de impuestos de $1,847...",
    time: "Hace 1 semana",
    isPhishing: true,
    body: "SERVICIO DE ADMINISTRACIÓN TRIBUTARIA\n\nEstimado Contribuyente,\n\nNuestros registros indican que eres elegible para una devolución de impuestos de $1,847.00.\n\nPara reclamar tu devolución, por favor verifica tu información:\n- RFC Completo\n- Detalles de Cuenta Bancaria\n- Número de Licencia de Conducir\n\nReclamar Devolución: http://sat-devolucion.biz/reclamar\n\nEsta oferta expira en 48 horas.\n\nDepartamento de Devoluciones SAT",
    tags: [
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
      { label: "Promoción", color: "#10B981", bgColor: "#D1FAE5" },
    ],
    difficulty: "facil",
  },
  {
    id: 11,
    from: "Spotify",
    fromEmail: "soporte@spotify.com",
    subject: "¡Tu Spotify Wrapped 2026 está aquí!",
    preview: "Descubre tus canciones y artistas más escuchados este año...",
    time: "Hace 1 semana",
    isPhishing: false,
    body: "¡Hola amante de la música!\n\nTu Spotify Wrapped 2026 está listo. Mira tus canciones, artistas y podcasts favoritos de este año.\n\nTu Artista Principal: Bad Bunny\nTu Canción Principal: Monaco\nMinutos Totales Escuchados: 45,230\n\nVer Tu Wrapped\n\n¡Gracias por otro gran año!\nEl Equipo de Spotify",
    tags: [{ label: "Entretenimiento", color: "#14B8A6", bgColor: "#CCFBF1" }],
    difficulty: "intermedio",
  },
  {
    id: 12,
    from: "Soporte Apple",
    fromEmail: "soporte@apple-seguridad.net",
    subject: "Tu Apple ID ha sido bloqueado",
    preview: "Actividad sospechosa detectada en tu Apple ID...",
    time: "Hace 1 semana",
    isPhishing: true,
    body: "Alerta de Seguridad de Apple ID\n\nTu Apple ID ha sido bloqueado debido a intentos de inicio de sesión sospechosos desde un dispositivo desconocido.\n\nDispositivo: Windows PC\nUbicación: Moscú, Rusia\nHora: 15 de Marzo, 2026 2:34 AM\n\nDesbloquea tu cuenta inmediatamente:\nhttp://apple-seguridad.net/desbloquear\n\nProporciona tu contraseña de Apple ID y código de verificación para restaurar el acceso.\n\nEquipo de Seguridad de Apple",
    tags: [
      { label: "Seguridad", color: "#6366F1", bgColor: "#E0E7FF" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    difficulty: "facil",
  },
  {
    id: 13,
    from: "Google Workspace",
    fromEmail: "admin@googleworkspace.com",
    subject: "Límite de almacenamiento alcanzado",
    preview: "Tu almacenamiento de Google Drive está al 95%...",
    time: "Hace 2 semanas",
    isPhishing: false,
    body: "Hola,\n\nTu almacenamiento de Google Drive está casi lleno (19 GB de 20 GB usados).\n\nPara continuar subiendo archivos y recibiendo correos, considera:\n• Eliminar archivos innecesarios\n• Actualizar a Google One para más almacenamiento\n\nAdministrar Almacenamiento\n\nGracias,\nEquipo de Google Workspace",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
    difficulty: "dificil",
  },
  {
    id: 14,
    from: "Entrega DHL",
    fromEmail: "rastreo@dh1-entrega.com",
    subject: "Fallo en entrega de paquete - Acción Requerida",
    preview: "Intentamos entregar tu paquete pero no había nadie en casa...",
    time: "Hace 2 semanas",
    isPhishing: true,
    body: "Aviso de Entrega DHL Express\n\nIntentamos entregar el paquete #DHL7849362847 pero no había nadie disponible para recibirlo.\n\nDetalles del Paquete:\nRastreo: DHL7849362847\nRemitente: Amazon\nValor: $427.99\n\nPara reprogramar la entrega, confirma tu dirección y paga la tarifa de reentrega de $3.99:\nhttp://dh1-entrega.com/reprogramar\n\nNota: El dominio usa '1' en lugar de 'l' en DHL.\n\nServicio al Cliente DHL",
    tags: [
      { label: "Entrega", color: "#F97316", bgColor: "#FFEDD5" },
      { label: "Urgente", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    difficulty: "facil",
  },
  {
    id: 15,
    from: "GitHub",
    fromEmail: "noreply@github.com",
    subject: "Nuevo push a tu repositorio",
    preview: "Alguien hizo push de 3 commits a tu rama principal...",
    time: "Hace 2 semanas",
    isPhishing: false,
    body: "Hola,\n\nHa habido actividad reciente en tu repositorio 'mi-proyecto'.\n\n3 nuevos commits en main:\n• Actualizar README.md\n• Corregir bug de autenticación\n• Agregar nueva característica\n\nCommiteado por: juan-dev\n\nVer Cambios en GitHub\n\n¡Feliz codificación!\nGitHub",
    tags: [{ label: "Trabajo", color: "#3B82F6", bgColor: "#DBEAFE" }],
    difficulty: "intermedio",
  },
];

export function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailCount = location.state?.emailCount || 10;
  const difficulty = (location.state?.difficulty || "intermedio") as DifficultyLevel;

  // Load custom emails from localStorage and merge with default emails
  const [allEmails, setAllEmails] = useState<Email[]>(() => {
    const customEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]"
    );
    return [...defaultEmails, ...customEmails];
  });

  // Select only the specified number of emails
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [responses, setResponses] = useState<{ [key: number]: { action: string; correct: boolean } }>({});
  const [currentFeedback, setCurrentFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  // Initialize emails on mount
  useEffect(() => {
    const customEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]"
    );
    const mergedEmails = [...defaultEmails, ...customEmails];
    setAllEmails(mergedEmails);

    // Filter emails by difficulty level
    let filteredEmails = mergedEmails;
    if (difficulty === "facil") {
      // Easy: only emails marked as "facil" (obvious phishing)
      filteredEmails = mergedEmails.filter(email => email.difficulty === "facil" || email.isCustom);
    } else if (difficulty === "intermedio") {
      // Medium: emails marked as "facil" and "intermedio"
      filteredEmails = mergedEmails.filter(email =>
        email.difficulty === "facil" || email.difficulty === "intermedio" || email.isCustom
      );
    }
    // For "dificil", use all emails (no filter)

    // Shuffle and select emails
    const shuffled = [...filteredEmails].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, emailCount);
    setEmails(selected);
    setSelectedEmail(selected[0] || null);
  }, [emailCount, difficulty]);

  const totalEmails = emails.length;
  const completedEmails = Object.keys(responses).length;
  const currentEmailIndex = selectedEmail ? emails.findIndex(e => e.id === selectedEmail.id) + 1 : 0;
  const progressPercentage = totalEmails > 0 ? (completedEmails / totalEmails) * 100 : 0;

  const handleAction = (action: "report" | "ignore" | "open") => {
    if (!selectedEmail || responses[selectedEmail.id]) return;

    let correct = false;
    let message = "";

    if (selectedEmail.isPhishing && action === "report") {
      correct = true;
      message = "¡Correcto! Este era un email de phishing.";
    } else if (!selectedEmail.isPhishing && action === "open") {
      correct = true;
      message = "¡Correcto! Este era un email legítimo.";
    } else if (selectedEmail.isPhishing && action === "open") {
      correct = false;
      message = "Incorrecto. Este era un email de phishing - deberías haberlo reportado.";
    } else if (!selectedEmail.isPhishing && action === "report") {
      correct = false;
      message = "Incorrecto. Este era un email legítimo.";
    } else {
      // Ignore action
      correct = false;
      message = "Elegiste ignorar este email.";
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
    const correctCount = Object.values(responses).filter((r) => r.correct).length;
    const totalCount = Object.keys(responses).length;
    const detectionRate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const errorRate = totalCount > 0 ? Math.round(((totalCount - correctCount) / totalCount) * 100) : 0;

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
    <div className="h-screen flex flex-col" style={{ backgroundColor: "#F5F7FA" }}>
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bandeja de Entrada</h1>
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
              const response = responses[email.id];
              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedEmail?.id === email.id
                      ? "border-l-4 pl-3"
                      : "hover:bg-gray-50"
                    }`}
                  style={{
                    backgroundColor: selectedEmail?.id === email.id ? "#EFF6FF" : undefined,
                    borderLeftColor: selectedEmail?.id === email.id ? "#3B82F6" : undefined,
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
                            Personalizado
                          </span>
                        )}
                        {response && (
                          <div className="flex-shrink-0">
                            {response.correct ? (
                              <CheckCircle className="w-4 h-4" style={{ color: "#22C55E" }} />
                            ) : (
                              <XCircle className="w-4 h-4" style={{ color: "#EF4444" }} />
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
                <div className="p-6 border-t border-gray-200" style={{ backgroundColor: "#F5F7FA" }}>
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
              {responses[selectedEmail.id] && (
                <div className="p-6 border-t border-gray-200" style={{ backgroundColor: "#F5F7FA" }}>
                  <div
                    className="max-w-3xl p-4 rounded-xl flex items-start gap-3"
                    style={{
                      backgroundColor: responses[selectedEmail.id].correct
                        ? "#F0FDF4"
                        : "#FEF2F2",
                      border: `1px solid ${responses[selectedEmail.id].correct ? "#22C55E" : "#EF4444"
                        }`,
                    }}
                  >
                    {responses[selectedEmail.id].correct ? (
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#22C55E" }} />
                    ) : (
                      <XCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#EF4444" }} />
                    )}
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{
                          color: responses[selectedEmail.id].correct ? "#166534" : "#991B1B",
                        }}
                      >
                        {responses[selectedEmail.id].correct ? "¡Correcto!" : "Incorrecto"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedEmail.isPhishing
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
              <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#22C55E" }} />
            ) : (
              <XCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#EF4444" }} />
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