
import { useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFormProps {
  productId?: string;
}

const categories = [
  "Design",
  "Marketing",
  "Productivity",
  "Education",
  "Finance",
  "Software",
  "Other"
];

const initialState = {
  title: '',
  description: '',
  price: 0,
  image: '/placeholder.svg',
  category: 'Other',
  featured: false,
  downloadLink: '',
};

const ProductForm: React.FC<ProductFormProps> = ({ productId }) => {
  const { addProduct, updateProduct, getProduct } = useProducts();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialState);
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  useEffect(() => {
    if (isEditing && productId) {
      const product = getProduct(productId);
      if (product) {
        setFormData(product);
      }
    }
  }, [isEditing, productId, getProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && productId) {
      updateProduct(productId, formData);
    } else {
      addProduct(formData);
    }
    
    navigate('/admin/products');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadLink">Download Link</Label>
            <Input
              id="downloadLink"
              name="downloadLink"
              value={formData.downloadLink || ''}
              onChange={handleChange}
              placeholder="https://example.com/download/file"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleFeaturedChange}
            />
            <Label htmlFor="featured" className="cursor-pointer">Featured product</Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;
