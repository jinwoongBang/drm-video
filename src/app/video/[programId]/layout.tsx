function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      <aside className="hidden lg:block lg:w-1/2 bg-red-500">
        <h1>PC 회차 영역</h1>
      </aside>
    </div>
  );
}

export default Layout;
