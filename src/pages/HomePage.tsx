import UserMenu from "@components/shared/UserMenu"
import Button from "@components/ui/Button"
import { CategoryLink } from "@components/ui/CategoryLink"
import categoryimg from "../assets/images/gaming.svg"
import Tag from "@components/ui/Tag"

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
        <UserMenu />
        <CategoryLink
          to="http://www.google.com"
          color="default"
          size="md"
          icon={<img src={categoryimg} alt="icon" />}
        >
          Games
        </CategoryLink>
      </div>
      <div className="flex p-5 gap-10">
        <Tag to="/directory">Directory</Tag>
      </div>
    </div>
  )
}

export default HomePage
