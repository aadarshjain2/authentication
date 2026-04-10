import Link from "next/link";
import { cookies } from "next/headers";

import LogoutButton from "../common/Logout"
const MainHeader = async () => {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token");



  const loggedIn = !!token;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      <div className="text-xl font-bold">
        MyWebsite
      </div>

      <div className="space-x-4 flex items-center">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>

        {!loggedIn ? (
          <>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className=" flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Dashboard
            </Link>
      
        
            <LogoutButton/>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;