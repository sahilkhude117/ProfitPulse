import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./sidebar-provider";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

const notifications = {
    alerts: [
      {
        id: 1,
        title: "Monthly Revenue Target Reached!",
        description: "Your sales team hit 105% of target for April 2025.",
        time: "Just now",
        type: "success",
        read: false
      },
      {
        id: 2,
        title: "New Lead Generated",
        description: "Enterprise client Acme Corp submitted a quote request.",
        time: "35 minutes ago",
        type: "info",
        read: false
      },
      {
        id: 3,
        title: "Low Inventory Alert",
        description: "Product SKU-5789 inventory below threshold (5 units remaining).",
        time: "2 hours ago",
        type: "warning",
        read: false
      },
    ],
    updates: [
      {
        id: 4,
        title: "Q2 Sales Report Available",
        description: "The quarterly sales performance report is ready for review.",
        time: "Yesterday",
        type: "info",
        read: true
      },
      {
        id: 5,
        title: "Weekly Team Performance Updated",
        description: "Team performance metrics have been refreshed for last week.",
        time: "2 days ago",
        type: "info",
        read: true
      },
    ],
    system: [
      {
        id: 6,
        title: "System Maintenance",
        description: "Scheduled maintenance on Apr 15, 2025 at 2:00 AM UTC.",
        time: "3 days ago",
        type: "neutral",
        read: true
      },
      {
        id: 7,
        title: "New Dashboard Feature",
        description: "Customer Retention Analysis dashboard is now available.",
        time: "1 week ago",
        type: "success",
        read: true
      },
    ]
}


export function Header() {
    const { toggle } = useSidebar();
    const [open, setOpen] = useState(false)
    const [notificationData, setNotificationData] = useState(notifications)

    const router = useRouter();
    const unreadCount = [
        ...notificationData.alerts,
        ...notificationData.updates,
        ...notificationData.system
    ].filter(notification => !notification.read).length
    
      // Mark all as read
    const markAllAsRead = () => {
        const updatedData = {
          alerts: notificationData.alerts.map(notification => ({ ...notification, read: true })),
          updates: notificationData.updates.map(notification => ({ ...notification, read: true })),
          system: notificationData.system.map(notification => ({ ...notification, read: true }))
        }
        setNotificationData(updatedData)
    }

    const getNotificationStyles = (type:string) => {
        switch(type) {
          case "success":
            return "bg-emerald-50 border-emerald-200 text-emerald-700"
          case "warning":
            return "bg-amber-50 border-amber-200 text-amber-700"
          case "info":
            return "bg-blue-50 border-blue-200 text-blue-700"
          case "neutral":
          default:
            return "bg-gray-50 border-gray-200 text-gray-700"
        }
    }

    const getBadge = (type:string) => {
        switch(type) {
          case "success":
            return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">Success</Badge>
          case "warning":
            return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">Warning</Badge>
          case "info":
            return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">Info</Badge>
          case "neutral":
          default:
            return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0">System</Badge>
        }
    }

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-14 items-center px-4 gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggle}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button>

            {/* <div className='flex-1'>
                <form>
                    <div className="relative max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
            </div> */}
            <div className="flex-1">
                
            </div>

            {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button> */}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transform translate-x-1">
                        {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" side="bottom" align="end">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                            <div>
                            <CardTitle className="text-lg">Notifications</CardTitle>
                            <CardDescription>Stay updated with Profit Pulse</CardDescription>
                            </div>
                            {unreadCount > 0 && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={markAllAsRead} 
                                className="h-8 text-xs"
                            >
                                Mark all as read
                            </Button>
                            )}
                        </CardHeader>
                        <Tabs defaultValue="alerts" className="w-full">
                            <TabsList className="grid grid-cols-3 p-1 mx-4">
                                <TabsTrigger value="alerts" className="text-xs">
                                    Alerts
                                    {notificationData.alerts.filter(n => !n.read).length > 0 && (
                                    <Badge className="ml-2 bg-red-500 hover:bg-red-500 border-0 h-5 min-w-5 px-1">
                                        {notificationData.alerts.filter(n => !n.read).length}
                                    </Badge>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="updates" className="text-xs">
                                    Updates
                                    {notificationData.updates.filter(n => !n.read).length > 0 && (
                                    <Badge className="ml-2 bg-red-500 hover:bg-red-500 border-0 h-5 min-w-5 px-1">
                                        {notificationData.updates.filter(n => !n.read).length}
                                    </Badge>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="system" className="text-xs">
                                    System
                                    {notificationData.system.filter(n => !n.read).length > 0 && (
                                    <Badge className="ml-2 bg-red-500 hover:bg-red-500 border-0 h-5 min-w-5 px-1">
                                        {notificationData.system.filter(n => !n.read).length}
                                    </Badge>
                                    )}
                                </TabsTrigger>
                            </TabsList>
                            <CardContent className="p-0">
                                <ScrollArea className="h-80 p-4 pt-2">
                                    <TabsContent value="alerts" className="m-0">
                                    {notificationData.alerts.length > 0 ? (
                                        <div className="space-y-3">
                                        {notificationData.alerts.map((notification) => (
                                            <div 
                                            key={notification.id}
                                            className={`border rounded-lg p-3 transition-colors ${
                                                notification.read 
                                                ? 'bg-card' 
                                                : `${getNotificationStyles(notification.type)} border`
                                            }`}
                                            >
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                <h4 className="text-sm font-medium">{notification.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                                                </div>
                                                {getBadge(notification.type)}
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                )}
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    ): (
                                        <div className="flex items-center justify-center py-8">
                                            <p className="text-sm text-muted-foreground">No alerts</p>
                                        </div>
                                    )}
                                    </TabsContent>
                                    <TabsContent value="updates" className="m-0">
                                        {notificationData.updates.length > 0 ? (
                                            <div className="space-y-3">
                                            {notificationData.updates.map((notification) => (
                                              <div 
                                                key={notification.id}
                                                className={`border rounded-lg p-3 transition-colors ${
                                                  notification.read 
                                                    ? 'bg-card' 
                                                    : `${getNotificationStyles(notification.type)} border`
                                                }`}
                                              >
                                                <div className="flex justify-between items-start gap-2">
                                                  <div>
                                                    <h4 className="text-sm font-medium">{notification.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                                                  </div>
                                                  {getBadge(notification.type)}
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                  {!notification.read && (
                                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ):(
                                            <div className="flex items-center justify-center py-8">
                                                <p className="text-sm text-muted-foreground">No updates</p>
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="system" className="m-0">
                                    {notificationData.system.length > 0 ? (
                                        <div className="space-y-3">
                                        {notificationData.system.map((notification) => (
                                            <div 
                                            key={notification.id}
                                            className={`border rounded-lg p-3 transition-colors ${
                                                notification.read 
                                                ? 'bg-card' 
                                                : `${getNotificationStyles(notification.type)} border`
                                            }`}
                                            >
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                <h4 className="text-sm font-medium">{notification.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                                                </div>
                                                {getBadge(notification.type)}
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                )}
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center py-8">
                                        <p className="text-sm text-muted-foreground">No system messages</p>
                                        </div>
                                    )}
                                    </TabsContent>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-2 border-t flex justify-between">
                                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
                                <Button variant="ghost" size="sm" className="text-xs">Settings</Button>
                            </CardFooter>
                        </Tabs>
                    </Card>
                </PopoverContent>
            </Popover>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <User className="w-5 h-5"/>
                        <span className="sr-only">User Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel onClick={() => router.push('/settings/profile')}>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/settings/profile')}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/settings/permissions')}>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/')}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </header>
    )
}
