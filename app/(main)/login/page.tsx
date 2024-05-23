import LoginForm from "@/components/LoginForm";
import React from "react";

function page() {
  return (
    <div className=" w-full max-w-md antialiased flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-3xl">Login</h1>
      <div className="mt-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
