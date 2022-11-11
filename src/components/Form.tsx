import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "../types/dynamic-control-types";
import { DynamicControl } from "../utils/DynamicControl";

interface FormProps {
  fields: DynamicFieldData[];
  onSubmit: (data: any, error: any) => void;
}

export const Form = ({ fields, onSubmit }: FormProps) => {
  const formMethods = useForm();
  const {
    handleSubmit,
		formState: { isSubmitting, errors, dirtyFields, isValid}
  } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        {fields.map((d, i) => (
          <div key={d.fieldName} className='mb-5'>
            <div className="mb-1">{d.displayName}</div>
            <DynamicControl data={d} errors={errors}/>
          </div>
        ))}
      </FormProvider>
      <button type="submit" disabled={!isValid} className={classNames("font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none", {
        "bg-gray-300 hover:bg-gray-300 text-gray-700" : !isValid,
        "bg-blue-700 hover:bg-blue-800 text-white": isValid
      })}>ADD INTEGRATION</button>
    </form>
  );
};
