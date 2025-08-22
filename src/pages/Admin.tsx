import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuManager from '@/components/Admin/MenuManager';
import CategoryManager from '@/components/Admin/CategoryManager';
import UserManager from '@/components/Admin/UserManager';
import MenuImageManager from '@/components/Admin/MenuImageManager';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-korean-red mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-korean-red to-korean-yellow text-white">
          <div className="container mx-auto px-4">
            <h1 className="korean-title text-5xl md:text-7xl mb-4 text-center">
              Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl mx-auto">
              Manage your K-Town menu and content
            </p>
          </div>
        </section>

        {/* Admin Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="menu">Menu Items</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="menu-image">Menu Image</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="menu">
                <MenuManager />
              </TabsContent>
              
              <TabsContent value="categories">
                <CategoryManager />
              </TabsContent>
              
              <TabsContent value="menu-image">
                <MenuImageManager />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManager />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Admin;