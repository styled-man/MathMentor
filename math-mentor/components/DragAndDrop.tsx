import Image from "next/image"
import React, { useState } from "react"

interface DragItem {
  id: string
  preview: string
  name: string
}

interface DragAndDropProps {
  items: DragItem[]
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ items }) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null)
  const [droppedItems, setDroppedItems] = useState<DragItem[]>([])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: DragItem) => {
    setDraggedItem(item)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  async function uploadDocument(name: string, preview: string) {
    const response = await fetch("/api/azure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        preview: preview,
      }),
    })

    return (await response.json()) as { url: string }
  }

  function handleDocumentUpload() {
    for (const document of droppedItems) {
      const { name, preview } = document

      const imageLink = uploadDocument(name, preview)
      console.log(imageLink)
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (draggedItem) {
      setDroppedItems([...droppedItems, draggedItem])
      setDraggedItem(null)
    } else {
      const files = Array.from(event.dataTransfer.files)
      for (const file of files) {
        const id = file.name
        const name = file.name
        const preview = await createPreviewImage(file) // Create preview image
        setDroppedItems([...droppedItems, { id, name, preview }])
      }
    }
  }

  // event: React.MouseEvent<HTMLButtonElement>
  const handleFileSelect = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const id = file.name
        const name = file.name
        const preview = await createPreviewImage(file) // Create preview image
        setDroppedItems([...droppedItems, { id, name, preview }])
      }
    }
    fileInput.click()
  }

  const createPreviewImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result as string)
      }
    })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      {items.map((item) => (
        <div key={item.id} draggable onDragStart={(event) => handleDragStart(event, item)}>
          {item.name}
        </div>
      ))}
      <div>
        <h2>Dropped Items:</h2>
        {droppedItems.map((item) => (
          <div key={item.id}>
            <Image src={item.preview || "some default image link"} alt={item.name} width="100" height="100" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <button onClick={handleFileSelect}>Select File</button>
      <div>
        <button onClick={handleDocumentUpload}>upload document</button>
      </div>
    </div>
  )
}

export default DragAndDrop
