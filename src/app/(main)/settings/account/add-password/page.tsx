import React from "react"

import { PasswordAddForm } from "@/components/settings/PasswordAddForm"

export default function page() {
  return (
    <div className="m-2 my-3 flex h-8/12 max-w-3xl flex-col rounded-sm px-3.5 sm:mx-auto sm:w-full">
      <h1 className="text-lg font-medium">Add Password</h1>
      <PasswordAddForm />
    </div>
  )
}
