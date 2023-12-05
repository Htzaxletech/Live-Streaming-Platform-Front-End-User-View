import UserMenu from "@components/shared/UserMenu"
import Button from "@components/ui/Button"
import { CategoryLink } from "@components/ui/CategoryLink"
import categoryimg from "../assets/images/Vector.png"

const HomePage = () => {
  return (
    <>
      <div className="flex gap-5 flex-col w-fit">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <UserMenu />
      </div>

      <CategoryLink to="http://www.google.com" color="default" size="md" icon={<img src={categoryimg} alt="icon" />}>
        Games
      </CategoryLink>


    </>
  )
}

export default HomePage
