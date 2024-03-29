import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useParams } from "react-router-dom"
import { customAlphabet } from "nanoid"
import store from "store2"

import Heading from "@components/ui/Heading"
import Button from "@components/ui/Button"
import Input from "@components/ui/Input"
import { socket } from "../socket"

const nanoid = customAlphabet("1234567890", 6)

let userID = store.get("userId")
if (!userID) {
  userID = nanoid()
  store.set("userId", userID)
}
console.log(userID)

export default function ChannelPage() {
  const [isConnected, setIsConnected] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fooEvents, setFooEvents] = useState<any[]>([])

  const [message, setMessage] = useState("")

  const params = useParams()

  useEffect(() => {
    socket.connect()

    function onConnect() {
      socket.timeout(3000).emit(
        "add_userConnect",
        {
          userID,
          liveID: params.id,
        },
        () => {
          console.log("add_userConnect")
        }
      )
      setIsConnected(true)
    }

    function onDisconnect() {
      console.log("disconnected")
      setIsConnected(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onFooEvent(value: any) {
      console.log("return:", value)
      setFooEvents((previous) => [...previous, value])
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("added_live_emitter", onFooEvent)
    console.log("listen events")

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("added_live_emitter", onFooEvent)
    }
  }, [params.id])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    socket.emit(
      "add_chat_message",
      { userID, liveID: params.id, message },
      () => {
        console.log("Sent")
      }
    )
    setMessage("")
  }

  return (
    <div className="flex flex-col gap-2">
      <Heading>Socket</Heading>
      <p>Connected: {"" + isConnected}</p>
      {fooEvents.map((foo, idx) => (
        <p key={idx}>
          <span
            className="inline-block font-bold"
            style={{ color: "#" + foo.userID }}
          >
            {foo.userID}
          </span>
          : {foo.message}
        </p>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input value={message} onChange={handleInputChange} />

        <Button type="submit" color="primary" className="w-fit" size="lg">
          Send
        </Button>
      </form>
    </div>
  )
}
