import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: settingsRows } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', ['gmail_user', 'gmail_app_password'])

  const getSetting = (key: string, fallback = '') =>
    settingsRows?.find((r) => r.key === key)?.value ?? fallback

  const gmailUser = getSetting('gmail_user') || process.env.GMAIL_USER
  const gmailPass = getSetting('gmail_app_password') || process.env.GMAIL_APP_PASSWORD
  const toEmail = gmailUser

  if (!gmailUser || !gmailPass) {
    return NextResponse.json({ error: 'Serviço de email não configurado.' }, { status: 503 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Arquitetura Organizada" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `Contato pelo site — ${name}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Erro ao enviar email.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
