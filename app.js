import { SECRET_KEY } from "./secret.js";

import { AZURE_PROJECT_ENDPOINT, AZURE_API_KEY, AGENT_ID } from "./config.js";

async function sendMessageToAgent(userInput) {
    const url = `${AZURE_PROJECT_ENDPOINT}/agents/${AGENT_ID}/runs`;

    const body = {
        messages: [
            {
                role: "user",
                content: userInput
            }
        ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": SECRET_KEY // se inyectará más adelante
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Error comunicándose con Azure: " + response.statusText);
    }

    const result = await response.json();

    // Extraer mensaje de la respuesta del agente
    const messages = result?.messages || [];
    const reply = messages.find(m => m.role === "assistant");

    return reply ? reply.content : "(sin respuesta 🤖)";
}

// Ejemplo de prueba en consola (puedes borrar luego)
window.chatTest = async () => {
    const respuesta = await sendMessageToAgent("Hola, ¿qué trámite necesito para apostillar un documento?");
    console.log("respuesta:", respuesta);
};

