"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { 
  Search, 
  UserCog, 
  UserPlus, 
  Download, 
  Filter, 
  MoreHorizontal, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  XCircle,
  UserX,
  Mail,
  Upload,
  FileSpreadsheet
} from "lucide-react"
import Link from "next/link"
import { CreateUserDialog } from "@/components/create-user-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const sampleUsers = [
  {
    id: "1",
    name: "Arjun",
    surname: "Patel",
    email: "arjun.patel@example.com",
    idType: "Aadhaar",
    phone: "+91 98765 43210",
    status: "Active",
    role: "Admin",
    lastLogin: "2025-04-10T15:30:00",
    created: "2024-11-05T09:15:00",
    walletBalance: 385250.50,
    twoFactorEnabled: true
  },
  {
    id: "2",
    name: "Priya",
    surname: "Sharma",
    email: "priya.s@example.com",
    idType: "PAN Card",
    phone: "+91 87654 32109",
    status: "Active",
    role: "Sales Manager",
    lastLogin: "2025-04-12T11:22:00",
    created: "2024-12-12T14:30:00",
    walletBalance: 229375.25,
    twoFactorEnabled: true
  },
  {
    id: "3",
    name: "Vikram",
    surname: "Reddy",
    email: "v.reddy@example.com",
    idType: "Aadhaar",
    phone: "+91 76543 21098",
    status: "Inactive",
    role: "Account Manager",
    lastLogin: "2025-03-25T09:45:00",
    created: "2025-01-18T10:00:00",
    walletBalance: 65430.75,
    twoFactorEnabled: false
  },
  {
    id: "4",
    name: "Divya",
    surname: "Krishnan",
    email: "d.krishnan@example.com",
    idType: "Passport",
    phone: "+91 65432 10987",
    status: "Pending",
    role: "Sales Rep",
    lastLogin: null,
    created: "2025-04-01T16:20:00",
    walletBalance: 0,
    twoFactorEnabled: false
  },
  {
    id: "5",
    name: "Rajesh",
    surname: "Gupta",
    email: "rajesh.gupta@example.com",
    idType: "Driving License",
    phone: "+91 54321 09876",
    status: "Active",
    role: "Sales Rep",
    lastLogin: "2025-04-13T08:15:00",
    created: "2025-02-07T11:45:00",
    walletBalance: 172345.40,
    twoFactorEnabled: true
  },
  {
    id: "6",
    name: "Ananya",
    surname: "Iyer",
    email: "a.iyer@example.com",
    idType: "Aadhaar",
    phone: "+91 43210 98765",
    status: "Active",
    role: "Finance Manager",
    lastLogin: "2025-04-11T14:30:00",
    created: "2024-09-15T13:10:00",
    walletBalance: 643760.20,
    twoFactorEnabled: true
  },
  {
    id: "7",
    name: "Karthik",
    surname: "Choudhary",
    email: "k.choudhary@example.com",
    idType: "PAN Card",
    phone: "+91 32109 87654",
    status: "Suspended",
    role: "Sales Rep",
    lastLogin: "2025-03-01T10:45:00",
    created: "2024-10-22T09:30:00",
    walletBalance: 33120.75,
    twoFactorEnabled: true
  }
];

