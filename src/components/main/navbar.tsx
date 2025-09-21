'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClockFadingIcon,
  SearchIcon,
  SidebarIcon,
  StarIcon,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Input } from '../ui/input';
import { ModeToggle } from '../dark-mode-toggle';
import Sidebar from './sidebar';
import LeftSidebar from './left-sidebar';
import Notifications from './notifications';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const iconHover = {
  whileHover: { y: -1, scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const Navbar = () => {
  const router = useRouter();
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const [isPrimarySidebarOpen, setPrimarySidebarOpen] = useState(false);
  const closePrimarySidebar = useCallback(
    () => setPrimarySidebarOpen(false),
    []
  );
  const togglePrimarySidebar = useCallback(
    () => setPrimarySidebarOpen((v) => !v),
    []
  );

  const [isSecondarySidebarOpen, setSecondarySidebarOpen] = useState(false);
  const closeSecondarySidebar = useCallback(
    () => setSecondarySidebarOpen(false),
    []
  );
  const toggleSecondarySidebar = useCallback(
    () => setSecondarySidebarOpen((v) => !v),
    []
  );

  const toggleMobileSearch = useCallback(() => {
    setMobileSearchOpen((v) => !v);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-background/70 supports-[backdrop-filter]:bg-background/50 border-b px-4 py-3 backdrop-blur md:px-7 md:py-5"
      >
        <div className="flex items-center justify-between gap-2">
          {/* Left: menu, favorite, breadcrumb */}
          <div className="flex items-center gap-2">
            <motion.button
              aria-label="Toggle sidebar"
              className="hover:bg-muted/60 rounded-md p-2"
              onClick={togglePrimarySidebar}
              aria-expanded={isPrimarySidebarOpen}
              {...iconHover}
            >
              <SidebarIcon strokeWidth={1} className="size-5 md:size-5" />
            </motion.button>

            <motion.button
              aria-label="Star"
              className="hover:bg-muted/60 rounded-md p-2"
              {...iconHover}
            >
              <StarIcon
                strokeWidth={1}
                className="text-muted-foreground/80 size-5"
              />
            </motion.button>

            <motion.div
              layout
              className="hidden min-w-0 sm:block"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Breadcrumb className="truncate">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={'/'}>Dahsboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Default</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          </div>
          {/* Right: search, actions */}
          <div className="flex items-center gap-1.5">
            {/* Desktop search (animated width) */}
            <motion.div
              layout
              className="relative hidden md:block"
              animate={{
                width: isSearchFocused ? 240 : 160,
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            >
              <div className="text-muted-foreground pointer-events-none absolute top-2.5 left-2.5 h-4 w-4">
                <SearchIcon className="h-4 w-4" />
              </div>
              <Input
                id="search-desktop"
                type="search"
                placeholder="Search"
                className="pl-8"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>

            {/* Mobile search toggle */}
            <motion.button
              aria-label="Open search"
              className="hover:bg-muted/60 rounded-md p-2 md:hidden"
              onClick={toggleMobileSearch}
              aria-expanded={isMobileSearchOpen}
              {...iconHover}
            >
              <SearchIcon className="size-5" />
            </motion.button>

            <motion.div {...iconHover}>
              <ModeToggle />
            </motion.div>
            <motion.button
              aria-label="Refresh"
              className="hover:bg-muted/60 rounded-md p-2"
              onClick={() => router.refresh()}
              {...iconHover}
            >
              <ClockFadingIcon strokeWidth={1} className="size-5" />
            </motion.button>
            <Notifications />
            <motion.button
              aria-label="Secondary sidebar"
              className="hover:bg-muted/60 rounded-md p-2"
              onClick={toggleSecondarySidebar}
              aria-expanded={isSecondarySidebarOpen}
              {...iconHover}
            >
              <SidebarIcon strokeWidth={1} className="size-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile search drawer */}
        <AnimatePresence initial={false}>
          {isMobileSearchOpen && (
            <motion.div
              key="mobile-search"
              initial={{ height: 0, opacity: 0, y: -6 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden"
            >
              <div className="relative mt-2">
                <div className="text-muted-foreground pointer-events-none absolute top-2.5 left-2.5 h-4 w-4">
                  <SearchIcon className="h-4 w-4" />
                </div>
                <Input
                  id="search-mobile"
                  type="search"
                  placeholder="Search"
                  className="pl-8"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setMobileSearchOpen(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <Sidebar open={isPrimarySidebarOpen} onClose={closePrimarySidebar} />
      <LeftSidebar
        open={isSecondarySidebarOpen}
        onClose={closeSecondarySidebar}
      />
    </>
  );
};

export default Navbar;
