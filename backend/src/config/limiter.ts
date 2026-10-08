import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  limit: 5, // cantidad de peticiones por minuto
  message: { error: "Has alcanzado el limite de peticiones" },
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});
