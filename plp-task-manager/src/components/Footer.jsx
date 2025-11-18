export default function Footer() {
  return (
    <footer className="mt-8 bg-white dark:bg-gray-800 border-t">
      <div className="max-w-6xl mx-auto p-4 text-center text-sm">
        © {new Date().getFullYear()} Task Manager — All rights reserved
      </div>
    </footer>
  )
}
