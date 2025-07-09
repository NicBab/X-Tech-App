import Image from "next/image";
import DLRForm from "./(components)/Forms/DLRForm";
import Login from "./(components)/Forms/Login"
import Register from "./(components)/Forms/Register"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[20px] row-start-2 items-center">
        <Login/>
        <Register/>
        <DLRForm/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
