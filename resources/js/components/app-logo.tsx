import AppLogoIcon from './app-logo-icon';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel React Starter Kit';

export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square items-center justify-center rounded-md text-sidebar-primary-foreground">
        <AppLogoIcon className="size-8 fill-current text-black dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="truncate leading-tight font-semibold">{appName}</span>
      </div>
    </>
  );
}
