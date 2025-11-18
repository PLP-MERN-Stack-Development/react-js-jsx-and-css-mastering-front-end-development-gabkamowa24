import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto w-full p-4">{children}</main>
      <Footer />
    </div>
  )
}
