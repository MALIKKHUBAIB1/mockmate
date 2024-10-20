import React from "react";
import DashBoardlayout from "./layout";
import AddnewInterView from "./_components/AddnewInterView";
function DashBoard() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl ">DashBoard</h2>
      <h2 className="text-gray-500 text-xl">
        create and start your Ai mockup interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddnewInterView />
      </div>
    </div>
  );
}

export default DashBoard;
