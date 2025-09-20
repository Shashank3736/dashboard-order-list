'use client';

import { getOrders } from '@/lib/actions';
import { Order } from '@/lib/data';
import { getReadableTime, cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { motion } from 'motion/react'
import { SearchIcon, CheckIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'text-blue-500';
    case 'Complete':
      return 'text-green-500';
    case 'Pending':
      return 'text-yellow-500';
    case 'Approved':
      return 'text-green-600';
    case 'Rejected':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [isSearchFocused, setSearchFocused] = useState(false)
  const [sortBy, setSortBy] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const itemsPerPage = 10

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'id', label: 'Order ID' },
    { value: 'user', label: 'User Name' },
    { value: 'project', label: 'Project' },
    { value: 'status', label: 'Status' },
    { value: 'address', label: 'Address' },
  ]

  useEffect(() => {
    getOrders().then(res => {
      setOrders(res)
      setFilteredOrders(res)
    });
  },[])

  // Sort orders function
  const sortOrders = (ordersToSort: Order[], sortField: string, order: 'asc' | 'desc') => {
    return [...ordersToSort].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let bValue: any

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
        case 'id':
          aValue = a.id
          bValue = b.id
          break
        case 'user':
          aValue = a.user.name.toLowerCase()
          bValue = b.user.name.toLowerCase()
          break
        case 'project':
          aValue = a.project.toLowerCase()
          bValue = b.project.toLowerCase()
          break
        case 'status':
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case 'address':
          aValue = a.address.toLowerCase()
          bValue = b.address.toLowerCase()
          break
        default:
          return 0
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  // Filter and sort orders based on search query and sort options
  useEffect(() => {
    let filtered = orders

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = orders.filter(order => {
        return (
          order.id.toLowerCase().includes(query) ||
          order.user.name.toLowerCase().includes(query) ||
          order.project.toLowerCase().includes(query) ||
          order.address.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query) ||
          getReadableTime(order.date).toLowerCase().includes(query)
        )
      })
    }

    // Apply sorting
    const sorted = sortOrders(filtered, sortBy, sortOrder)
    
    setFilteredOrders(sorted)
    setCurrentPage(1) // Reset to first page when searching or sorting
  }, [searchQuery, orders, sortBy, sortOrder])

  // Calculate pagination based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  // Selection handlers
  const handleSelectAll = () => {
    const currentOrderIds = currentOrders.map(order => order.id)
    const allCurrentSelected = currentOrderIds.every(id => selectedOrders.has(id))
    
    if (allCurrentSelected) {
      // Deselect all current page orders
      const newSelected = new Set(selectedOrders)
      currentOrderIds.forEach(id => newSelected.delete(id))
      setSelectedOrders(newSelected)
    } else {
      // Select all current page orders
      const newSelected = new Set(selectedOrders)
      currentOrderIds.forEach(id => newSelected.add(id))
      setSelectedOrders(newSelected)
    }
  }

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  // Check if all current page orders are selected
  const currentOrderIds = currentOrders.map(order => order.id)
  const allCurrentSelected = currentOrderIds.length > 0 && currentOrderIds.every(id => selectedOrders.has(id))
  const someCurrentSelected = currentOrderIds.some(id => selectedOrders.has(id))

  // Handle order toggle
  const handleOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="w-full">
      <div className='bg-card rounded-lg py-2 px-4 flex items-center justify-between'>
        <div className='flex flex-row-reverse items-center gap-2'>
          {/* Sort order toggle button */}
          <Button 
            variant={"ghost"} 
            size="icon" 
            className='rounded-full transition-transform duration-200'
            onClick={handleOrderToggle}
            style={{
              transform: sortOrder === 'asc' ? 'scaleY(-1)' : 'scaleY(1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.19194 10.3081C1.07473 10.1908 0.91576 10.125 0.75 10.125C0.58424 10.125 0.425268 10.1908 0.308058 10.3081C0.190848 10.4253 0.125 10.5842 0.125 10.75C0.125 10.9158 0.190848 11.0747 0.308058 11.1919L2.80806 13.6919C2.92527 13.8092 3.08424 13.875 3.25 13.875C3.41576 13.875 3.57473 13.8092 3.69194 13.6919L6.19171 11.1922C6.30892 11.075 6.375 10.9158 6.375 10.75C6.375 10.5842 6.30915 10.4253 6.19194 10.3081C6.07473 10.1908 5.91576 10.125 5.75 10.125C5.58424 10.125 5.42527 10.1908 5.30806 10.3081L3.25 12.3661L1.19194 10.3081Z" />
              <path d="M2.625 0.75V13.25C2.625 13.5952 2.90482 13.875 3.25 13.875C3.59518 13.875 3.875 13.5952 3.875 13.25V0.75C3.875 0.404822 3.59518 0.125 3.25 0.125C2.90482 0.125 2.625 0.404822 2.625 0.75Z" />
              <path d="M12.8077 3.69162C12.9249 3.80883 13.0842 3.875 13.25 3.875C13.4158 3.875 13.5747 3.80915 13.6919 3.69194C13.8092 3.57473 13.875 3.41576 13.875 3.25C13.875 3.08424 13.8092 2.92527 13.6919 2.80806L11.1919 0.308058C11.0747 0.190848 10.9158 0.125 10.75 0.125C10.5842 0.125 10.4253 0.190848 10.3081 0.308058L7.80806 2.80806C7.69085 2.92527 7.625 3.08424 7.625 3.25C7.625 3.26001 7.62524 3.27002 7.62572 3.28002C7.63318 3.43522 7.69819 3.58207 7.80806 3.69194C7.92527 3.80915 8.08424 3.875 8.25 3.875C8.41576 3.875 8.57473 3.80915 8.69194 3.69194L10.75 1.63388L12.8077 3.69162Z" />
              <path d="M11.375 13.25V0.75C11.375 0.404822 11.0952 0.125 10.75 0.125C10.4048 0.125 10.125 0.404822 10.125 0.75V13.25C10.125 13.5952 10.4048 13.875 10.75 13.875C11.0952 13.875 11.375 13.5952 11.375 13.25Z" />
            </svg>
          </Button>
          {/* Sort field selection dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className='rounded-full' variant={"ghost"} size={"icon"}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.625 10C15.625 10.1658 15.5592 10.3247 15.4419 10.4419C15.3247 10.5592 15.1658 10.625 15 10.625H5C4.83424 10.625 4.67527 10.5592 4.55806 10.4419C4.44085 10.3247 4.375 10.1658 4.375 10C4.375 9.83424 4.44085 9.67527 4.55806 9.55806C4.67527 9.44085 4.83424 9.375 5 9.375H15C15.1658 9.375 15.3247 9.44085 15.4419 9.55806C15.5592 9.67527 15.625 9.83424 15.625 10ZM18.125 5.625H1.875C1.70924 5.625 1.55027 5.69085 1.43306 5.80806C1.31585 5.92527 1.25 6.08424 1.25 6.25C1.25 6.41576 1.31585 6.57473 1.43306 6.69194C1.55027 6.80915 1.70924 6.875 1.875 6.875H18.125C18.2908 6.875 18.4497 6.80915 18.5669 6.69194C18.6842 6.57473 18.75 6.41576 18.75 6.25C18.75 6.08424 18.6842 5.92527 18.5669 5.80806C18.4497 5.69085 18.2908 5.625 18.125 5.625ZM11.875 13.125H8.125C7.95924 13.125 7.80027 13.1908 7.68306 13.3081C7.56585 13.4253 7.5 13.5842 7.5 13.75C7.5 13.9158 7.56585 14.0747 7.68306 14.1919C7.80027 14.3092 7.95924 14.375 8.125 14.375H11.875C12.0408 14.375 12.1997 14.3092 12.3169 14.1919C12.4342 14.0747 12.5 13.9158 12.5 13.75C12.5 13.5842 12.4342 13.4253 12.3169 13.3081C12.1997 13.1908 12.0408 13.125 11.875 13.125Z"/>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-48"
              sideOffset={4}
              avoidCollisions={true}
              collisionPadding={8}
            >
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className="flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <motion.div
            layout
            className="relative"
            animate={{
              width: isSearchFocused ? 240 : 160,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
          >
            <div className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
            </div>
            <Input
              id="search-desktop"
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm w-12">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={allCurrentSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someCurrentSelected && !allCurrentSelected
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Order ID</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">User</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Project</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Address</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Date</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr 
                key={order.id} 
                className={cn(
                  "border-b transition-colors hover:bg-card",
                  selectedOrders.has(order.id) && "bg-blue-50 dark:bg-blue-950/20"
                )}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {order.id.replace('ORD-', '#CM')}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={order.user.profile}
                        alt={order.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {order.user.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {order.project}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {order.address}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getReadableTime(order.date)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", getStatusColor(order.status).replace('text-', 'bg-'))} />
                    <span className={cn("text-sm font-medium", getStatusColor(order.status))}>
                      {order.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Selection Summary */}
      {selectedOrders.size > 0 && (
        <div className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-700 dark:text-blue-300">
            {selectedOrders.size} order{selectedOrders.size !== 1 ? 's' : ''} selected
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mt-6 px-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} entries
          {searchQuery && filteredOrders.length !== orders.length && (
            <span className="ml-1 text-blue-600 dark:text-blue-400">
              (filtered from {orders.length} total)
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              currentPage === 1
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={cn(
                  "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              currentPage === totalPages
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
