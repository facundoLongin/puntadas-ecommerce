import { z } from "zod";

const requiredText = z.string().trim().min(1, "Campo obligatorio");

export const registerSchema = z
  .object({
    firstName: requiredText.min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: requiredText.min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Email invalido").trim().toLowerCase(),
    phone: requiredText.min(6, "Telefono invalido"),
    password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirma la contrasena"),
    address: z.object({
      street: requiredText,
      streetNumber: requiredText,
      apartment: z.string().trim().optional(),
      city: requiredText,
      province: requiredText,
      postalCode: requiredText.min(4, "Codigo postal invalido")
    })
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().email("Email invalido").trim().toLowerCase(),
  password: z.string().min(1, "Campo obligatorio")
});
