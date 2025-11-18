import Layout from '../components/Layout'
import TaskManager from '../components/TaskManager'

export default function Tasks() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskManager />
    </Layout>
  )
}
