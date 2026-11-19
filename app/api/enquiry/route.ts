import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  validateEnquiry,
  type EnquiryPayload,
} from "@/projects/templates/landing3/lib/enquiry";

export const runtime = "nodejs"; // Nodemailer needs Node, not the edge runtime

// Receives the enquiry form (POST /api/enquiry) and emails it with Nodemailer.
// Needs these in .env.local (see .env.example): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO_EMAIL

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (value: unknown, max = 300) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const data = (await request
    .json()
    .catch(() => null)) as Partial<EnquiryPayload> | null;
  if (!data) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled = bot. Pretend it worked, send nothing.
  if (clean(data.website)) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { errors, error: "Please check the highlighted fields." },
      { status: 400 },
    );
  }

    // TEMP: Log all enquiry data instead of sending email
  console.log("========== NEW ENQUIRY RECEIVED ==========");
  console.log("Enquiry Data:", JSON.stringify(data, null, 2));
  console.log("==========================================");

  // return NextResponse.json({ ok: true, message: "Enquiry received successfully." });

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    ENQUIRY_TO_EMAIL,
    ENQUIRY_FROM_EMAIL,
  } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO_EMAIL) {
    console.error(
      "Enquiry email is not configured. Set the SMTP_* and ENQUIRY_TO_EMAIL variables.",
    );
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please call us." },
      { status: 500 },
    );
  }

  const slug = clean(data.source).replace(/^project:/, "");
  const projectName = clean(data.projectName) || slug || "Unknown project";
  const rows: [string, string][] = [
    ["Project", projectName],
    ["Page", clean(data.pageUrl, 500) || (slug ? `/${slug}` : "-")],
    ["Button clicked", clean(data.trigger) || "-"],
    ["Name", clean(data.name)],
    ["Phone", clean(data.phone, 30)],
    ["Email", clean(data.email) || "-"],
    ["Configuration", clean(data.configuration) || "-"],
    ["Message", clean(data.message, 1000) || "-"],
    [
      "Received",
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    ],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd"><b>${escapeHtml(label)}</b></td><td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Zenvara Enquiries" <${ENQUIRY_FROM_EMAIL ?? SMTP_USER}>`,
      to: ENQUIRY_TO_EMAIL,
      replyTo: clean(data.email) || undefined,
      subject: `New Enquiry - ${projectName}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Enquiry email failed:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please call us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
