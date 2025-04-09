
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProduct } = useProducts();
  const navigate = useNavigate();
  
  const product = productId ? getProduct(productId) : undefined;
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    // In a real application, this would navigate to checkout
    toast.success('Product added to cart');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/products" className="inline-flex items-center text-brand-blue hover:text-brand-darkBlue mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="p-6 flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-block bg-brand-blue text-white text-sm font-medium px-3 py-1 rounded-full ml-2 mb-3">
                    Featured
                  </span>
                )}
                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                <p className="text-2xl font-bold text-brand-darkBlue mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="border-t border-b py-4 my-4">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
              
              <div className="mt-auto space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => toast.success('Product added to cart')}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
