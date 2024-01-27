import { Badge } from "@components/ui/Badge";
import Heading from "@components/ui/Heading";


interface ProfileStreamInfoProps {
  isLive: boolean;
  message: string;
  viewer: string;
}

const ProfileStreamInfo: React.FC<ProfileStreamInfoProps> = ({
  isLive = false,
  message,
  viewer,

}) => {

  return (
    <div className="bg-background-base p-5 w-full max-w-sm h-40">
      <div className="flex flex-col justify-between items-stretch h-full">
        <div className="w-[80%]">
          {
            isLive ?
              <Badge color="danger" className="rounded" >Live Now</Badge> : <Badge color="default" className="rounded uppercase" >offline</Badge>
          }
          <Heading className="text-lg" >{message}</Heading>
        </div>

        <div className="">
          <span className="text-primary font-light text-sm">Watch now with {viewer} viewers</span>
        </div>
      </div>

    </div>
  );
};

export default ProfileStreamInfo;
