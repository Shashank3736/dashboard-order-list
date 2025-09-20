"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AcitivitiesResultType, getActivities, getContacts, getNotifications, NotificationResultType } from '@/lib/actions'
import { NotificationCard } from '../ui/notification'
import { User } from '@/lib/data'
import Image from 'next/image'
import { shortifyText } from '@/lib/utils'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const LeftSidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [notification, setNotification] = useState<NotificationResultType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<AcitivitiesResultType[]>([]);

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    const isMdUp = typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches
    if (isMdUp && open) {
      document.body.classList.add('secondary-sidebar-open')
    } else {
      document.body.classList.remove('secondary-sidebar-open')
    }

    getNotifications().then(res => setNotification(res));
    getContacts().then(res => setUsers(res));
    getActivities().then(res => setActivities(res));

    return () => {
      document.body.classList.remove('secondary-sidebar-open')
    }
  }, [open])

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.div
            key="secondary-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-[2px] xl:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            id="primary-sidebar"
            role="complementary"
            aria-label="Primary sidebar"
            key="primary-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-screen w-[85vw] max-w-[320px] xl:w-[280px] xl:max-w-none bg-background border-l shadow-xl xl:shadow-none"
          >
            <div className="h-full overflow-y-auto px-4 py-5 space-y-6">
              <div className='space-y-2'>
                <p className='font-medium'>Notifications</p>
                {notification.map(n => (
                  <NotificationCard key={n.id} data={n} />
                ))}
              </div>
              <div className='space-y-2 relative'>
                <p className='font-medium'>Activities</p>
                <div className='relative flex flex-col gap-2'>
                  <span className='absolute border border-foreground/10 mt-2 h-[calc(100%-15px)] ml-[11px] -z-10'></span>
                {activities.map(activity => (
                  <div key={activity.id} className="flex gap-1">
                    <div className='flex items-center justify-center'>
                      <Image src={activity.image} alt={activity.id.toLocaleString()} width={24} height={24} />
                    </div>
                    <div>
                      <p className='text-sm'>{shortifyText(activity.message)}</p>
                      <p className='text-xs text-muted-foreground'>{activity.createdAt}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
              <div className='space-y-2'>
                <p className='font-medium'>Contacts</p>
                {users.map(user => (
                  <div key={user.id} className="flex gap-1 pb-2">
                    <Image src={user.profileImage} alt={user.name} width={24} height={24} />
                    <p className='text-sm'>{user.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default LeftSidebar