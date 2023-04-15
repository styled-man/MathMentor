import React from "react"

interface IForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  inputText: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Form = ({ handleSubmit, inputText, handleInputChange }: IForm) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="absolute bottom-3 right-12 flex w-[45vw] items-center  px-4 py-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={handleInputChange}
          className="mr-2 w-full resize-none rounded-md border border-gray-300 px-4 py-2"
        />
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Send
        </button>
      </form>
    </>
  )
}

export default Form
