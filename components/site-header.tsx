"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/contacts": "Contacts",
  "/deals": "Deals",
  "/activities": "Activities",
  "/tasks": "Tasks",
  "/data-access": "Data Access",
}

const pageActions: Record<string, { label: string; icon: typeof Plus } | null> = {
  "/dashboard": null,
  "/contacts": { label: "Add Contact", icon: Plus },
  "/deals": { label: "New Deal", icon: Plus },
  "/activities": { label: "Log Activity", icon: Plus },
  "/tasks": { label: "New Task", icon: Plus },
  "/data-access": { label: "New Request", icon: Plus },
}

export function SiteHeader() {
  const pathname = usePathname()
  const pageName = pageNames[pathname] || "Dashboard"
  const action = pageActions[pathname]

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base font-medium">
                {pageName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          {action && (
            <Button>
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
