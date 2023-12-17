import { GoPerson } from "react-icons/go"

import Button from "@components/ui/Button"
import UserMenu from "@components/shared/UserMenu"
import { CategoryLink } from "@components/ui/CategoryLink"
import Tag from "@components/ui/Tag"
import Icon from "@components/shared/Icon"

import categoryimg from "../assets/images/gaming.svg"

import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort, FaBullseye } from "react-icons/fa6";

import TabComponent from "@components/ui/Tab/Tab"
import { Tab } from "@headlessui/react";


import { useState } from "react"
import { Select } from "@components/ui/Select"
import MiniVideoPlayer from "@components/ui/MiniVideoPlayer"
import Avatar from "@components/ui/Avatar"
import ProfileAvatar from "@components/ui/ProfileAvatar"
import ProfileHeading from "@components/shared/ProfileHeading"
import ProfileDescription from "@components/shared/ProfileDescription"


const HomePage = () => {


  const options = [

    { option: "Recommended for you", value: "1", icon: <BsStars /> },
    { option: "Views(high to low)", value: "2", icon: <FaArrowDownWideShort /> }

  ];


  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    
    <>
      <div className="flex gap-5 flex-col w-fit">
        <div className="flex p-5 gap-10">
       
          <Button color="default">Default</Button>
          <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Tooltip"
            data-tooltip-place="top"
          >
            <Button color="primary">With Tooltip</Button>
          </a>
          <CategoryLink
            to="http://www.google.com"
            color="default"
            size="md"
            icon={<img src={categoryimg} alt="icon" />}
          >
            Games
          </CategoryLink>
        </div>


        <div className="container aspect-video h-[400px] ">
        <MiniVideoPlayer url="https://www.twitch.tv/videos/106400740" ></MiniVideoPlayer>
        </div>
  
        <div className="flex p-5 gap-2.5">
          <Tag to="/directory">Directory</Tag>
          <Icon icon={GoPerson} className="text-primary" />
        </div>
      </div >

      <CategoryLink to="http://www.google.com" color="default" size="md" icon={<img src={categoryimg} alt="icon" />}>
        Games
      </CategoryLink>

      <div className="float-right">
        <Select options={options} />
      </div>

      <Avatar />

      <ProfileHeading
        streamerName="GeminiTay"
        streamTitle="Stardew Sunday! We are back in spring year 2 :)"
        gameName="Stardew Valley"
        gameTags={["funny","kid","English"]}
        viewers={10}
        time={"20:00:11"}
      />
      <ProfileDescription
       streamerName="GeminiTay"
       followerCount={"211K"}
       description={"Canadian gaming Youtuber and Twitch Streamer. I play Minecraft with a focus on building and creating art in the game."}
       socialLinks={{
        facebook: "www.facebook.com/username",
        instagram: "www.instagram.com/username",
        youtube: "www.youtube.com/username",
    }}
       />

      <ProfileAvatar 
      imageUrl="https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
       altText="User Avatar"
        isLive={true}
        size={50}
       />

   

      {/* <Tab.Group>
      <Tab.List className="flex p-4 space-x-4 bg-gray-200">
        <TabComponent label="Tab 1" index={0} />
        <TabComponent label="Tab 2" index={1} />
        <TabComponent label="Tab 3" index={2} />
      </Tab.List>
      <Tab.Panels>
        <TabComponent.Panel>
          <div>Content for Tab 1</div>
        </TabComponent.Panel>
        <TabComponent.Panel>
          <div>Content for Tab 2</div>
        </TabComponent.Panel>
        <TabComponent.Panel>
          <div>Content for Tab 3</div>
        </TabComponent.Panel>
      </Tab.Panels>
    </Tab.Group> */}
    </>
  )
}

export default HomePage
