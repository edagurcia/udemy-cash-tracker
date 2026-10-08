import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTracker <noreply@cashtracker.com>",
      to: user.email,
      subject: "Confirma tu cuenta",
      html: `
        <p>Hola ${user.name} has creado tu cuenta en CashTracker, ya esta casi lista</p>
        <p>Visita el siguiente enlace:</p>
        <a href="#">Confirmar cuenta</a>
        <p>Ingresa el código: <strong>${user.token}</strong></p>
      `,
    });

    console.log(email); // función para enviar correo
  };

  static sendPasswordResetToken = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTracker <noreply@cashtracker.com>",
      to: user.email,
      subject: "Restablecer contraseña",
      html: `
        <p>Hola ${user.name} has solicitado restablecer tu contraseña de CashTracker</p>
        <p>Visita el siguiente enlace:</p>
        <a href="#">Restablecer contraseña</a>
        <p>Ingresa el código: <strong>${user.token}</strong></p>
      `,
    });

    console.log(email); // función para enviar correo
  };
}
