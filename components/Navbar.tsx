"use client"

import * as React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

export function Navbar() {
  const {data : session} = useSession();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="font-bold text-xl">
            JobBoard
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/jobs" className={navigationMenuTriggerStyle()}>
                  Browse Jobs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
               {session ? (
                 <NavigationMenuLink href="/jobs/post" className={navigationMenuTriggerStyle()}>
                   Post a Job
                 </NavigationMenuLink>
               ) : null}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
              {session ? (
                <NavigationMenuItem>
                  <form action={logout}>
                    <Button type="submit" variant="outline" className={navigationMenuTriggerStyle()}>
                      Sign Out
                    </Button>
                  </form>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink href="/auth/signin" className={navigationMenuTriggerStyle()}>
                    Sign In
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
       
      </div>
    </div>
  )
}