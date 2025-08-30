import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  console.log(process.env.RESEND_API_KEY ? "Clé OK" : "Clé manquante");

  try {
    const body: ContactBody = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont obligatoires." }),
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "LuxiLearn Contact <onboarding@resend.dev>", // Domaine test
      to: "bekanticode@gmail.com",
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log("Email envoyé, réponse Resend :", result);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return new Response(
      JSON.stringify({ error: "Impossible d'envoyer l'email." }),
      { status: 500 }
    );
  }
}
