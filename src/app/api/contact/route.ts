import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      // Replace with a verified sender on your Resend domain once DNS is confirmed
      from: "PandaLearn Contact <hello@pandalearn.in>",
      to: "projects@vizuara.com",
      replyTo: email,
      subject: `[PandaLearn] ${subject || "New message"} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <div style="background:#7c3aed;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="color:#fff;margin:0;font-size:18px">New contact form submission</h2>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:90px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#7c3aed">${email}</a></td></tr>
              ${subject ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
            <p style="color:#374151;line-height:1.6;white-space:pre-wrap;margin:0">${message}</p>
          </div>
          <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:16px">Sent via pandalearn.in contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
