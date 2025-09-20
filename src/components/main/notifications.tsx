"use client"

import React, { useEffect, useState } from "react"
import { motion } from "motion/react"
import { BellIcon, BugIcon, UserIcon, CreditCardIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { getNotifications, type NotificationResultType } from "@/lib/actions"
import { cn } from "@/lib/utils"

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "bug":
      return <BugIcon className="size-4 text-red-500" />
    case "user":
      return <UserIcon className="size-4 text-blue-500" />
    case "subscription":
      return <CreditCardIcon className="size-4 text-green-500" />
    default:
      return <BellIcon className="size-4" />
  }
}

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case "bug":
      return "bg-red-50 dark:bg-red-950/20"
    case "user":
      return "bg-blue-50 dark:bg-blue-950/20"
    case "subscription":
      return "bg-green-50 dark:bg-green-950/20"
    default:
      return "bg-muted/50"
  }
}

interface NotificationsProps {
  className?: string
}

const Notifications = ({ className }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<NotificationResultType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const unreadCount = notifications.length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          aria-label="Notifications"
          className={cn(
            "relative rounded-md p-2 hover:bg-muted/60",
            className
          )}
          whileHover={{ y: -1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BellIcon
            strokeWidth={1}
            className="size-5"
          />
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <div className="border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            You have {unreadCount} unread notifications
          </p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4">
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <BellIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex items-start gap-3 p-4 transition-colors hover:bg-muted/50",
                    getNotificationBgColor(notification.type)
                  )}
                >
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="border-t p-2">
            <button className="w-full rounded-md p-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              Mark all as read
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default Notifications