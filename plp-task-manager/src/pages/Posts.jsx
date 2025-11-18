import { useEffect, useState, useMemo } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { fetchPosts } from '../api/posts'
import debounce from '../utils/debounce'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 9

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchPosts()
      .then(data => {
        if (!cancelled) setPosts(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    return posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
  }, [posts, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  // debounced search handler for UX
  const onSearch = debounce(value => {
    setQuery(value)
    setPage(1)
  }, 200)

  if (loading) {
    return (
      <Layout>
        <p>Loading posts...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-500">Error: {error}</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mb-4 flex gap-2">
        <input
          onChange={e => onSearch(e.target.value)}
          placeholder="Search posts..."
          className="border p-2 rounded flex-grow"
        />
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map(post => (
          <Card key={post.id} title={post.title}>
            <p className="text-sm">{post.body}</p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
