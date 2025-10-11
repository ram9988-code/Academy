import { betterAuth } from "better-auth";
import { emailOTP, admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./db";
import { env } from "./env";
import resend from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ otp, email }) {
        const { data, error } = await resend.emails.send({
          from: "Academy <onboarding@resend.dev>",
          to: [email],
          subject: "Academy - Verify your email",
          react: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
});
