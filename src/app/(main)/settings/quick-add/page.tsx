import { Separator } from "@/components/ui/separator"
import { QuickAddSection } from "@/components/settings/QuickAddSection"
import { QuickAddTaskExample } from "@/components/settings/QuickAddTaskExample"
import { getUserFeatures } from "@/db/data/account"

export default async function Page() {
  const quickAddFeatures = await getUserFeatures()
  const result = quickAddFeatures.reduce(
    (acc, item) => {
      if (item.shown && item.type === "TASK") acc.addedTaskFeatures.push(item)
      if (!item.shown && item.type === "TASK")
        acc.removedTaskFeatures.push(item)
      if (item.shown && item.type === "NAVIGATION")
        acc.addedSidebarFeatures.push(item)
      if (!item.shown && item.type === "NAVIGATION")
        acc.removedSidebarFeatures.push(item)
      return acc
    },
    {
      addedTaskFeatures: [] as typeof quickAddFeatures,
      removedTaskFeatures: [] as typeof quickAddFeatures,
      addedSidebarFeatures: [] as typeof quickAddFeatures,
      removedSidebarFeatures: [] as typeof quickAddFeatures,
    },
  )
  return (
    <div className="m-7 mx-2 max-w-3xl space-y-4 sm:mx-auto sm:w-full">
      <div className="space-y-4 px-3">
        <h1 className="text-3xl">Sidebar Options</h1>
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <QuickAddSection
            data={result.addedSidebarFeatures}
            heading="Show sidebar options"
          />
          <QuickAddSection
            data={result.removedSidebarFeatures}
            heading="More sidebar options"
          />
        </div>
      </div>
      <Separator />
      <div className="space-y-4 px-3">
        <h1 className="text-3xl">Task Actions</h1>
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <QuickAddSection
            data={result.addedTaskFeatures}
            heading="Show task actions"
          />
          <QuickAddSection
            data={result.removedTaskFeatures}
            heading="More task actions"
          />
        </div>
        <QuickAddTaskExample
          addedTaskFeatures={result.addedTaskFeatures}
          removedTaskFeatures={result.removedTaskFeatures}
        />
      </div>
    </div>
  )
}
