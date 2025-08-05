import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Moon, Sun } from 'lucide-react';

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            appearance === 'light'
              ? updateAppearance('dark')
              : updateAppearance('light')
          }
        >
          {appearance === 'light' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
}
