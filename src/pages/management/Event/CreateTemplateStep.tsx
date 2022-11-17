import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useEventContext } from "../../../context/EventContext";
import draftToHtml from "draftjs-to-html";
import { EventStepProps } from "./CreateEventSteps";
import { EventStepButton } from "./EventStepButton";

export function CreateTemplateStep({
  handleNext,
  activeStep,
  handleBack,
}: EventStepProps) {
  const { data, setData } = useEventContext()!;
  const [value, setValue] = useState(0);

  const channels = (
    data.connectedProviders?.map((p) => p.channel) ?? []
  ).filter((v, i, a) => a.indexOf(v) === i);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const goToNext = () => {
    handleNext();
  };

  return (
    <>
      <div className="flex flex-col h-full w-full bg-white rounded-lg">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            {channels.includes("MAIL") && <Tab label="MAIL TAB" />}
            {channels.includes("IN_APP") && <Tab label="IN_APP TAB" />}
            {channels.includes("OTHER") && <Tab label="MAIL TAB" />}
          </Tabs>
        </Box>
        {channels[value] === "MAIL" && <MailTemplate />}
        {channels[value] === "IN_APP" && <InAppTemplate />}
        {channels[value] === "OTHER" && <TelegramTemplate />}
      </div>
      <EventStepButton
        handleNext={goToNext}
        handleBack={handleBack}
        activeStep={activeStep}
      />
    </>
  );
}

function MailTemplate() {
  const [subjectState, setSubjectState] = useState(EditorState.createEmpty());
  const [bodyState, setBodyState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;

  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(bodyState.getCurrentContent())),
      subject: draftToHtml(convertToRaw(subjectState.getCurrentContent())),
    };
    const template: Record<string, Record<string, string>> = data.template ??
    {};
    template["MAIL"] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [subjectState, bodyState]);

  console.log(data);
  return (
    <div className="flex flex-col p-6 h-full w-full flex-grow bg-white overflow-y-scroll">
      <div className="text-base font-medium text-black my-4"> Subject : </div>
      <Editor
        editorStyle={{ minHeight: "150px" }}
        editorState={subjectState}
        toolbarClassName=""
        toolbar={{
          options: ["inline", "textAlign"],
        }}
        wrapperClassName="border-[1px] w-full"
        editorClassName="px-4 overflow-hidden"
        onEditorStateChange={setSubjectState}
      />
      <div className="text-base font-medium text-black my-4"> Body : </div>
      <Editor
        editorStyle={{ minHeight: "150px" }}
        editorState={bodyState}
        toolbarClassName=""
        toolbar={{
          options: ["inline", "textAlign"],
        }}
        wrapperClassName="border-[1px] w-full"
        editorClassName="px-4 overflow-hidden"
        onEditorStateChange={setBodyState}
      />
    </div>
  );
}

function InAppTemplate() {
  const [messageState, setMessageState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;

  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(messageState.getCurrentContent())),
    };
    const template: Record<string, Record<string, string>> = data.template ??
    {};
    template["IN_APP"] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [messageState]);

  console.log(data);
  return (
    <div className="flex flex-col p-6 h-full w-full flex-grow bg-white overflow-y-scroll">
      <div className="text-base font-medium text-black my-4"> Message : </div>
      <Editor
        editorStyle={{ minHeight: "150px" }}
        editorState={messageState}
        toolbarClassName=""
        toolbar={{
          options: ["inline", "textAlign"],
        }}
        wrapperClassName="border-[1px] w-full"
        editorClassName="px-4 overflow-hidden"
        onEditorStateChange={setMessageState}
      />
    </div>
  );
}

function TelegramTemplate() {
  const [messageState, setMessageState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;

  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(messageState.getCurrentContent())),
    };
    const template: Record<string, Record<string, string>> = data.template ??
    {};
    template["OTHER"] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [messageState]);

  console.log(data);
  return (
    <div className="flex flex-col p-6 h-full w-full flex-grow bg-white overflow-y-scroll">
      <div className="text-base font-medium text-black my-4"> Message : </div>
      <Editor
        editorStyle={{ minHeight: "150px" }}
        editorState={messageState}
        toolbarClassName=""
        toolbar={{
          options: ["inline", "textAlign"],
        }}
        wrapperClassName="border-[1px] w-full"
        editorClassName="px-4 overflow-hidden"
        onEditorStateChange={setMessageState}
      />
    </div>
  );
}
