import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ConnectProviderStep from "./ConnectProviderStep";
import { EventDetailsStep } from "./EventDetailStep";
import { CreateTemplateStep } from "./CreateTemplateStep";
import { CircularProgress } from "@mui/material";
import { useEventContext } from "../../../context/EventContext";
import {
  useConnectProvider,
  useCreateEvent,
  useUpdateConnectedProvider,
  useUpdateEvent,
} from "../../../hooks/useEvent";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import {
  ConnectProviderRequest,
  CreateEventRequest,
  EventData,
} from "../../../types/api/event";

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
  const { createEvent } = useCreateEvent();
  const { updateEvent } = useUpdateEvent();
  const { connectProvider } = useConnectProvider();
  const { updateConnectedProvider } = useUpdateConnectedProvider();

  const channels = (
    data.connectedProviders?.map((p) => p.channel) ?? []
  ).filter((v, i, a) => a.indexOf(v) === i);

  const isUpdate = data.currentEvent !== undefined;

  const processedTemplate: Record<string, Record<string, string>> = {};
  channels.map((c) => {
    if (data.template && data.template[c])
      processedTemplate[c] = data.template[c];
  });

  useEffect(() => {
    const eventReqHelper = () => {
      const event: CreateEventRequest = {
        appName: app.selectedApp?.name ?? "",
        eventName: data.eventName!,
        template: processedTemplate,
        metadata: {
          description: data.eventDescription ?? "",
          channels: channels.join("+"),
          onChain: data.currentEvent?.metadata?.onChain ?? 'false',
        },
      };
      return event;
    };

    const connectReqHelper = () => {
      const connect: ConnectProviderRequest = {
        appName: app.selectedApp?.name ?? "",
        eventName: data.eventName!,
        providerName: data.connectedProviders!.map((p) => p.name),
      };
      return connect;
    };

    async function upsertEventHandler() {
      if (!data.eventName || !data.template || !data.connectedProviders) return;
      
      let newEvent;
      let eventData = eventReqHelper();

      if (isUpdate) {
        newEvent = await updateEvent(eventData).catch((e) => {
          handleBack();
        });
      } else {
        newEvent = await createEvent(eventData).catch((e) => {
          handleBack();
        });
      }

      if (!newEvent) return;
      toast.success(
        `Step[1/2] Event ${isUpdate ? "Updated" : "Created"} Successfully`
      );

      let resConnect;
      let reqConnect = connectReqHelper();

      if (isUpdate) {
        resConnect = await updateConnectedProvider(reqConnect).catch((e) => {
          toast.error("Step[2/2] Failed");
          handleNext();
        });
      } else {
        resConnect = await connectProvider(reqConnect).catch((e) => {
          toast.error("Step[2/2] Failed");
          handleNext();
        });
      }

      if (!resConnect) return;
      if (resConnect.failedCount > 0) {
        toast.warn("Step[2/2] Some Integrations Connections Failed");
      } else
        toast.success(
          `Step[2/2] Integrations ${
            isUpdate ? "Updated" : "Added"
          } Successfully`
        );
      handleNext();
    }

    upsertEventHandler();
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-col items-center">
        <CircularProgress />
        <div className="text-lg font-medium mt-4">{`${isUpdate ? "Updating" : "Creating"} Event`}</div>
      </div>
    </div>
  );
}
