import { z } from "zod";

const requiredText = z.string().trim().min(1, "Este campo es obligatorio");
const nameText = z.string().trim().min(2, "Debe tener al menos 2 caracteres");

export const registerSchema = z
  .object({
    firstName: nameText,
    lastName: nameText,
    email: z.string().email("El email debe tener un formato valido").trim().toLowerCase(),
    phone: requiredText.min(6, "El telefono debe tener al menos 6 caracteres"),
    password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "La confirmacion debe tener al menos 8 caracteres"),
    address: z.object({
      street: requiredText,
      streetNumber: requiredText,
      apartment: z.string().trim().optional(),
      city: requiredText,
      province: requiredText,
      postalCode: requiredText.min(4, "El codigo postal debe tener al menos 4 caracteres")
    })
  })
  .superRefine((input, context) => {
    if (input.password.length >= 8 && input.confirmPassword.length >= 8 && input.password !== input.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Las contrasenas no coinciden",
        path: ["confirmPassword"]
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email("El email debe tener un formato valido").trim().toLowerCase(),
  password: z.string().min(1, "La contrasena es obligatoria")
});
