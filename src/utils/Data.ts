import { DynamicFieldData } from "../types/dynamic-control-types";

export const fields: DynamicFieldData[] = [
  {
    fieldName: "name",
    inputType: "text",
    displayName: "Name",
    defaultValue: "",
    config: {
      required: "Required"
    }

  },
  {
    fieldName: "address",
    inputType: "text",
    displayName: "Address",
    defaultValue: "",
    config: {
      required: "Required"
    }
  }
];