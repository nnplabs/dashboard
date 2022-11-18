import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useEventContext } from "../../../context/EventContext";
import { EventStepProps } from "./CreateEventSteps";
import { EventStepButton } from "./EventStepButton";

export function EventDetailsStep({
    handleNext,
    activeStep,
    handleBack,
  }: EventStepProps) {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [error, setError] = useState<boolean>(false);
  
    const { data, setData } = useEventContext()!;
    const isUpdate = data.currentEvent !== undefined;

    useEffect(() => {
      console.log("DATA : ", data)
      if(data.eventName){
        setName(data.eventName); 
        setDescription(data.eventDescription);
      } else {
        if(!data.currentEvent) return;
        setName(data.currentEvent.name)
        setDescription(data.currentEvent.metadata?.description ?? '')
      }
    },[])

    const goToNext = () => {
      if (!name || name.length === 0) {
        setError(true);
        return;
      }
      const updatedData= {...data, eventName : name, eventDescription : description}
      setData(updatedData);
      handleNext();
    };
    
    return (
      <>
        <div className="flex flex-col gap-y-7 h-full w-full bg-white rounded-lg p-7">
          <TextField
            value={name}
            defaultValue={name}
            error={error}
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            className="w-full"
            label="Event Name"
            required
            variant={isUpdate ? 'filled' : 'outlined'}
            helperText={error && "Event name required"}
            disabled={isUpdate}
          />
          <TextField
            value={description}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            label="Event Description"
            rows={4}
            multiline
            variant="outlined"
          />
        </div>
        <EventStepButton
          handleNext={goToNext}
          handleBack={handleBack}
          activeStep={activeStep}
        />
      </>
    );
  }
  
  