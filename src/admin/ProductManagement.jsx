import ProductManager from "./ProductManager"
import AdminLayout from "./AdminLayout"

function ProductManagement() {
  return (
    <AdminLayout title="Products" subtitle="Product Management">
      <ProductManager />
    </AdminLayout>
  )
}

export default ProductManagement
