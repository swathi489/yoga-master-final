import { Outlet } from "react-router-dom"
import Navbar from "../components/headers/Navbar"
import Footer from "../components/Footer/Footer"

const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
       <Navbar/>
      <Outlet/>
      {/* <Footer/> */}
    </main>
  )
}

export default MainLayout
