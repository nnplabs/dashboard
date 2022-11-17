import { Button } from "@mui/material";
import { EventStepProps, steps } from "./CreateEventSteps";

export type EventStepButtonProps = EventStepProps;

export function EventStepButton({
  activeStep,
  handleBack,
  handleNext,
}: EventStepButtonProps) {
  return (
    <div className="flex flex-row w-full mt-10">
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <div className="flex flex-grow"></div>
      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
}
