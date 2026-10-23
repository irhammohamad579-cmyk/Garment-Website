import CelebrationManager from "./CelebrationManager"
import AdminLayout from "./AdminLayout"

function CelebrationManagement() {
  return (
    <AdminLayout title="Celebrations" subtitle="Gallery Management">
      <CelebrationManager />
    </AdminLayout>
  )
}

export default CelebrationManagement
