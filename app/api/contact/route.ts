import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    return NextResponse.json({ error: 'Serviço de email não configurado.' }, { status: 503 })
  }

  // Busca o email de destino cadastrado no dashboard
  const supabase = await createClient()
  const { data: row } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'contact_email')
    .single()

  const toEmail = row?.value ?? gmailUser

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Domu Arquitetura" <${gmailUser}>`,
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
