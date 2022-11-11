import { Images } from "../images";
import { ChannelType } from "../types/provider";

type IntegrationCardProps = {
  imageSrc: string;
  title: string;
  channel: ChannelType;
  onClick: () => void;
};

export function IntegrationCard({
  title,
  channel,
  imageSrc,
  onClick
}: IntegrationCardProps) {
  const channelImg = {
    EMAIL: Images.Nav.Mail,
    "IN-APP": Images.Nav.InApp,
    OTHER: Images.Nav.Other,
  }[channel];

  return (
    <div className="flex flex-col p-2 h-[200px] w-[330px] items-center bg-white rounded-lg border shadow-md hover:bg-gray-50 cursor-pointer" onClick={onClick}>
      <div className="flex h-[140px] w-full bg-gray-200 rounded-sm">
        <img src={imageSrc} className="m-auto h-[70px]" />
      </div>
      <div className="flex flex-row items-center justify-between h-[60px] w-full px-2">
        <div className="text-lg text-gray-700">{title}</div>
        <img src={channelImg}/>
      </div>
    </div>
  );
}
