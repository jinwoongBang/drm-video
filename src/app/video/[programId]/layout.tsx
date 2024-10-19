import ErrorModal from "@/app/video/[programId]/component/ErrorModal";
import AlertModal from "@/app/video/[programId]/component/AlertModal";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <div className="flex-1">{children}</div>
        <aside className="hidden lg:block lg:w-1/2 bg-red-500">
          <h1>PC 회차 영역</h1>
        </aside>
      </div>

      <ErrorModal />
      <AlertModal />
    </>
  );
}

export default Layout;
