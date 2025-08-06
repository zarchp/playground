import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Dices, Hash, Home, LayoutGrid, MessageCircleMore } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: route('home'),
    icon: Home,
  },
  {
    title: 'Chats',
    href: route('chats.index'),
    icon: MessageCircleMore,
  },
  {
    title: 'Dice',
    href: route('dice.index'),
    icon: Dices,
  },
  {
    title: 'Tic Tac Toe',
    href: route('tic-tac-toe.index'),
    icon: Hash,
  },
  {
    title: '2048',
    href: route('four-eight.index'),
    icon: LayoutGrid,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link
                href={route('home')}
                prefetch
              >
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
