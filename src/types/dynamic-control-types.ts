import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "select" | "number" | "checkbox";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DynamicFieldData {
  displayName: string;
  fieldName: string;
  inputType: ControlType;
  defaultValue: any;
  options?: SelectOption[];
  config?: RegisterOptions;
}
