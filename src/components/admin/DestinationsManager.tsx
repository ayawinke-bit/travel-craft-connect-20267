import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { z } from "zod";

const destinationSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200, "Title too long"),
  country: z.string().trim().min(2, "Country must be at least 2 characters").max(100, "Country too long"),
  region: z.string().trim().max(100, "Region too long").optional(),
  description: z.string().trim().max(5000, "Description too long"),
  status: z.enum(["published", "draft"]),
  image_url: z.string().url().optional().or(z.literal("")),
});

interface DestinationForm {
  title: string;
  country: string;
  region: string;
  description: string;
  status: string;
  image_url: string;
}

const DestinationsManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<DestinationForm>({
    title: "",
    country: "",
    region: "",
    description: "",
    status: "published",
    image_url: "",
  });

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["adminDestinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: DestinationForm) => {
      const { error } = await supabase.from("destinations").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDestinations"] });
      toast.success("Destination created successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create destination: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DestinationForm> }) => {
      const { error } = await supabase
        .from("destinations")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDestinations"] });
      toast.success("Destination updated successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update destination: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("destinations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDestinations"] });
      toast.success("Destination deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete destination: " + error.message);
    },
  });

  const handleImageUpload = async (file: File): Promise<string> => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP allowed.');
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('destination-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('destination-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const validated = destinationSchema.parse(formData);

      let imageUrl = validated.image_url;
      if (imageFile) {
        try {
          imageUrl = await handleImageUpload(imageFile);
        } catch (error: any) {
          toast.error(error.message || "Failed to upload image");
          return;
        }
      }

      const dataToSubmit = { ...validated, image_url: imageUrl } as DestinationForm;

      if (editingDestination) {
        updateMutation.mutate({ id: editingDestination.id, data: dataToSubmit });
      } else {
        createMutation.mutate(dataToSubmit);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
      throw error;
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      country: "",
      region: "",
      description: "",
      status: "published",
      image_url: "",
    });
    setEditingDestination(null);
    setImageFile(null);
  };

  const handleEdit = (dest: any) => {
    setEditingDestination(dest);
    setFormData({
      title: dest.title,
      country: dest.country,
      region: dest.region || "",
      description: dest.description || "",
      status: dest.status,
      image_url: dest.image_url || "",
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>All Destinations</CardTitle>
            <CardDescription>Manage destinations with images</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Destination
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDestination ? "Edit Destination" : "Create New Destination"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Destination Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {formData.image_url && !imageFile && (
                    <p className="text-sm text-muted-foreground mt-1">Current image uploaded</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={uploading || createMutation.isPending || updateMutation.isPending}>
                  {(uploading || createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingDestination ? "Update Destination" : "Create Destination"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {destinations && destinations.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Highlights</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {destinations.map((destination: any) => (
                  <TableRow key={destination.id}>
                    <TableCell className="font-medium">{destination.title}</TableCell>
                    <TableCell>{destination.country}</TableCell>
                    <TableCell>{destination.region || "N/A"}</TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        {destination.highlights && destination.highlights.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {destination.highlights.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{destination.highlights.length - 3}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={destination.status === "published" ? "default" : "secondary"}>
                        {destination.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(destination)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this destination?")) {
                              deleteMutation.mutate(destination.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationsManager;
