import Image from "next/image"
import DragAndDrop from "@/components/DragAndDrop"

export default function Home() {
  const item = [
    {
      id: "1",
      name: "Item 1",
      preview: "https://picsum.photos/200/300",
    },
    {
      id: "2",
      name: "Item 2",
      preview: "https://picsum.photos/200/300",
    },
    {
      id: "3",
      name: "Item 3",
      preview: "https://picsum.photos/200/300",
    },
  ]

  return (
    <>
      <h1>Home</h1>
      <DragAndDrop items={item} />
    </>
  )
}
