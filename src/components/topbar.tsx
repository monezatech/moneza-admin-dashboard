// components/topbar.tsx
export default function Topbar() {
  return (
    <header className="fixed top-0 left-[200px] right-0 h-[60px] bg-white shadow flex items-center justify-end px-6 z-40">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-semibold">John Doe</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
        <img
          src="/avatar.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </div>
    </header>
  );
}
