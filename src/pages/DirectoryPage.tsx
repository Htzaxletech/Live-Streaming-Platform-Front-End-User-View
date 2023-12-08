const Wrapper = ({
  children: Component,
}: {
  children: ({ title }: { title: string }) => JSX.Element
}) => {
  return (
    <div className="border-2">
      <Component title="Hi" />
    </div>
  )
}

const TestChild = ({ title }: { title: string }) => <p>Hello {title}</p>

const DirectoryPage = () => {
  return (
    <div>
      <h1>Directory</h1>
      <Wrapper>{TestChild}</Wrapper>
    </div>
  )
}

export default DirectoryPage
