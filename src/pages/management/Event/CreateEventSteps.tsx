import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ConnectProviderStep from "./ConnectProviderStep";
import { EventDetailsStep } from "./EventDetailStep";
import { CreateTemplateStep } from "./CreateTemplateStep";

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
      return (
       <CreateTemplateStep {...props} />
      );
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
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onFinish();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
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
      </Stepper>
      <hr className="mt-8" />
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
