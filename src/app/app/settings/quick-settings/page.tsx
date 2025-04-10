import { Separator } from "@/components/ui/separator"
import { QuickAddSection } from "@/components/settings/QuickAddSection"
import { QuickAddTaskExample } from "@/components/settings/QuickAddTaskExample"
import { getUserFeatures } from "@/db/data/user"

export default async function Page() {
  const features = await getUserFeatures()
  const result = features.reduce(
    (acc, item) => {
      const { type, shown } = item
      if (type === "TASK") {
        if (shown) acc.addedTaskFeatures.push(item)
        else acc.removedTaskFeatures.push(item)
      } else if (type === "NAVIGATION") {
        if (shown) acc.addedSidebarFeatures.push(item)
        else acc.removedSidebarFeatures.push(item)
      }

      return acc
    },
    {
      addedTaskFeatures: [] as typeof features,
      removedTaskFeatures: [] as typeof features,
      addedSidebarFeatures: [] as typeof features,
      removedSidebarFeatures: [] as typeof features,
    },
  )
  return (
    <div className="m-7 mx-0 space-y-4">
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
