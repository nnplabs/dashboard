import { useFormContext } from "react-hook-form";
import Input from "../components/Input";
import { DynamicFieldData } from "../types/dynamic-control-types";

type FormDynamicControlData = {
  data: DynamicFieldData;
  errors: any;
};

export const DynamicControl = ({ data, errors }: FormDynamicControlData) => {
  const {
    inputType,
    fieldName,
    defaultValue,
    options = [],
    config = {},
  } = data;
  const { register } = useFormContext();

  switch (inputType) {
    case "text":
      return (
        <Input
          type="text"
          textMsg={errors[fieldName]?.message}
          isErrorHighlighted={errors[fieldName]}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          textMsg={errors[fieldName]?.message}
          isErrorHighlighted={errors[fieldName]}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    default:
      return <input type="text" />;
  }
};
