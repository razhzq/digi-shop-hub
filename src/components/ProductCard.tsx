
import { Product } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-2 right-2 bg-brand-blue text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg truncate">{product.title}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2">
        <span className="font-bold text-brand-darkBlue">${product.price.toFixed(2)}</span>
        <div className="flex space-x-2">
          <Link to={`/products/${product.id}`}>
            <Button variant="outline" size="sm">Details</Button>
          </Link>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
