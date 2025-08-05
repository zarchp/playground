export function Header({ receiverName }: { receiverName: string }) {
  const initials = receiverName
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <div className="flex items-center space-x-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
        <span className="text-sm font-medium text-white">{initials}</span>
      </div>
      <div>
        <h1 className="text-lg font-semibold">{receiverName}</h1>
        <p className="text-sm text-green-500">● Online</p>
      </div>
    </div>
  );
}
