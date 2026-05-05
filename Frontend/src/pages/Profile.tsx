import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Book, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
  major: z.string().max(100).optional().or(z.literal('')),
  year: z.string().max(50).optional().or(z.literal('')),
  avatar_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      bio: '',
      major: '',
      year: '',
      avatar_url: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (data && !error) {
        setProfileData(data);
        form.reset({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          major: data.major || '',
          year: data.year || '',
          avatar_url: data.avatar_url || '',
        });
      }
    };
    fetchProfile();
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    const { error } = await updateProfile(data);
    
    if (error) {
      toast.error('Failed to update profile', { description: error.message });
    } else {
      toast.success('Profile updated successfully!');
      setProfileData({ ...profileData, ...data });
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Not Logged In</h2>
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      
      <main className="pt-28 pb-16 section-padding relative z-10 max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Your Profile</h1>
          <p className="text-gray-600 text-lg">Manage your personal information and preferences.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Summary */}
          <div className="space-y-6 md:col-span-1">
            <Card className="glass-card flex flex-col items-center p-6 text-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg mb-4">
                <AvatarImage src={form.watch('avatar_url') || ''} alt={form.watch('first_name')} />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-skillbistro-blue to-skillbistro-purple text-white">
                  {form.watch('first_name')?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold">
                {form.watch('first_name')} {form.watch('last_name')}
              </h3>
              <p className="text-gray-500 font-medium">{form.watch('major') || 'Major not set'}</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-skillbistro-blue bg-skillbistro-blue/10 px-4 py-2 rounded-full w-full">
                <Clock className="h-4 w-4" />
                <span className="font-bold">{profileData?.time_credits || 0} Time Credits</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Edit Form */}
          <div className="md:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Edit Details</CardTitle>
                <CardDescription>Update your public profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="avatar_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Avatar Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/avatar.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2"><Book className="h-4 w-4" /> Major / Degree</FormLabel>
                            <FormControl>
                              <Input placeholder="B.Tech Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Year</FormLabel>
                            <FormControl>
                              <Input placeholder="3rd Year" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell others a bit about yourself..." 
                              className="resize-none" 
                              rows={4} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading} className="bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white">
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
