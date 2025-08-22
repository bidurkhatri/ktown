import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MenuImage {
  id: string;
  name: string;
  file_path: string;
  is_active: boolean;
  created_at: string;
}

const MenuImageManager = () => {
  const [menuImages, setMenuImages] = useState<MenuImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchMenuImages();
  }, []);

  const fetchMenuImages = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuImages(data || []);
    } catch (error) {
      console.error('Error fetching menu images:', error);
      toast({
        title: "Error",
        description: "Failed to load menu images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `menu-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save menu image record
      const { error: dbError } = await supabase
        .from('menu_images')
        .insert({
          name: file.name,
          file_path: filePath,
          uploaded_by: user.id,
          is_active: false // New uploads start as inactive
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Menu image uploaded successfully",
      });

      fetchMenuImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload menu image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const toggleActive = async (imageId: string, currentStatus: boolean) => {
    try {
      // If activating this image, deactivate all others first
      if (!currentStatus) {
        await supabase
          .from('menu_images')
          .update({ is_active: false })
          .neq('id', imageId);
      }

      const { error } = await supabase
        .from('menu_images')
        .update({ is_active: !currentStatus })
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Menu image ${!currentStatus ? 'activated' : 'deactivated'}`,
      });

      fetchMenuImages();
    } catch (error) {
      console.error('Error toggling image status:', error);
      toast({
        title: "Error",
        description: "Failed to update image status",
        variant: "destructive",
      });
    }
  };

  const deleteImage = async (imageId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this menu image?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('menu-images')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('menu_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Menu image deleted successfully",
      });

      fetchMenuImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete menu image",
        variant: "destructive",
      });
    }
  };

  const getImageUrl = (filePath: string) => {
    return supabase.storage.from('menu-images').getPublicUrl(filePath).data.publicUrl;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading menu images...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="menu-upload">Upload New Menu Image</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="menu-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="flex-1"
            />
            <Button disabled={uploading} className="btn-korean">
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Only one menu image can be active at a time. Uploaded images start as inactive.
          </p>
        </div>

        {/* Images List */}
        <div className="space-y-4">
          {menuImages.length === 0 ? (
            <p className="text-muted-foreground">No menu images uploaded yet.</p>
          ) : (
            menuImages.map((image) => (
              <div key={image.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{image.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Uploaded: {new Date(image.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Status: <span className={image.is_active ? 'text-green-600' : 'text-gray-500'}>
                        {image.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(image.id, image.is_active)}
                    >
                      {image.is_active ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteImage(image.id, image.file_path)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                {/* Image Preview */}
                <div className="max-w-md">
                  <img
                    src={getImageUrl(image.file_path)}
                    alt={image.name}
                    className="w-full h-auto rounded border"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuImageManager;