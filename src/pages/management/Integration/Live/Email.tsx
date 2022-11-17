import { Form } from "../../../../components/Form";
import { fields } from "../../../../utils/Data";

export function EmailLiveIntegrations() {


  function onSubmit(data:any, error:any) {
		// your logic on what to do with data 
    console.log(error);
    console.log(data);
  }


  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="w-full"><Form fields={fields} onSubmit={onSubmit}/></div>
    </div>
  );
}
