import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useEventContext } from "../../../context/EventContext";
import draftToHtml from "draftjs-to-html";
import { EventStepProps } from "./CreateEventSteps";
import { EventStepButton } from "./EventStepButton";
import { ChannelType } from "../../../types/provider";
import htmlToDraft from "html-to-draftjs";

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

  const allChannels :ChannelType[]= ['MAIL', 'IN_APP', 'OTHER']
  const sortedChannels = allChannels.filter(c => channels.includes(c))

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
            {channels.includes("MAIL") && <Tab label="Mail Template" />}
            {channels.includes("IN_APP") && <Tab label="In App Template" />}
            {channels.includes("OTHER") && <Tab label="Telegram Template" />}
          </Tabs>
        </Box>
        {sortedChannels[value] === "MAIL" && <MailTemplate channel="MAIL"/>}
        {sortedChannels[value] === "IN_APP" && <InAppTemplate channel="IN_APP"/>}
        {sortedChannels[value] === "OTHER" && <TelegramTemplate channel="OTHER"/>}
      </div>
      <EventStepButton
        handleNext={goToNext}
        handleBack={handleBack}
        activeStep={activeStep}
      />
    </>
  );
}

function MailTemplate({channel}: {channel: ChannelType}) {
  const [subjectState, setSubjectState] = useState(EditorState.createEmpty());
  const [messageState, setMessageState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;
  let template: Record<string, Record<string, string>> = data.template ?? {};
  if(data.currentEvent?.template){
    template  = data.currentEvent.template
  }

  useEffect(() => {
    let { contentBlocks:cbMessage, entityMap:emMessage } = htmlToDraft(template[channel]?.message ?? "");;
    let contentState = ContentState.createFromBlockArray(cbMessage,emMessage);
    const messageState = EditorState.createWithContent(contentState);

    let { contentBlocks: cbSubject, entityMap: emSubject } =  htmlToDraft(template[channel]?.subject ?? "");;
    contentState = ContentState.createFromBlockArray(cbSubject, emSubject);
    const subjectState = EditorState.createWithContent(contentState);

    setSubjectState(subjectState);
    setMessageState(messageState);
  }, []);


  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(messageState.getCurrentContent())),
      subject: draftToHtml(convertToRaw(subjectState.getCurrentContent())),
    };
    template[channel] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [subjectState, messageState]);

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

function InAppTemplate({channel}: {channel: ChannelType}) {
  const [messageState, setMessageState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;
  let template: Record<string, Record<string, string>> = data.template ?? {};
  if(data.currentEvent?.template){
    template  = data.currentEvent.template
  }

  useEffect(() => {
    let { contentBlocks:cbMessage, entityMap:emMessage } = htmlToDraft(template[channel]?.message ?? "");;
    let contentState = ContentState.createFromBlockArray(cbMessage,emMessage);
    const messageState = EditorState.createWithContent(contentState);
    setMessageState(messageState);
  }, []);


  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(messageState.getCurrentContent())),
    };
    template[channel] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [messageState]);

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

function TelegramTemplate({channel}: {channel: ChannelType}) {
  const [messageState, setMessageState] = useState(EditorState.createEmpty());

  const { data, setData } = useEventContext()!;
  let template: Record<string, Record<string, string>> = data.template ?? {};
  if(data.currentEvent?.template){
    template  = data.currentEvent.template
  }

  useEffect(() => {
    let { contentBlocks:cbMessage, entityMap:emMessage } = htmlToDraft(template[channel]?.message ?? "");;
    let contentState = ContentState.createFromBlockArray(cbMessage,emMessage);
    const messageState = EditorState.createWithContent(contentState);
    setMessageState(messageState);
  }, []);


  useEffect(() => {
    const newTemplate = {
      message: draftToHtml(convertToRaw(messageState.getCurrentContent())),
    };
    template[channel] = newTemplate;
    const updatedData = { ...data, template: template };
    setData(updatedData);
  }, [messageState]);

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
