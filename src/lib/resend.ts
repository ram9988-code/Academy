// import "server-only";
import { Resend } from "resend";

import { env } from "./env";

const resend = new Resend(env.EMAIL_API_KEY);
export default resend;
