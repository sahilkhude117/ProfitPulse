"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
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
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar as CalendarIcon,
  Check,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  Flag,
  HelpCircle,
  Info,
  MoreHorizontal,
  Printer,
  RefreshCw,
  Search,
  Settings,
  Share,
  SlidersHorizontal,
  Trash2,
  Upload,
  X
} from "lucide-react"
import Link from "next/link"
import { format, isToday, isYesterday, subDays } from "date-fns"

const sampleTransactions = [
    {
      id: "txn-001",
      date: "2025-04-10T14:32:00Z",
      user: {
        id: "usr-001",
        name: "Arjun Sharma",
        email: "arjun.s@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "credit_card",
      status: "completed",
      amount: 1299.99,
      currency: "USD",
      description: "Pro Plan Subscription - Annual",
      category: "subscription",
      reference: "INV-2025-04-10-001",
      metadata: {
        cardLast4: "4242",
        cardBrand: "Visa"
      }
    },
    {
      id: "txn-002",
      date: "2025-04-09T09:15:00Z",
      user: {
        id: "usr-002",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        avatar: null
      },
      type: "refund",
      paymentMethod: "credit_card",
      status: "completed",
      amount: 499.99,
      currency: "USD",
      description: "Refund for Basic Plan - Monthly",
      category: "refund",
      reference: "REF-2025-04-09-001",
      metadata: {
        cardLast4: "1234",
        cardBrand: "Mastercard",
        reason: "Service not needed"
      }
    },
    {
      id: "txn-003",
      date: "2025-04-08T17:45:00Z",
      user: {
        id: "usr-003",
        name: "Vikram Mehta",
        email: "vikram.m@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "paypal",
      status: "completed",
      amount: 7999.99,
      currency: "USD",
      description: "Enterprise Plan - Annual",
      category: "subscription",
      reference: "INV-2025-04-08-001",
      metadata: {
        paypalEmail: "vikram.m@example.com"
      }
    },
    {
      id: "txn-004",
      date: "2025-04-08T10:22:00Z",
      user: {
        id: "usr-004",
        name: "Neha Gupta",
        email: "n.gupta@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "bank_transfer",
      status: "pending",
      amount: 2499.99,
      currency: "USD",
      description: "Team Plan Subscription - Quarterly",
      category: "subscription",
      reference: "INV-2025-04-08-002",
      metadata: {
        bankName: "First National Bank"
      }
    },
    {
      id: "txn-005",
      date: "2025-04-07T14:10:00Z",
      user: {
        id: "usr-005",
        name: "Rajiv Singh",
        email: "rajiv.s@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "credit_card",
      status: "failed",
      amount: 499.99,
      currency: "USD",
      description: "Basic Plan - Monthly",
      category: "subscription",
      reference: "INV-2025-04-07-001",
      metadata: {
        cardLast4: "5678",
        cardBrand: "Visa",
        failureReason: "Insufficient funds"
      }
    },
    {
      id: "txn-006",
      date: "2025-04-07T09:30:00Z",
      user: {
        id: "usr-006",
        name: "Ananya Reddy",
        email: "ananya.r@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "credit_card",
      status: "completed",
      amount: 199.99,
      currency: "USD",
      description: "Add-on: Advanced Analytics",
      category: "add_on",
      reference: "INV-2025-04-07-002",
      metadata: {
        cardLast4: "9012",
        cardBrand: "Amex"
      }
    },
    {
      id: "txn-007",
      date: "2025-04-06T16:45:00Z",
      user: {
        id: "usr-007",
        name: "Karan Malhotra",
        email: "k.malhotra@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "paypal",
      status: "processing",
      amount: 1499.99,
      currency: "USD",
      description: "Pro Plan Subscription - Quarterly",
      category: "subscription",
      reference: "INV-2025-04-06-001",
      metadata: {
        paypalEmail: "k.malhotra@example.com"
      }
    },
    {
      id: "txn-008",
      date: "2025-04-05T13:15:00Z",
      user: {
        id: "usr-008",
        name: "Divya Iyer",
        email: "d.iyer@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "crypto",
      status: "completed",
      amount: 899.99,
      currency: "USD",
      description: "Premium Plan - Semi-annual",
      category: "subscription",
      reference: "INV-2025-04-05-001",
      metadata: {
        cryptoType: "BTC",
        walletAddress: "3FZbgi29..."
      }
    },
    {
      id: "txn-009",
      date: "2025-04-04T11:22:00Z",
      user: {
        id: "usr-009",
        name: "Aditya Verma",
        email: "aditya.v@example.com",
        avatar: null
      },
      type: "refund",
      paymentMethod: "credit_card",
      status: "completed",
      amount: 199.99,
      currency: "USD",
      description: "Refund for Add-on: Enhanced Support",
      category: "refund",
      reference: "REF-2025-04-04-001",
      metadata: {
        cardLast4: "6543",
        cardBrand: "Mastercard",
        reason: "Service not required"
      }
    },
    {
      id: "txn-010",
      date: "2025-04-03T15:50:00Z",
      user: {
        id: "usr-010",
        name: "Meera Joshi",
        email: "meera.j@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "apple_pay",
      status: "completed",
      amount: 499.99,
      currency: "USD",
      description: "Basic Plan - Monthly",
      category: "subscription",
      reference: "INV-2025-04-03-001",
      metadata: {
        deviceType: "iPhone 18 Pro"
      }
    },
    {
      id: "txn-011",
      date: "2025-04-03T09:10:00Z",
      user: {
        id: "usr-011",
        name: "Rohit Choudhary",
        email: "r.choudhary@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "google_pay",
      status: "completed",
      amount: 199.99,
      currency: "USD",
      description: "Add-on: Premium Support",
      category: "add_on",
      reference: "INV-2025-04-03-002",
      metadata: {
        deviceType: "Pixel 10"
      }
    },
    {
      id: "txn-012",
      date: "2025-04-02T16:30:00Z",
      user: {
        id: "usr-012",
        name: "Kavita Desai",
        email: "k.desai@example.com",
        avatar: null
      },
      type: "payment",
      paymentMethod: "credit_card",
      status: "disputed",
      amount: 2499.99,
      currency: "USD",
      description: "Team Plan - Quarterly",
      category: "subscription",
      reference: "INV-2025-04-02-001",
      metadata: {
        cardLast4: "8765",
        cardBrand: "Visa",
        disputeReason: "Unauthorized charge"
      }
    }
];

// Create more sample transactions for pagination
const moreTransactions = [...Array(30)].map((_, index) => {
  const sampleIndex = index % sampleTransactions.length;
  const sample = sampleTransactions[sampleIndex];
  return {
    ...sample,
    id: `txn-extra-${index + 1}`,
    date: format(subDays(new Date(), Math.floor(Math.random() * 30)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    amount: parseFloat((Math.random() * 2000 + 99).toFixed(2)),
    reference: `INV-2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`
  };
});

// Combine all transactions
const allTransactions = [...sampleTransactions, ...moreTransactions];

export default function TransactionsPage() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(allTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' })
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [viewTransactionDialogOpen, setViewTransactionDialogOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportRange, setExportRange] = useState("filtered")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date()
  })
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    paymentMethod: [],
    category: [],
    amountRange: { min: "", max: "" }
  })
  
  // Handle search and filtering
  useEffect(() => {
    setIsLoading(true)
    
    setTimeout(() => {
      // First apply tab filter
      let results = [...transactions]
      
      if (activeTab !== "all") {
        results = results.filter(transaction => transaction.status === activeTab)
      }
      
      // Then apply search
      if (searchTerm) {
        results = results.filter(transaction => {
          const searchLower = searchTerm.toLowerCase()
          return (
            transaction.user.name.toLowerCase().includes(searchLower) ||
            transaction.user.email.toLowerCase().includes(searchLower) ||
            transaction.reference.toLowerCase().includes(searchLower) ||
            transaction.description.toLowerCase().includes(searchLower) ||
            transaction.id.toLowerCase().includes(searchLower)
          )
        })
      }
      
      // Apply date range filter
      if (dateRange.from || dateRange.to) {
        results = results.filter(transaction => {
          const txnDate = new Date(transaction.date)
          if (dateRange.from && dateRange.to) {
            return txnDate >= dateRange.from && txnDate <= dateRange.to
          } else if (dateRange.from) {
            return txnDate >= dateRange.from
          } else if (dateRange.to) {
            return txnDate <= dateRange.to
          }
          return true
        })
      }
      
      // Apply detailed filters
      if (filters.status.length > 0) { //@ts-ignore
        results = results.filter(transaction => filters.status.includes(transaction.status))
      }
      
      if (filters.type.length > 0) {//@ts-ignore
        results = results.filter(transaction => filters.type.includes(transaction.type))
      }
      
      if (filters.paymentMethod.length > 0) {//@ts-ignore
        results = results.filter(transaction => filters.paymentMethod.includes(transaction.paymentMethod))
      }
      
      if (filters.category.length > 0) {//@ts-ignore
        results = results.filter(transaction => filters.category.includes(transaction.category))
      }
      
      if (filters.amountRange.min !== "") {
        results = results.filter(transaction => transaction.amount >= parseFloat(filters.amountRange.min))
      }
      
      if (filters.amountRange.max !== "") {
        results = results.filter(transaction => transaction.amount <= parseFloat(filters.amountRange.max))
      }
      
      // Apply sorting
      results = [...results].sort((a, b) => {
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)//@ts-ignore
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA
        }
        
        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'ascending' ? a.amount - b.amount : b.amount - a.amount
        }
        //@ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }//@ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
      
      setFilteredTransactions(results)
      setIsLoading(false)
    }, 500) // Simulate loading delay
  }, [searchTerm, transactions, sortConfig, activeTab, filters, dateRange])

  // Handle sort
  const requestSort = (key:any) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Pagination logic
  const indexOfLastTransaction = currentPage * itemsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Toggle select all transactions
  const toggleSelectAll = () => {
    if (selectedTransactions.length === currentTransactions.length) {
      setSelectedTransactions([])
    } else {//@ts-ignore
      setSelectedTransactions(currentTransactions.map(transaction => transaction.id))
    }
  }

  // Toggle select transaction//@ts-ignore
  const toggleSelectTransaction = (transactionId:any) => {
    //@ts-ignore
    if (selectedTransactions.includes(transactionId)) {
      setSelectedTransactions(selectedTransactions.filter(id => id !== transactionId))
    } else {//@ts-ignore
      setSelectedTransactions([...selectedTransactions, transactionId])
    }
  }

  // Export transactions
  const handleExport = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      // In a real app, this would use a library like xlsx to create the export file
      toast({
        title: `Export successful`,
        description: `${exportRange === 'all' ? transactions.length : filteredTransactions.length} transactions exported as ${exportFormat === 'excel' ? 'Excel spreadsheet' : exportFormat === 'csv' ? 'CSV file' : 'PDF document'}`,
        //@ts-ignore
        variant: "success"
      })
      
      setExportDialogOpen(false)
      setIsLoading(false)
    }, 1500)
  }

  // Handle bulk actions
  const handleBulkAction = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (bulkAction === "export") {
        toast({
          title: "Export successful",
          description: `${selectedTransactions.length} transactions exported`,
          variant: 'default'
        })
      } else if (bulkAction === "archive") {
        toast({
          title: "Transactions archived",
          description: `${selectedTransactions.length} transactions have been archived`,
          variant: 'default'
        })
      } else if (bulkAction === "delete") {//@ts-ignore
        setTransactions(transactions.filter(transaction => !selectedTransactions.includes(transaction.id)))
        toast({
          title: "Transactions deleted",
          description: `${selectedTransactions.length} transactions have been deleted`,
          variant: "destructive"
        })
      }
      
      setSelectedTransactions([])
      setBulkActionDialogOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: [],
      type: [],
      paymentMethod: [],
      category: [],
      amountRange: { min: "", max: "" }
    })
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    })
    setSearchTerm("")
    setActiveTab("all")
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
      const newTransactionCount = Math.floor(Math.random() * 15) + 5
      
      setImportDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Import successful",
        description: `${newTransactionCount} new transactions have been imported`,
        variant: "default"
      })
    }, 1500)
  }

  // Format date
  const formatDate = (dateString:any) => {
    const date = new Date(dateString)
    
    if (isToday(date)) {
      return `Today, ${format(date, 'h:mm a')}`
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'h:mm a')}`
    } else {
      return format(date, 'MMM d, yyyy, h:mm a')
    }
  }
  
  // Format currency
//   const formatCurrency = (amount:any, currency:any) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: currency || 'USD'
//     }).format(amount)
//   }

  const CurrencyText = ({ amount, currency = 'USD' }:any) => {
    const [formatted, setFormatted] = useState('');
  
    useEffect(() => {
      setFormatted(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
        }).format(amount)
      );
    }, [amount, currency]);
  
    return <span>{formatted}</span>;
  };
  
  // Get status badge styling
  const getStatusBadge = (status:any) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "disputed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }
  
  // Get transaction type styling and icon
  const getTransactionTypeInfo = (type:any) => {
    switch (type) {
      case "payment":
        return { 
          icon: <ArrowDown className="h-4 w-4 text-green-600 dark:text-green-400" />,
          label: "Payment"
        }
      case "refund":
        return { 
          icon: <ArrowUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
          label: "Refund"
        }
      default:
        return { 
          icon: <Info className="h-4 w-4" />,
          label: type.charAt(0).toUpperCase() + type.slice(1)
        }
    }
  }
  
  // Get payment method info
  const getPaymentMethodInfo = (method:any) => {
    const methods = {
      credit_card: "Credit Card",
      paypal: "PayPal",
      bank_transfer: "Bank Transfer",
      crypto: "Cryptocurrency",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay"
    }
    //@ts-ignore
    return methods[method] || method.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  
  // Calculate summary numbers
  const transactionSummary = {
    total: filteredTransactions.length,
    completed: filteredTransactions.filter(t => t.status === "completed").length,
    pending: filteredTransactions.filter(t => t.status === "pending" || t.status === "processing").length,
    failed: filteredTransactions.filter(t => t.status === "failed" || t.status === "disputed").length,
    totalAmount: filteredTransactions.reduce((sum, t) => sum + (t.status === "completed" ? t.amount : 0), 0)
  }
  
  // Filter options
  const statusOptions = ["completed", "pending", "processing", "failed", "disputed", "refunded"]
  const typeOptions = ["payment", "refund"]
  const paymentMethodOptions = ["credit_card", "paypal", "bank_transfer", "crypto", "apple_pay", "google_pay"]
  const categoryOptions = ["subscription", "add_on", "refund", "one_time"]
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and track all financial transactions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setImportDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setExportDialogOpen(true)}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <h3 className="text-2xl font-bold mt-1">{transactionSummary.total}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={100} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold mt-1">{transactionSummary.completed}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={transactionSummary.completed / transactionSummary.total * 100} className="h-1 bg-gray-100 dark:bg-gray-800" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending/Processing</p>
                <h3 className="text-2xl font-bold mt-1">{transactionSummary.pending}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={transactionSummary.pending / transactionSummary.total * 100} className="h-1 bg-gray-100 dark:bg-gray-800" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                {/* <h3 className="text-2xl font-bold mt-1"> {formatCurrency(transactionSummary.totalAmount, 'USD')}</h3> */}
                <h3 className="text-2xl font-bold mt-1">
                    <CurrencyText amount={transactionSummary.totalAmount} />
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              From {transactionSummary.completed} completed transactions
            </div>
            </CardContent>
        </Card>
      </div>
      
      {/* Filters and Table */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filters</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="h-8 text-xs"
                >
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Range Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Date Range</div>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Select date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}//@ts-ignore
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Status Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Status</div>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <div className="flex items-center space-x-2" key={status}>
                      <Checkbox 
                        id={`status-${status}`} //@ts-ignore
                        checked={filters.status.includes(status)} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({
                              ...filters,//@ts-ignore
                              status: [...filters.status, status]
                            })
                          } else {
                            setFilters({
                              ...filters,
                              status: filters.status.filter((s) => s !== status)
                            })
                          }
                        }}
                      />
                      <label 
                        htmlFor={`status-${status}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Transaction Type Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Transaction Type</div>
                <div className="space-y-2">
                  {typeOptions.map((type) => (
                    <div className="flex items-center space-x-2" key={type}>
                      <Checkbox 
                        id={`type-${type}`} //@ts-ignore
                        checked={filters.type.includes(type)} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({
                              ...filters,//@ts-ignore
                              type: [...filters.type, type]
                            })
                          } else {
                            setFilters({
                              ...filters,
                              type: filters.type.filter((t) => t !== type)
                            })
                          }
                        }}
                      />
                      <label 
                        htmlFor={`type-${type}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Method Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Payment Method</div>
                <Select
                  value={filters.paymentMethod.length === 1 ? filters.paymentMethod[0] : "all"}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setFilters({
                        ...filters,//@ts-ignore
                        paymentMethod: []
                      })
                    } else if (value) {
                      setFilters({
                        ...filters,//@ts-ignore
                        paymentMethod: [value]
                      })
                    } else {
                      setFilters({
                        ...filters,
                        paymentMethod: []
                      })
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {getPaymentMethodInfo(method)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Amount Range Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Amount Range</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">
                      Min ($)
                    </label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={filters.amountRange.min}
                      onChange={(e) => 
                        setFilters({
                          ...filters,
                          amountRange: { ...filters.amountRange, min: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">
                      Max ($)
                    </label>
                    <Input 
                      type="number" 
                      placeholder="9999" 
                      value={filters.amountRange.max}
                      onChange={(e) => 
                        setFilters({
                          ...filters,
                          amountRange: { ...filters.amountRange, max: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="space-y-2">
                <div className="font-medium text-sm">Category</div>
                <div className="space-y-2">
                  {categoryOptions.map((category) => (
                    <div className="flex items-center space-x-2" key={category}>
                      <Checkbox 
                        id={`category-${category}`} //@ts-ignore
                        checked={filters.category.includes(category)} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({
                              ...filters,//@ts-ignore
                              category: [...filters.category, category]
                            })
                          } else {
                            setFilters({
                              ...filters,
                              category: filters.category.filter((c) => c !== category)
                            })
                          }
                        }}
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {category.replace('_', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Tabs and Actions */}
          <div className="flex flex-col space-y-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList className="h-9">
                  <TabsTrigger value="all" className="text-xs">All Transactions</TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs">Completed</TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
                  <TabsTrigger value="failed" className="text-xs">Failed</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="w-full sm:w-72 pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Sheet open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9 md:hidden">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader className="pb-3">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="pt-4 space-y-4">
                        {/* Mobile filter content - same as sidebar filters */}
                        {/* Date Range Filter */}
                        <div className="space-y-2">
                          <div className="font-medium text-sm">Date Range</div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {dateRange.from ? (
                                  dateRange.to ? (
                                    <>
                                      {format(dateRange.from, "LLL dd, y")} -{" "}
                                      {format(dateRange.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(dateRange.from, "LLL dd, y")
                                  )
                                ) : (
                                  "Select date range"
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange.from}
                                selected={dateRange}//@ts-ignore
                                onSelect={setDateRange}
                                numberOfMonths={1}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        {/* Mobile Status Filter */}
                        <div className="space-y-2">
                          <div className="font-medium text-sm">Status</div>
                          <div className="space-y-2">
                            {statusOptions.map((status) => (
                              <div className="flex items-center space-x-2" key={status}>
                                <Checkbox 
                                  id={`mobile-status-${status}`} //@ts-ignore
                                  checked={filters.status.includes(status)} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFilters({
                                        ...filters,//@ts-ignore
                                        status: [...filters.status, status]
                                      })
                                    } else {
                                      setFilters({
                                        ...filters,
                                        status: filters.status.filter((s) => s !== status)
                                      })
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`mobile-status-${status}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                >
                                  {status}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Mobile Amount Range */}
                        <div className="space-y-2">
                          <div className="font-medium text-sm">Amount Range</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs text-muted-foreground">
                                Min ($)
                              </label>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                value={filters.amountRange.min}
                                onChange={(e) => 
                                  setFilters({
                                    ...filters,
                                    amountRange: { ...filters.amountRange, min: e.target.value }
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-muted-foreground">
                                Max ($)
                              </label>
                              <Input 
                                type="number" 
                                placeholder="9999" 
                                value={filters.amountRange.max}
                                onChange={(e) => 
                                  setFilters({
                                    ...filters,
                                    amountRange: { ...filters.amountRange, max: e.target.value }
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button
                            className="w-full"
                            onClick={() => {
                              setIsFilterMenuOpen(false);
                            }}
                          >
                            Apply Filters
                          </Button>
                        </div>
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              resetFilters();
                              setIsFilterMenuOpen(false);
                            }}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </Tabs>
          </div>
          
          {/* Selected Actions */}
          {selectedTransactions.length > 0 && (
            <div className="bg-muted/40 p-2.5 rounded-md flex items-center justify-between">
              <div className="text-sm font-medium">
                {selectedTransactions.length} {selectedTransactions.length === 1 ? "transaction" : "transactions"} selected
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setBulkAction("export");
                    setBulkActionDialogOpen(true);
                  }}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Export
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setBulkAction("archive");
                    setBulkActionDialogOpen(true);
                  }}
                >
                  Archive
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => {
                    setBulkAction("delete");
                    setBulkActionDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
          
          {/* Transactions Table */}
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Transaction History</CardTitle>
                <div className="flex items-center gap-2">
                  <Select
                  value={filters.paymentMethod.length === 1 ? filters.paymentMethod[0] : "all"}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setFilters({
                        ...filters,//@ts-ignore
                        paymentMethod: [value]
                      })
                    } else {
                      setFilters({
                        ...filters,//@ts-ignore
                        paymentMethod: [value]
                      })
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {getPaymentMethodInfo(method)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => {
                      setIsLoading(true)
                      setTimeout(() => {
                        setIsLoading(false)
                        toast({
                          title: "Refreshed",
                          description: "Transaction data has been updated",
                        })
                      }, 1000)
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[40px] px-4">
                        <Checkbox 
                          checked={
                            currentTransactions.length > 0 && 
                            selectedTransactions.length === currentTransactions.length
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort('date')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Date</span>
                          {sortConfig.key === 'date' && (
                            sortConfig.direction === 'ascending' ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5" />
                            )
                          )}
                        </div>
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort('amount')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Amount</span>
                          {sortConfig.key === 'amount' && (
                            sortConfig.direction === 'ascending' ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5" />
                            )
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, index) => (
                        <TableRow key={`skeleton-${index}`}>
                          <TableCell colSpan={8}>
                            <div className="flex items-center space-x-4">
                              <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                                <div className="h-3 w-32 animate-pulse rounded bg-muted"></div>
                              </div>
                              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : currentTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Info className="h-6 w-6 mb-2" />
                            <p>No transactions found</p>
                            <p className="text-sm">Try adjusting your filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="px-4">
                            <Checkbox //@ts-ignore
                              checked={selectedTransactions.includes(transaction.id)}
                              onCheckedChange={() => toggleSelectTransaction(transaction.id)}
                              aria-label={`Select transaction ${transaction.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{formatDate(transaction.date)}</div>
                            <div className="text-xs text-muted-foreground mt-1">{transaction.reference}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {transaction.user.name.split(' ').map(part => part[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium leading-none">{transaction.user.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">{transaction.user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[250px] truncate font-medium">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 capitalize">
                              {transaction.category.replace('_', ' ')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {getTransactionTypeInfo(transaction.type).icon}
                              <span className="text-sm">
                                {getTransactionTypeInfo(transaction.type).label}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getPaymentMethodInfo(transaction.paymentMethod)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(transaction.status)}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {transaction.type === 'refund' ? '-' : ''}
                            <CurrencyText amount={transaction.amount} currency={transaction.currency} />
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {//@ts-ignore
                                  setCurrentTransaction(transaction);
                                  setViewTransactionDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share className="mr-2 h-4 w-4" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
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
            <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTransactions.length === 0 ? 0 : indexOfFirstTransaction + 1}-
                {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === pageNumber}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* View Transaction Details Dialog */}
      <Dialog open={viewTransactionDialogOpen} onOpenChange={setViewTransactionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Detailed information about this transaction
            </DialogDescription>
          </DialogHeader>
          
          {currentTransaction && (
            <div className="space-y-4">
              {/* Transaction Header */}
              <div className="flex items-center justify-between"> {/*@ts-ignore*/}
                <Badge className={getStatusBadge(currentTransaction.status)}> {/*@ts-ignore*/}
                  {currentTransaction.status.charAt(0).toUpperCase() + currentTransaction.status.slice(1)}
                </Badge>
                <div className="text-sm font-medium">
                  {/*@ts-ignore*/}
                  {currentTransaction.reference}
                </div>
              </div>
              
              {/* Amount and Date */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="text-2xl font-bold mt-1"> 
                    {/* {formatCurrency(currentTransaction.amount, currentTransaction.currency)} */}
                    {/*@ts-ignore*/}
                    <CurrencyText amount={currentTransaction.amount} currency={currentTransaction.currency} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-medium mt-1"> {/*@ts-ignore*/}
                    {formatDate(currentTransaction.date)}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* User Info */}
              <div>
                <div className="text-sm font-medium mb-2">Customer</div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {/*@ts-ignore*/}
{currentTransaction.user.name.split(' ').map(part => part[0]).join('')}
</AvatarFallback>
</Avatar>
<div> {/*@ts-ignore*/}
<div className="font-medium">{currentTransaction.user.name}</div>
{/*@ts-ignore*/}
<div className="text-sm text-muted-foreground">{currentTransaction.user.email}</div>
</div>
</div>
</div>

{/* Transaction Details */}
<div className="space-y-3">
<div className="text-sm font-medium">Transaction Details</div>

<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
<div className="text-muted-foreground">Type</div>
{/*@ts-ignore*/}
<div className="font-medium capitalize">{currentTransaction.type}</div>

<div className="text-muted-foreground">Category</div>
{/*@ts-ignore*/}
<div className="font-medium capitalize">{currentTransaction.category.replace('_', ' ')}</div>

<div className="text-muted-foreground">Payment Method</div>
{/*@ts-ignore*/}
<div className="font-medium">{getPaymentMethodInfo(currentTransaction.paymentMethod)}</div>

<div className="text-muted-foreground">Description</div>
{/*@ts-ignore*/}
<div className="font-medium">{currentTransaction.description}</div>
</div>
</div>

{/* Payment Details */}
{/*@ts-ignore*/}
{currentTransaction.metadata && Object.keys(currentTransaction.metadata).length > 0 && (
<>
<Separator />
<div className="space-y-3">
<div className="text-sm font-medium">Payment Details</div>
<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
  {/*@ts-ignore*/}
  {Object.entries(currentTransaction.metadata).map(([key, value]) => (
    <React.Fragment key={key}>
      <div className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}</div>
      {/*@ts-ignore*/}
      <div className="font-medium">{value}</div>
    </React.Fragment>
  ))}
</div>
</div>
</>
)}
</div>
)}

<DialogFooter className="gap-2 sm:gap-0">
<Button variant="outline" onClick={() => setViewTransactionDialogOpen(false)}>
Close
</Button>
<Button>
<Printer className="mr-2 h-4 w-4" />
Print Receipt
</Button>
</DialogFooter>
</DialogContent>
</Dialog>

{/* Bulk Action Confirmation Dialog */}
<Dialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
<DialogContent>
<DialogHeader>
<DialogTitle>
{bulkAction === "export" ? "Export Transactions" : 
bulkAction === "archive" ? "Archive Transactions" : 
"Delete Transactions"}
</DialogTitle>
<DialogDescription>
{bulkAction === "export" 
? `You are about to export ${selectedTransactions.length} transactions.`
: bulkAction === "archive"
? `You are about to archive ${selectedTransactions.length} transactions. This action can be undone later.`
: `You are about to delete ${selectedTransactions.length} transactions. This action cannot be undone.`
}
</DialogDescription>
</DialogHeader>

{bulkAction === "delete" && (
<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-md text-sm mb-4">
<div className="flex items-start gap-2">
<Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
<div>
This is a permanent action and cannot be undone. All selected transactions will be permanently removed from the system.
</div>
</div>
</div>
)}

<DialogFooter className="gap-2 sm:gap-0">
<Button variant="outline" onClick={() => setBulkActionDialogOpen(false)}>
Cancel
</Button>
<Button 
onClick={handleBulkAction}
variant={bulkAction === "delete" ? "destructive" : "default"}
disabled={isLoading}
>
{isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
{bulkAction === "export" ? "Export Selected" : 
bulkAction === "archive" ? "Archive Selected" : 
"Delete Selected"}
</Button>
</DialogFooter>
</DialogContent>
</Dialog>

{/* Import Dialog */}
<Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
<DialogContent>
<DialogHeader>
<DialogTitle>Import Transactions</DialogTitle>
<DialogDescription>
Upload a CSV or Excel file to import transactions
</DialogDescription>
</DialogHeader>

<div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2">
<Upload className="h-8 w-8 text-muted-foreground mb-2" />
<div className="text-sm font-medium">Drag & drop your file here</div>
<div className="text-xs text-muted-foreground">
Supports Excel, CSV, and JSON formats
</div>
<Button size="sm" className="mt-2">
Select File
</Button>
</div>

<div className="space-y-2">
<div className="text-sm font-medium">Import Options</div>
<div className="space-y-2">
<div className="flex items-center space-x-2">
<Checkbox id="override-existing" />
<label htmlFor="override-existing" className="text-sm">
Override existing transactions with matching IDs
</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="notify-customers" />
<label htmlFor="notify-customers" className="text-sm">
Send email notifications to customers
</label>
</div>
</div>
</div>

<DialogFooter className="gap-2 sm:gap-0">
<Button variant="outline" onClick={() => setImportDialogOpen(false)}>
Cancel
</Button>
<Button onClick={handleImport} disabled={isLoading}>
{isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
Import
</Button>
</DialogFooter>
</DialogContent>
</Dialog>

{/* Export Dialog */}
<Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
<DialogContent>
<DialogHeader>
<DialogTitle>Export Transactions</DialogTitle>
<DialogDescription>
Choose your export format and options
</DialogDescription>
</DialogHeader>

<div className="space-y-4">
<div className="space-y-2">
<div className="text-sm font-medium">Format</div>
<Select
value={exportFormat}
onValueChange={setExportFormat}
>
<SelectTrigger>
<SelectValue placeholder="Select format" />
</SelectTrigger>
<SelectContent>
<SelectItem value="excel">Excel (.xlsx)</SelectItem>
<SelectItem value="csv">CSV (.csv)</SelectItem>
<SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
</SelectContent>
</Select>
</div>

<div className="space-y-2">
<div className="text-sm font-medium">Data Range</div>
<Select
value={exportRange}
onValueChange={setExportRange}
>
<SelectTrigger>
<SelectValue placeholder="Select data range" />
</SelectTrigger>
<SelectContent>
<SelectItem value="filtered">Current filtered view ({filteredTransactions.length} transactions)</SelectItem>
<SelectItem value="all">All transactions ({transactions.length} transactions)</SelectItem>
</SelectContent>
</Select>
</div>

<div className="space-y-2">
<div className="text-sm font-medium">Columns to Include</div>
<div className="grid grid-cols-2 gap-2">
<div className="flex items-center space-x-2">
<Checkbox id="col-id" defaultChecked />
<label htmlFor="col-id" className="text-sm">ID</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="col-date" defaultChecked />
<label htmlFor="col-date" className="text-sm">Date & Time</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="col-customer" defaultChecked />
<label htmlFor="col-customer" className="text-sm">Customer</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="col-amount" defaultChecked />
<label htmlFor="col-amount" className="text-sm">Amount</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="col-status" defaultChecked />
<label htmlFor="col-status" className="text-sm">Status</label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="col-payment" defaultChecked />
<label htmlFor="col-payment" className="text-sm">Payment Method</label>
</div>
</div>
</div>
</div>

<DialogFooter className="gap-2 sm:gap-0">
<Button variant="outline" onClick={() => setExportDialogOpen(false)}>
Cancel
</Button>
<Button onClick={handleExport} disabled={isLoading}>
{isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
Export {exportRange === 'all' ? 'All' : 'Filtered'} Transactions
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</div>
)
}