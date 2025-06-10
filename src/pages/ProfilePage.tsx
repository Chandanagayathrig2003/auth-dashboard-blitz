
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, Mail, Lock, Phone, Save, Edit3, Sparkles, Eye, EyeOff } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await updateProfile(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Profile updated successfully!",
          description: "Your changes have been saved.",
        });
        setIsEditing(false);
        setFormData({ ...formData, password: '' });
      } else {
        toast({
          title: "Update failed",
          description: "Unable to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-2xl mb-6 animate-bounce-in">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-secondary/20 rounded-xl border border-secondary/30">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                    <p className="text-lg font-semibold">{user?.username}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/20 rounded-xl border border-secondary/30">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-lg font-semibold">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/20 rounded-xl border border-secondary/30">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-lg font-semibold">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Profile */}
        <Card className="hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Update Profile</CardTitle>
                  <CardDescription>Change your email and password</CardDescription>
                </div>
              </div>
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-2 focus:border-primary transition-all duration-300 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-all duration-300 rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      }
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 h-12 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ email: user?.email || '', password: '' });
                    }}
                    className="px-6 h-12 rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <p className="text-muted-foreground text-lg">
                  Click "Edit" to update your profile information
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
