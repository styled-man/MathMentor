import { type NextPage } from "next";
import DragAndDrop from "./components/DragAndDrop";

const Home: NextPage = () => {
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
  ];

  return (
    <>
      <h1>Home</h1>
      <DragAndDrop items={item} />
    </>
  );
};

export default Home;