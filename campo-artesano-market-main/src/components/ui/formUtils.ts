import React, { useContext } from "react";
import { useFormContext, FieldPath, FieldValues } from "react-hook-form";
import { FormItemContext } from "./form";

// Contexto para el nombre del campo
export const FormFieldContext = React.createContext({} as { name: string });

export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext || { id: undefined };

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}
