import UserMenu from "@components/shared/UserMenu"
import { Button } from "@components/ui/Button"

const HomePage = () => {
  return (
    <div className="flex gap-5 flex-col w-fit">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <UserMenu />
    </div>
  )
}

export default HomePage
