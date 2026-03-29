import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Plus } from "lucide-react";
import { Button } from "./ui/button";

export function CreateEmail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    fromEmail: "",
    subject: "",
    body: "",
    isPhishing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new email object
    const newEmail = {
      id: Date.now(), 
      from: formData.from,
      fromEmail: formData.fromEmail,
      subject: formData.subject,
      preview: formData.body.substring(0, 60) + "...",
      time: "Just now",
      isPhishing: formData.isPhishing,
      body: formData.body,
      isCustom: true,
    };

    // Get existing custom emails from localStorage
    const existingEmails = JSON.parse(
      localStorage.getItem("customEmails") || "[]",
    );

    // Add new email
    localStorage.setItem(
      "customEmails",
      JSON.stringify([...existingEmails, newEmail]),
    );

    // Show success and redirect
    alert("¡Correo electrónico añadido correctamente! Aparecerá en tu próxima simulación.");
    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 rounded-lg border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Inicio
        </Button>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#3B82F620" }}
            >
              <Mail className="w-6 h-6" style={{ color: "#3B82F6" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Email</h1>
              <p className="text-gray-600">
                Diseña un correo electrónico personalizado para la simulación.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
            {/* Sender Name */}
            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre del remitente
              </label>
              <input
                type="text"
                id="from"
                name="from"
                required
                value={formData.from}
                onChange={handleChange}
                placeholder="ej., IT Support Team"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sender Email */}
            <div>
              <label
                htmlFor="fromEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo electrónico del remitente
              </label>
              <input
                type="email"
                id="fromEmail"
                name="fromEmail"
                required
                value={formData.fromEmail}
                onChange={handleChange}
                placeholder="ej., support@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="ej., Actualización de seguridad importante"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Message Content */}
            <div>
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contenido del Mensaje
              </label>
              <textarea
                id="body"
                name="body"
                required
                value={formData.body}
                onChange={handleChange}
                placeholder="Escribe aquí el mensaje de correo electrónico...."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              />
            </div>

            {/* Phishing Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Email
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isPhishing: false })
                  }
                  className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                    !formData.isPhishing
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        !formData.isPhishing
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {!formData.isPhishing && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: "#22C55E" }}
                        />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        !formData.isPhishing
                          ? "text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      Legitimo
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPhishing: true })}
                  className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                    formData.isPhishing
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.isPhishing
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.isPhishing && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: "#EF4444" }}
                        />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        formData.isPhishing ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      Phishing
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 h-auto text-lg rounded-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: "#3B82F6" }}
              >
                <Plus className="w-5 h-5" />
                Agregar Email
              </Button>
            </div>
          </div>
        </form>

        {/* Helper Text */}
        <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: "#EFF6FF",
            borderColor: "#BFDBFE",
          }}
        >
          <p className="text-sm" style={{ color: "#1E40AF" }}>
            <strong>Tip:</strong> Para los correos electrónicos de phishing,
            incluya señales de alerta comunes: como dominios de remitente
            sospechosos, lenguaje urgente, solicitudes de información
            confidencial o enlaces inusuales.
          </p>
        </div>
      </div>
    </div>
  );
}
