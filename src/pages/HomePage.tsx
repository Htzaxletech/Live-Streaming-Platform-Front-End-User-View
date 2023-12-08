import { GoPerson } from "react-icons/go"

import Button from "@components/ui/Button"
import { CategoryLink } from "@components/ui/CategoryLink"
import Tag from "@components/ui/Tag"
import Icon from "@components/shared/Icon"

import categoryimg from "../assets/images/gaming.svg"
import LanguageSwitch from "@components/shared/LanguageSwitch"

const HomePage = () => {
  return (
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
      <LanguageSwitch />
    </div>
  )
}

export default HomePage
