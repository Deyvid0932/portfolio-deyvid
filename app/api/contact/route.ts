import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/site";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portafolio Deyvid <onboarding@resend.dev>",
      to: [siteConfig.email],
      replyTo: email,
      subject: `[Portafolio] Nuevo mensaje de ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #fafafa;">
          <h2 style="color: #7c3aed; margin-top: 0;">ðŸ“© Nuevo mensaje desde tu Portafolio</h2>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
          <p style="margin: 8px 0;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Correo:</strong> <a href="mailto:${email}" style="color: #7c3aed;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Asunto:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e4e4e7;">
            <h4 style="margin-top: 0; color: #3f3f46;">Mensaje:</h4>
            <p style="white-space: pre-wrap; color: #18181b; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="font-size: 12px; color: #71717a; text-align: center;">
            Puedes responder directamente a este correo para escribirle a ${name} (${email}).
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Error en Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error interno en /api/contact:", err);
    return NextResponse.json(
      { error: "Error interno al procesar el mensaje." },
      { status: 500 }
    );
  }
}