export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<typeof sampleUsers>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' })
  const [filters, setFilters] = useState({
    status: [],
    role: [],
    idType: []
  })
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  // Handle search
  useEffect(() => {
    const results = users.filter(user => {
      const fullName = `${user.name} ${user.surname}`.toLowerCase()
      const searchLower = searchTerm.toLowerCase()
      
      return (
        fullName.includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchTerm) ||
        user.idType.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      )
    })

    // Apply filters
    let filtered = [...results]
    
    if (filters.status.length > 0) {//@ts-ignore
      filtered = filtered.filter(user => filters.status.includes(user.status))
    }
    
    if (filters.role.length > 0) {//@ts-ignore
      filtered = filtered.filter(user => filters.role.includes(user.role))
    }
    
    if (filters.idType.length > 0) {//@ts-ignore
      filtered = filtered.filter(user => filters.idType.includes(user.idType))
    }
    
    // Apply sorting
    const sortedUsers = [...filtered].sort((a: any, b: any ) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
    
    setFilteredUsers(sortedUsers)
  }, [searchTerm, users, sortConfig, filters])

  // Handle sort
  const requestSort = (key: any) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Toggle select all users
  const toggleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {//@ts-ignore
      setSelectedUsers(currentUsers.map((user: any) => user.id))
    }
  }

  // Toggle select user
  const toggleSelectUser = (userId: any) => {//@ts-ignore
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id: any) => id !== userId))
    } else {//@ts-ignore
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Export users to Excel
  const exportToExcel = () => {
    setIsLoading(true)
    
    // Simulate export delay
    setTimeout(() => {
      // In a real app, this would use a library like xlsx to create an Excel file
      toast({
        title: "Export successful",
        description: `${filteredUsers.length} users exported to Excel`,
        variant: "default"
      })
      setIsLoading(false)
    }, 1000)
  }

  // Handle bulk actions
  const handleBulkAction = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (bulkAction === "activate") {
        setUsers(users.map((user: any) => //@ts-ignore
          selectedUsers.includes(user.id) ? {...user, status: "Active"} : user
        ))
        toast({
          title: "Users activated",
          description: `${selectedUsers.length} users have been activated`,
          variant: "default"
        })
      } else if (bulkAction === "deactivate") {
        setUsers(users.map((user: any) => //@ts-ignore
          selectedUsers.includes(user.id) ? {...user, status: "Inactive"} : user
        ))
        toast({
          title: "Users deactivated",
          description: `${selectedUsers.length} users have been deactivated`,
          variant: "default"
        })
      } else if (bulkAction === "delete") {//@ts-ignore
        setUsers(users.filter((user: any) => !selectedUsers.includes(user.id)))
        toast({
          title: "Users deleted",
          description: `${selectedUsers.length} users have been deleted`,
          variant: "default"
        })
      }
      
      setSelectedUsers([])
      setBulkActionDialogOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: [],
      role: [],
      idType: []
    })
    setSearchTerm("")
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
    })
  }

  // Handle import
  const handleImport = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      // In a real app, this would process the uploaded file
      setImportDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Import successful",
        description: "User data has been imported",
        variant: "default"
      })
    }, 1500)
  }

  // Get status badge styling
  const getStatusBadge = (status: any) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  // Format date
  const formatDate = (dateString: any) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  }
  
  const router = useRouter()
  // Filter options
  const statusOptions = ["Active", "Inactive", "Pending", "Suspended"]
  const roleOptions = ["Admin", "Sales Manager", "Account Manager", "Sales Rep", "Finance Manager"]
  const idTypeOptions = ["Passport", "Driver License", "National ID"]
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, permissions, and wallets</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setImportDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <CreateUserDialog />
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users by name, email, role..." 
                className="h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportToExcel}
                disabled={isLoading || filteredUsers.length === 0}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <DropdownMenu open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {(filters.status.length > 0 || filters.role.length > 0 || filters.idType.length > 0) && (
                      <Badge variant="secondary" className="ml-2 h-5 px-1">
                        {filters.status.length + filters.role.length + filters.idType.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Status</h4>
                    {statusOptions.map(status => (
                      <div key={status} className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={filters.status.includes(status as never)}
                          onCheckedChange={(checked) => {
                            if (checked) {//@ts-ignore
                              setFilters({...filters, status: [...filters.status, status]})
                            } else {//@ts-ignore
                              setFilters({...filters, status: filters.status.filter(s => s !== status)})
                            }
                          }}
                        />
                        <label htmlFor={`status-${status}`} className="text-sm">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Role</h4>
                    {roleOptions.map(role => (
                      <div key={role} className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id={`role-${role}`} 
                          checked={filters.role.includes(role as never)}
                          onCheckedChange={(checked) => {
                            if (checked) {//@ts-ignore
                              setFilters({...filters, role: [...filters.role, role]})
                            } else {
                              setFilters({...filters, role: filters.role.filter(r => r !== role)})
                            }
                          }}
                        />
                        <label htmlFor={`role-${role}`} className="text-sm">
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">ID Type</h4>
                    {idTypeOptions.map(idType => (
                      <div key={idType} className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id={`idType-${idType}`} 
                          checked={filters.idType.includes(idType as never)}
                          onCheckedChange={(checked) => {
                            if (checked) {//@ts-ignore
                              setFilters({...filters, idType: [...filters.idType, idType]})
                            } else {
                              setFilters({...filters, idType: filters.idType.filter(t => t !== idType)})
                            }
                          }}
                        />
                        <label htmlFor={`idType-${idType}`} className="text-sm">
                          {idType}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs"
                    >
                      Reset All
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setIsFilterMenuOpen(false)}
                      className="text-xs"
                    >
                      Apply
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedUsers.length > 0 && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setBulkActionDialogOpen(true)}
                >
                  Actions ({selectedUsers.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0} 
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    Name {sortConfig.key === 'name' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>ID Type</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                        Loading...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : currentUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentUsers.map((user) => (
                    <TableRow key={user.id} className="cursor-pointer" onClick={() => router.push(`/users/${user.id}`)}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id as never)} 
                          onCheckedChange={() => toggleSelectUser(user.id)}
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-semibold mr-2">
                            {user.name.charAt(0)}{user.surname.charAt(0)}
                          </div>
                          <div>
                            <div>{user.name} {user.surname}</div>
                            <div className="text-xs text-muted-foreground">{user.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.idType}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusBadge(user.status)}`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(user.lastLogin)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/users/${user.id}`}>
                              <UserCog className="h-4 w-4" />
                              <span className="sr-only">Edit user</span>
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/users/${user.id}`}>
                                  <UserCog className="h-4 w-4 mr-2" />
                                  Edit profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "Email sent",
                                  description: `Password reset email sent to ${user.email}`,
                                })
                              }}>
                                <Mail className="h-4 w-4 mr-2" />
                                Reset password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
                                <DropdownMenuItem onClick={() => {
                                  setUsers(users.map(u => u.id === user.id ? {...u, status: "Inactive"} : u))
                                  toast({
                                    title: "User deactivated",
                                    description: `${user.name} ${user.surname} has been deactivated`,
                                  })
                                }}>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Deactivate user
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => {
                                  setUsers(users.map(u => u.id === user.id ? {...u, status: "Active"} : u))
                                  toast({
                                    title: "User activated",
                                    description: `${user.name} ${user.surname} has been activated`,
                                  })
                                }}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate user
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="text-red-600 dark:text-red-400"
                                onClick={() => {
                                  setUsers(users.filter(u => u.id !== user.id))
                                  toast({
                                    title: "User deleted",
                                    description: `${user.name} ${user.surname} has been deleted`,
                                    variant: "destructive"
                                  })
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length > 0 ? (
              <>Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users</>
            ) : (
              'No users found'
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Rows per page</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(old => Math.max(old - 1, 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  
                  // Show first page, current page, last page, and one page before and after current
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          isActive={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                  
                  // Show ellipsis if there's a gap
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  
                  return null
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(old => Math.min(old + 1, totalPages))}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>

      {/* Bulk Action Dialog */}
      <Dialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Action</DialogTitle>
            <DialogDescription>
              Apply an action to {selectedUsers.length} selected users
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select onValueChange={setBulkAction}>
                <SelectTrigger className="col-span-4">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activate">Activate Users</SelectItem>
                  <SelectItem value="deactivate">Deactivate Users</SelectItem>
                  <SelectItem value="delete">Delete Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBulkAction} 
              disabled={!bulkAction || isLoading}
              className={bulkAction === "delete" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Apply {bulkAction}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Users</DialogTitle>
            <DialogDescription>
              Upload a CSV or Excel file with user data to import.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="mb-4">
                <h3 className="font-medium">Drag and drop your file here</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports .xlsx, .xls and .csv files
                </p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
              />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Browse files
                </Button>
              </label>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Template</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Download our template file to ensure correct formatting
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto">
                <Download className="h-4 w-4 mr-2" />
                Download template file
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>Import Users</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
