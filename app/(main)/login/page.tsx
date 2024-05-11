import LoginForm from "@/components/LoginForm";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <h1 className="text-center font-bold text-3xl">Login</h1>
      <div className="mt-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
