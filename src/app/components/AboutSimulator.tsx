import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, Play, Mail, CheckCircle, PieChart, Settings, Shield, AlertTriangle, Eye, Flag, Archive } from "lucide-react";
import { Button } from "./ui/button";

export function AboutSimulator() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 rounded-lg border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#3B82F620" }}
            >
              <BookOpen className="w-8 h-8" style={{ color: "#3B82F6" }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Manual de Usuario
              </h1>
              <p className="text-lg text-gray-600">
                Guía completa para usar el simulador de phishing
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-6 h-6 mt-1" style={{ color: "#3B82F6" }} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Qué es este Simulador?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Simulador de Phishing es una herramienta educativa diseñada para ayudarte a
                identificar correos electrónicos fraudulentos en un entorno seguro. Practicarás
                reconociendo señales de advertencia comunes sin arriesgar información real.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Importante:</strong> Esta plataforma es solo para entrenamiento.
                  No se almacenan datos personales ni información sensible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Configuration */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Configurar la Simulación
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5" style={{ color: "#3B82F6" }} />
                    Seleccionar Cantidad de Emails
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Al hacer clic en "Iniciar Simulación", podrás elegir cuántos emails deseas revisar:
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-700">5</div>
                      <div className="text-sm text-gray-600">Rápido (~3 min)</div>
                    </div>
                    <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold" style={{ color: "#3B82F6" }}>10</div>
                      <div className="text-sm" style={{ color: "#3B82F6" }}>Estándar (~5 min)</div>
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-700">15</div>
                      <div className="text-sm text-gray-600">Completo (~8 min)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Play className="w-5 h-5" style={{ color: "#22C55E" }} />
                    Iniciar
                  </h3>
                  <p className="text-gray-700">
                    Después de seleccionar la cantidad de emails, haz clic en "Comenzar Simulación"
                    para empezar el entrenamiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Create Custom Emails (Optional) */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Crear Emails Personalizados (Opcional)
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Este paso es opcional. Puedes crear tus propios emails
                    para practicar con escenarios específicos de tu organización.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5" style={{ color: "#3B82F6" }} />
                    Acceder al Creador de Emails
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Desde la página principal, haz clic en el botón "Crear Email".
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Completar el Formulario
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span><strong>Nombre del remitente:</strong> Ejemplo: "IT Support Team"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span><strong>Email del remitente:</strong> Ejemplo: "support@company.com"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span><strong>Asunto:</strong> El título del email</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span><strong>Contenido:</strong> El cuerpo del mensaje</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Marcar como Phishing o Legítimo
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-green-500 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                        </div>
                        <span className="font-semibold text-green-700">Legítimo</span>
                      </div>
                      <p className="text-sm text-gray-700">Para emails seguros y confiables</p>
                    </div>
                    <div className="border-2 border-red-500 bg-red-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                        </div>
                        <span className="font-semibold text-red-700">Phishing</span>
                      </div>
                      <p className="text-sm text-gray-700">Para emails fraudulentos o sospechosos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Simulation */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Realizar la Simulación
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Interfaz de la Simulación
                  </h3>
                  <p className="text-gray-700 mb-3">
                    La pantalla está dividida en dos secciones:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border border-gray-300 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Panel Izquierdo</h4>
                      <p className="text-sm text-gray-700">
                        Lista de todos los emails en tu bandeja de entrada.
                        Los emails con etiquetas de colores indican categorías
                        (Urgente, Banco, Promoción, etc.).
                      </p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Panel Derecho</h4>
                      <p className="text-sm text-gray-700">
                        Contenido completo del email seleccionado,
                        mostrando remitente, asunto y mensaje.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Seguimiento de Progreso
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progreso</span>
                      <span className="text-sm font-semibold" style={{ color: "#3B82F6" }}>7 / 10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ width: "70%", backgroundColor: "#3B82F6" }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Viendo Email 8 de 10</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    La barra de progreso muestra cuántos emails has evaluado y cuántos quedan.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Tomar una Decisión
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Después de leer cada email, debes decidir qué acción tomar:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#3B82F620" }}
                      >
                        <Eye className="w-5 h-5" style={{ color: "#3B82F6" }} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Abrir</p>
                        <p className="text-sm text-gray-700">
                          Usa esta opción si crees que el email es legítimo y seguro de abrir.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                        <Archive className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Ignorar</p>
                        <p className="text-sm text-gray-700">
                          Usa esta opción si no estás seguro o prefieres no interactuar con el email.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#EF444420" }}
                      >
                        <Flag className="w-5 h-5" style={{ color: "#EF4444" }} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Reportar Phishing</p>
                        <p className="text-sm text-gray-700">
                          Usa esta opción si identificas señales de phishing o fraude en el email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Retroalimentación Inmediata
                  </h3>
                  <div className="space-y-3">
                    <div className="border-2 border-green-500 bg-green-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#22C55E" }} />
                        <div>
                          <p className="font-semibold text-green-700 mb-1">Correcto!</p>
                          <p className="text-sm text-gray-700">
                            Este era un email legítimo de una fuente confiable.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-red-500 bg-red-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: "#EF4444" }} />
                        <div>
                          <p className="font-semibold text-red-700 mb-1">Incorrecto</p>
                          <p className="text-sm text-gray-700">
                            Este era un email de phishing. Señales: dominio sospechoso, lenguaje urgente, solicitud de información sensible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    Después de cada decisión, recibirás retroalimentación instantánea explicando si tu elección fue correcta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Results */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interpretar los Resultados
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <PieChart className="w-5 h-5" style={{ color: "#3B82F6" }} />
                    Métricas Principales
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Al finalizar, verás un resumen completo de tu desempeño:
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">Tasa de Detección</p>
                      <p className="text-2xl font-bold" style={{ color: "#22C55E" }}>85%</p>
                      <p className="text-xs text-gray-500">Phishing identificado correctamente</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">Tasa de Error</p>
                      <p className="text-2xl font-bold" style={{ color: "#EF4444" }}>15%</p>
                      <p className="text-xs text-gray-500">Errores o falsos positivos</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Niveles de Riesgo
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 border-2 border-green-500 bg-green-50 rounded-lg p-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                      <div className="flex-1">
                        <span className="font-semibold text-green-700">Riesgo Bajo</span>
                        <span className="text-sm text-gray-700 ml-2">(90% o más)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border-2 border-yellow-500 bg-yellow-50 rounded-lg p-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                      <div className="flex-1">
                        <span className="font-semibold text-yellow-700">Riesgo Medio</span>
                        <span className="text-sm text-gray-700 ml-2">(70-89%)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border-2 border-orange-500 bg-orange-50 rounded-lg p-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F97316" }} />
                      <div className="flex-1">
                        <span className="font-semibold text-orange-700">Riesgo Alto</span>
                        <span className="text-sm text-gray-700 ml-2">(50-69%)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border-2 border-red-600 bg-red-50 rounded-lg p-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#DC2626" }} />
                      <div className="flex-1">
                        <span className="font-semibold text-red-700">Riesgo Crítico</span>
                        <span className="text-sm text-gray-700 ml-2">(Menos del 50%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Gráficos y Análisis
                  </h3>
                  <p className="text-gray-700">
                    La página de resultados incluye gráficos visuales (circular y de barras)
                    que muestran tu desempeño de manera clara y fácil de entender.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" style={{ color: "#F59E0B" }} />
            Señales de Phishing Comunes
          </h2>

          <div className="space-y-3">
            <div className="flex gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Direcciones de email sospechosas</p>
                <p className="text-sm text-gray-700">
                  Ejemplo: "support@paypa1.com" (usa el número "1" en lugar de la letra "l")
                </p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Lenguaje urgente o amenazante</p>
                <p className="text-sm text-gray-700">
                  "Tu cuenta será cerrada en 24 horas", "Acción inmediata requerida"
                </p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Solicitudes de información personal</p>
                <p className="text-sm text-gray-700">
                  Contraseñas, números de tarjetas, SSN, números de cuenta
                </p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Enlaces sospechosos</p>
                <p className="text-sm text-gray-700">
                  URLs que no coinciden con el remitente oficial, dominios extraños
                </p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-gray-200">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Saludos genéricos</p>
                <p className="text-sm text-gray-700">
                  "Estimado cliente" en lugar de tu nombre real
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
              <div>
                <p className="font-semibold text-gray-900">Errores ortográficos y gramaticales</p>
                <p className="text-sm text-gray-700">
                  Organizaciones profesionales revisan cuidadosamente sus comunicaciones
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" style={{ color: "#22C55E" }} />
            Mejores Prácticas
          </h2>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-gray-700">
                <strong>Verifica siempre el remitente:</strong> Revisa cuidadosamente la dirección de email completa
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-gray-700">
                <strong>Pasa el cursor sobre los enlaces:</strong> Verifica la URL real antes de hacer clic
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-gray-700">
                <strong>No compartas información sensible por email:</strong> Las organizaciones legítimas nunca la solicitan
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-gray-700">
                <strong>Cuando tengas dudas, verifica directamente:</strong> Contacta a la organización por canales oficiales
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
              <p className="text-gray-700">
                <strong>Practica regularmente:</strong> Usa este simulador con frecuencia para mantener tus habilidades actualizadas
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/simulation")}
            className="px-8 py-6 h-auto text-lg rounded-xl flex items-center gap-2"
            style={{ backgroundColor: "#3B82F6" }}
          >
            <Play className="w-5 h-5" />
            Comenzar Simulación
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="px-8 py-6 h-auto text-lg rounded-xl border-gray-300"
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

