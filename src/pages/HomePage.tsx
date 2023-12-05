import UserMenu from "@components/shared/UserMenu"
import Button from "@components/ui/Button"

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
          <Button color="primary">Primary</Button>
        </a>
        <UserMenu />
      </div>
    </div>
  )
}

export default HomePage
