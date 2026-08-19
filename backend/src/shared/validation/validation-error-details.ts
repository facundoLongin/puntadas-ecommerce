import type { ZodIssue } from "zod";

type FieldDescription = {
  label: string;
  hint: string;
};

const fieldDescriptions: Record<string, FieldDescription> = {
  firstName: {
    label: "Nombre",
    hint: "Ingresá tu nombre con al menos 2 caracteres."
  },
  lastName: {
    label: "Apellido",
    hint: "Ingresá tu apellido con al menos 2 caracteres."
  },
  email: {
    label: "Email",
    hint: "Usá un email válido, por ejemplo nombre@example.com."
  },
  phone: {
    label: "Teléfono",
    hint: "Ingresá al menos 6 caracteres. Puede incluir código de área."
  },
  password: {
    label: "Contraseña",
    hint: "Debe tener al menos 8 caracteres."
  },
  confirmPassword: {
    label: "Confirmar contraseña",
    hint: "Debe coincidir exactamente con la contraseña."
  },
  "address.street": {
    label: "Calle",
    hint: "Ingresá el nombre de la calle."
  },
  "address.streetNumber": {
    label: "Número",
    hint: "Ingresá la altura o número de la dirección."
  },
  "address.city": {
    label: "Ciudad",
    hint: "Ingresá la ciudad de entrega."
  },
  "address.province": {
    label: "Provincia",
    hint: "Ingresá la provincia de entrega."
  },
  "address.postalCode": {
    label: "Código postal",
    hint: "Ingresá al menos 4 caracteres."
  }
};

function getFieldPath(issue: ZodIssue) {
  return issue.path.join(".");
}

function describeField(field: string): FieldDescription {
  return fieldDescriptions[field] ?? {
    label: field || "Formulario",
    hint: "Revisá el valor ingresado."
  };
}

export function toValidationErrorDetails(issues: ZodIssue[]) {
  return issues.map((issue) => {
    const field = getFieldPath(issue);
    const description = describeField(field);

    return {
      field,
      label: description.label,
      message: issue.message,
      hint: description.hint
    };
  });
}
