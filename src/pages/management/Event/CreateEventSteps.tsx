import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ConnectProviderStep from "./ConnectProviderStep";
import { EventDetailsStep } from "./EventDetailStep";
import { CreateTemplateStep } from "./CreateTemplateStep";
import { CircularProgress } from "@mui/material";
import { useEventContext } from "../../../context/EventContext";
import { useConnectProvider, useCreateEvent } from "../../../hooks/useEvent";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

export const steps = ["Event Details", "Event Channels", "Event Templates"];
export type EventStepProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

function getStepContent(props: EventStepProps) {
  switch (props.activeStep) {
    case 0:
      return <EventDetailsStep {...props} />;
    case 1:
      return <ConnectProviderStep {...props} />;
    case 2:
      return <CreateTemplateStep {...props} />;
    case 3:
      return <FinishStep {...props} />;
    default:
      return <></>;
  }
}

export default function CreateEventSteps({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const isFinishStep = activeStep === steps.length;

  const handleNext = () => {
    if (isFinishStep) onFinish();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {!isFinishStep && (
        <>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>{" "}
          <hr className="mt-8" />
        </>
      )}
      <div className="h-full py-12 flex flex-col">
        {getStepContent({
          activeStep: activeStep,
          handleBack: handleBack,
          handleNext: handleNext,
        })}
      </div>
    </Box>
  );
}

function FinishStep({ handleNext, handleBack }: EventStepProps) {
  const { data, setData } = useEventContext()!;
  const app = useAppContext()!;
  const { createEvent, isLoading } = useCreateEvent();
  const { connectProvider, isError: isConnectError } = useConnectProvider();

  useEffect(() => {
    console.log("Ruuuuuuunnnnnnn");
    (async () => {
      if (!data.eventName || !data.template || !data.connectedProviders) return;
      const newEvent = await createEvent({
        appName: app.selectedApp?.name ?? "",
        eventName: data.eventName,
        template: data.template,
        metadata: { description: data.eventDescription ?? "" },
      }).catch((e) => {
        handleBack();
      });
      if(!newEvent) return;
      toast.success("Event Created Successfully");
      handleNext();
      // if (isError) {
      //   console.log('HERE =====>>>')
      //   toast.error("Event Creation Failed",  {
      //     position: "top-right",
      //   });
      //   handleNext();
      //   return;
      // } else {
      //   toast.success("Event Created Successfully");
      // }
      // const resConnect = await connectProvider({
      //   appName: app.selectedApp?.name ?? '',
      //   eventName: data.eventName,
      //   providerName: data.connectedProviders.map(p => p.name)
      // })

      // if(isConnectError) {
      //   toast.error("Integration Addition Failed");
      // }
      // console.log("failed Count : ", resConnect.failedCount)
      // if(resConnect.failedCount > 0){
      //   toast.error("Some Integrations Failed");
      // }

      // toast.success("Integrations Added Successfully");
      // handleNext();
    })();
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-col items-center">
        <CircularProgress />
        <div className="text-lg font-medium mt-4">Creating Event...</div>
      </div>
    </div>
  );
}
