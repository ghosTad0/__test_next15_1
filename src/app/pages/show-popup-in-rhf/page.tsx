'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { register, handleSubmit } = useForm();
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    // setShowPopup(true);
  };

  function onIconClick(){
    setShowPopup(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <button type="submit">Submit</button>
      <p onClick={onIconClick}>!!!</p>

      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${showPopup ? "visible" : "hidden"}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="text-lg font-semibold mb-4">Thank you for submitting!</p>
            <button type="button" onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
