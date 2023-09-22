export const config = {
    runtime: "edge",
};

export default function handler(req) {
    const { language } = req.query;
    // Personalization logic based on user preferences
    let greeting;
    if (language === "en") {
        greeting = "Hello! Welcome!";
    } else if (language === "fr") {
        greeting = "Bonjour! Bienvenue!";
    } else if (language === "es") {
        greeting = "¡Hola! ¡Bienvenido!";
    } else {
        greeting = "Welcome!";
    }
    return new Response(greeting);
}
