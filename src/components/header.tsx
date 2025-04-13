import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./sidebar-provider";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
    const { toggle } = useSidebar();

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-14 items-center px-4 gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggle}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button>

            <div className='flex-1'>
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
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <User className="w-5 h-5"/>
                        <span className="sr-only">User Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </header>
    )
}
