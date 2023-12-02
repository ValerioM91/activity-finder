import NavLinks from "./NavLinks"
import SidebarHeader from "./SidebarHeader"

const Sidebar = () => {
  return (
    <div className="grid min-h-full w-80 grid-rows-[auto,1fr,auto] bg-base-200 px-4 py-12 lg:w-96">
      <SidebarHeader />
      <NavLinks />
    </div>
  )
}

export default Sidebar
