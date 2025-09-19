import { BellIcon, ClockFadingIcon, SearchIcon, SidebarIcon, StarIcon } from 'lucide-react'
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Input } from '../ui/input'
import { ModeToggle } from '../dark-mode-toggle'

const Navbar = () => {
  return (
    <div className='flex flex-wrap gap-2 justify-between px-7 py-5 border'>
        <div className='flex space-x-2 items-center'>
            <SidebarIcon strokeWidth={1} />
            <StarIcon strokeWidth={1} className='fill-gray-300' />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Dashboards</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Default</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className='flex flex-wrap justify-center gap-2 items-center'>
            <div className="relative max-w-[160px] w-full gap-1.5">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                    <SearchIcon className='h-4 w-4' />
                </div>
                <Input id='search' type='search' placeholder='Search' className='pl-8' />
            </div>
            <ModeToggle />
            <ClockFadingIcon strokeWidth={1} />
            <BellIcon strokeWidth={1} className='fill-gray-300' />
            <SidebarIcon strokeWidth={1} />
        </div>
    </div>
  )
}

export default Navbar