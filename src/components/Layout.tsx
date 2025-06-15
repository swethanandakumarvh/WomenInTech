import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className={isHomePage ? '' : 'pt-16'}>
        {children}
      </main>
      <Footer />
    </div>
  )
}