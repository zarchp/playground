import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronsUpDown, LogIn } from 'lucide-react';

export function NavUser() {
  const { auth } = usePage<SharedData>().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {auth.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="group cursor-pointer data-[state=open]:bg-sidebar-accent"
              >
                <UserInfo user={auth.user} />
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="end"
              side={
                isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'
              }
            >
              <UserMenuContent user={auth.user} />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenuButton
            size="lg"
            asChild
          >
            <Link
              href={route('login')}
              prefetch
            >
              <LogIn />
              <span>Log In</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
