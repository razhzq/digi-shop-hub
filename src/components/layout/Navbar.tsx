
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-brand-darkBlue">
          DigiShopHub
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAdminPage ? (
            // Admin navigation
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  <Link to="/admin/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link to="/admin/products">
                    <Button variant="ghost">Products</Button>
                  </Link>
                  <Button variant="outline" onClick={logout}>Logout</Button>
                </>
              )}
            </div>
          ) : (
            // Customer navigation
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart size={20} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
