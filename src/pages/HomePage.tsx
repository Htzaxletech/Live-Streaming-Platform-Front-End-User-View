import { GoPerson } from "react-icons/go"

import Button from "@components/ui/Button"
import UserMenu from "@components/shared/UserMenu"
import { CategoryLink } from "@components/ui/CategoryLink"
import Tag from "@components/ui/Tag"
import Icon from "@components/shared/Icon"

import categoryimg from "../assets/images/gaming.svg"

import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort } from "react-icons/fa6";

import TabComponent from "@components/ui/Tab/Tab"
import { Tab } from "@headlessui/react";


import { useState } from "react"
import { Select } from "@components/ui/Select"
import MiniVideoPlayer from "@components/ui/MiniVideoPlayer"
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

      <div>
        <MiniVideoPlayer></MiniVideoPlayer>
      </div>

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
