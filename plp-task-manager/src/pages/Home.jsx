import Layout from '../components/Layout'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Welcome">
          <p>This is the Task Manager starter app. Use the Tasks page to manage todos and the Posts page to fetch sample API data.</p>
          <div className="mt-3 flex gap-2">
            <Link to="/tasks" className="px-3 py-1 bg-blue-600 text-white rounded">Go to Tasks</Link>
            <Link to="/posts" className="px-3 py-1 border rounded">View Posts</Link>
          </div>
        </Card>

        <Card title="How it works">
          <ol className="list-decimal list-inside space-y-1">
            <li>Add tasks and press Enter or Add</li>
            <li>Toggle complete by clicking the checkbox</li>
            <li>Filter tasks and persist data to localStorage</li>
          </ol>
        </Card>
      </div>
    </Layout>
  )
}
