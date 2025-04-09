
import { useProducts } from '@/context/ProductContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, ShoppingCart, Users } from 'lucide-react';

const Dashboard = () => {
  const { products } = useProducts();
  
  // Calculate metrics
  const totalProducts = products.length;
  const featuredProducts = products.filter(product => product.featured).length;
  const totalValue = products.reduce((total, product) => total + product.price, 0);
  
  // Generate data for chart
  const categoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find(item => item.category === product.category);
    
    if (existingCategory) {
      existingCategory.count += 1;
      existingCategory.value += product.price;
    } else {
      acc.push({
        category: product.category,
        count: 1,
        value: product.price,
      });
    }
    
    return acc;
  }, [] as { category: string; count: number; value: number }[]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Link to="/admin/products/new">
              <Button>Add New Product</Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="text-gray-500 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalProducts}</div>
                <p className="text-sm text-muted-foreground">
                  {featuredProducts} featured
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="text-gray-500 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">
                  Across all products
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="text-gray-500 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">
                  From 0 customers
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="text-gray-500 h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">
                  0 active now
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Products by Category</CardTitle>
                <CardDescription>
                  Distribution of products across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" name="Number of Products" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Value by Category</CardTitle>
                <CardDescription>
                  Total value of products by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1E40AF" name="Total Value ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>
                Latest products added to your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-4">Product</th>
                      <th className="text-left font-medium p-4">Category</th>
                      <th className="text-left font-medium p-4">Price</th>
                      <th className="text-left font-medium p-4">Status</th>
                      <th className="text-left font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                            <span className="font-medium">{product.title}</span>
                          </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">${product.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {product.featured ? 'Featured' : 'Active'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Link to={`/admin/products/${product.id}`}>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </Link>
                            <Link to={`/products/${product.id}`}>
                              <Button variant="ghost" size="sm">View</Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
