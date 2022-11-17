import React, { ReactElement, useContext, useEffect, useState } from "react";
import { EventData } from "../types/api/event";
import { EventProviders, ProviderData } from "../types/api/provider";

export type EventContextData = {
  data: EventAllData;
  setData: (data: EventAllData) => void;
};

export type EventAllData = {
  currentEvent?: EventData;
  eventName?: string;
  eventDescription?: string;
  connectedProviders?: ProviderData[];
  template?: Record<string, Record<string, string>>;
};

const EventContext = React.createContext<EventContextData | undefined>(
  undefined
);

export const EventContextProvider = ({ children }: any): ReactElement => {
  const [data, setData] = useState<EventAllData>({});

  return (
    <EventContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  return context;
};
