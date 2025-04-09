
import { useParams, Navigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductForm from '@/components/admin/ProductForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductEdit = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProduct } = useProducts();
  
  // Verify this product exists if editing
  if (productId !== 'new' && !getProduct(productId)) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            {productId === 'new' ? 'Add New Product' : 'Edit Product'}
          </h1>
          
          <ProductForm productId={productId !== 'new' ? productId : undefined} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductEdit;
