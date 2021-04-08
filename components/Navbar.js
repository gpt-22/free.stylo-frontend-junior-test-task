import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()

  const links = [
    { url: '/', text: 'Поиск', isActive: true },
    { url: '/favourites', text: 'Избранное', isActive: false },
  ]

  return (
    <nav className="navbar">
      {
        links.map(link => {
          return (
            <Link href={ link.url } key={link.url}>
              <a className={ link.url === router.asPath ? 'active' : ''}>
                { link.text }
              </a>
            </Link>
          )
        })
      }
    </nav>
  )
}

export default Navbar
