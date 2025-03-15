import { Button } from "@/components/ui/button"

export default async function Page() {
  return (
    <div className="m-2 mx-2 flex h-8/12 max-w-3xl flex-col justify-between rounded-sm sm:mx-auto sm:w-full">
      <div className="px-3.5 py-2">
        <h1>
          Customize how you&apos;d like to be notified about updates in Todoist.
        </h1>
      </div>

      <div className="flex w-full justify-end gap-2 border-t p-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}
