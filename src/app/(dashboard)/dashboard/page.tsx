import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersIcon, WalletIcon, UserPlusIcon, UserXIcon } from "lucide-react"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentTransactions } from "@/components/recent-transactions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform statistics and performance.</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
                <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs text-green-500">+12%</p>
                  <p className="ml-2 text-xs text-muted-foreground">from yesterday </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs text-green-500">+2.5% </p>      
                  <p className="ml-2 text-xs text-muted-foreground">from yesterday </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
                <WalletIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$ 12,543</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+18% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from yesterday </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
                <UserXIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-red-500">-4%</p>
                  <p className="ml-2 text-xs text-muted-foreground">from yesterday </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users This Week</CardTitle>
                <UserPlusIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent> 
                <div className="text-2xl font-bold">156</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+8% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last week </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+2.5% </p> 
                  <p className="ml-2 text-xs text-muted-foreground">from last week </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions This Week</CardTitle>
                <WalletIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹ 87,651</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+12% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last week </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
                <UserXIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-red-500">-4% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last week </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users This Month</CardTitle>
                <UserPlusIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">642</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+15% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last month </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+2.5% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last month </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions This Month</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹ 324,845</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-green-500">+22% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last month </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
                <UserXIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <div className="flex flex-row mt-2">
                  <p className="text-xs  text-red-500">-4% </p>
                  <p className="ml-2 text-xs text-muted-foreground">from last month </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest transactions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
