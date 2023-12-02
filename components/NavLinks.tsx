import Link from "next/link"

const LINKS = [
  { href: "/", label: "All Activities" },
  { href: "/find-new-activities", label: "Find new activities" },
]

const NavLinks = () => {
  return (
    <ul className="">
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className="btn btn-ghost w-full justify-start rounded text-lg font-medium capitalize">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default NavLinks
