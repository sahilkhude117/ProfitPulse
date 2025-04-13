"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "../sidebar-provider"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Wallet, BarChart3, Settings, HelpCircle, LogOut, Menu, ChevronRight, ChevronDown, ChartLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsItem = footerItems[0];
  // Get the other items (Help and Logout)
  const otherItems = footerItems.slice(1);

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
            <ChartLine className="h-5 w-5" />
          <span className="ml-2 text-lg font-semibold">Profit Pulse</span>
          <Button variant="ghost" size="icon" className="ml-auto bg-black lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-2">
            <nav className="grid gap-1">
              <div>
              <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === settingsItem.href || pathname?.startsWith("/settings/")
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                   <div className="flex items-center gap-3">
                    <settingsItem.icon className="h-5 w-5" />
                    <span>{settingsItem.name}</span>
                  </div>
                  {isSettingsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                </button>

                {isSettingsOpen && settingsItem.subItems && (
                  <div className="pl-4 space-y-1 mt-1">
                    {settingsItem.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                          pathname === subItem.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <span>{subItem.name}</span>
                        {subItem.description && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {subItem.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

              </div>
              {otherItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.description && (
                    <span className="ml-auto text-xs text-muted-foreground">{item.description}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users, badge: "8" },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

const footerItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    subItems: [
      { name: "Profile", href: "/settings/profile", description: "Update your details" },
      { name: "Security", href: "/settings/security", description: "Manage your password" },
      { name: "Communication", href: "/settings/communication", description: "Email and phone" },
      { name: "Permissions", href: "/settings/permissions", description: "Access control" },
    ],
  },
  { name: "Help", href: "/help", icon: HelpCircle, description: "Get support" },
  { name: "Logout", href: "/logout", icon: LogOut, description: "Exit the app" },
]
