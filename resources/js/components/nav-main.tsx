import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const isActive = (href: string) => {
    const pagePath = window.location.pathname;
    const menuPath = new URL(href).pathname;

    if (pagePath === '/') {
      return menuPath === '/';
    }

    return pagePath.startsWith(menuPath) && menuPath !== '/';
  };

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link
                href={item.href}
                prefetch
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
