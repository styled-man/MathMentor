import React from "react";
import { useState } from "react";

interface IModal {
  userProblem: string;
}

const Modal = ({ userProblem }: IModal) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`${open?"small-modal" : "large-modal"} m-5 w-[50vw] cursor-pointer p-5 shadow-lg`}>
      You might need to revisit:{" "}
      <span className="text-red-500 font-bold">{userProblem}</span>
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
      voluptatem quo quis nulla praesentium assumenda facere voluptate cumque
      veritatis odit!
    </div>
  );
};

export default Modal;
