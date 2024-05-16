import { Resend } from 'resend';

const resend = new Resend('re_123456789');

async function sendConfirmationEmail() {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Reserva confirmada',
      html: '<strong>¡Tu reserva ha sido confirmada!</strong>'
    });
  
    if (error) {
      return console.log(error);
    }
  
    console.log(data);
  }
  
  // Función para enviar correo de cancelación
  async function sendCancellationEmail() {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Reserva cancelada',
      html: '<strong>Lo sentimos, tu reserva ha sido cancelada.</strong>'
    });
  
    if (error) {
      return console.log(error);
    }
  
    console.log(data);
  }