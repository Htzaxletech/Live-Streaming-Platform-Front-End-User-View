// just testing wrapper component,
// forward props to it child

import { useState } from "react"
import Button from "@components/ui/Button"

const Wrapper = ({
  children: Component,
}: {
  children: ({ title }: { title: string }) => JSX.Element
}) => {
  const [myState] = useState("My State")
  // we can call redux state hooks here, eg: logged in data

  return (
    <div className="bg-background-base">
      <Component title={myState} />
    </div>
  )
}

// child component is now pure stateless component (Presentational Component)
const TestChild = ({ title }: { title: string }) => <p>Child Text - {title}</p>

const DirectoryPage = () => {
  return (
    <div>
      <h1>Directory</h1>
      <Wrapper>{TestChild}</Wrapper>
      {/* or */}
      <Wrapper>{({ title }) => <Button>{title}</Button>}</Wrapper>
    </div>
  )
}

export default DirectoryPage
