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

const packageSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200, "Title too long"),
  description: z.string().trim().max(5000, "Description too long"),
  price_kes: z.number().min(1000, "Price must be at least 1000 KES").max(10000000, "Price too high"),
  duration_days: z.number().int().min(1, "Must be at least 1 day").max(365, "Cannot exceed 365 days"),
  duration_nights: z.number().int().min(0, "Cannot be negative").max(364, "Cannot exceed 364 nights"),
  seats_total: z.number().int().min(1, "Must have at least 1 seat").max(100, "Cannot exceed 100 seats"),
  difficulty: z.enum(["Easy", "Moderate", "Challenging"]),
  status: z.enum(["published", "draft"]),
  image_url: z.string().url().optional().or(z.literal("")),
});

interface PackageForm {
  title: string;
  description: string;
  price_kes: number;
  duration_days: number;
  duration_nights: number;
  seats_total: number;
  difficulty: string;
  status: string;
  image_url: string;
}

const PackagesManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<PackageForm>({
    title: "",
    description: "",
    price_kes: 0,
    duration_days: 1,
    duration_nights: 0,
    seats_total: 12,
    difficulty: "Easy",
    status: "published",
    image_url: "",
  });

  const { data: packages, isLoading } = useQuery({
    queryKey: ["adminPackages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PackageForm) => {
      const { error } = await supabase.from("packages").insert([{
        ...data,
        seats_available: data.seats_total,
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPackages"] });
      toast.success("Package created successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create package: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PackageForm> }) => {
      const { error } = await supabase
        .from("packages")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPackages"] });
      toast.success("Package updated successfully");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update package: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPackages"] });
      toast.success("Package deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete package: " + error.message);
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
        .from('package-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate nights < days
      if (formData.duration_nights >= formData.duration_days) {
        toast.error("Nights must be less than days");
        return;
      }

      // Validate form data
      const validated = packageSchema.parse(formData);

      let imageUrl = validated.image_url;
      if (imageFile) {
        try {
          imageUrl = await handleImageUpload(imageFile);
        } catch (error: any) {
          toast.error(error.message || "Failed to upload image");
          return;
        }
      }

      const dataToSubmit = { ...validated, image_url: imageUrl } as PackageForm;

      if (editingPackage) {
        updateMutation.mutate({ id: editingPackage.id, data: dataToSubmit });
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
      description: "",
      price_kes: 0,
      duration_days: 1,
      duration_nights: 0,
      seats_total: 12,
      difficulty: "Easy",
      status: "published",
      image_url: "",
    });
    setEditingPackage(null);
    setImageFile(null);
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description || "",
      price_kes: pkg.price_kes,
      duration_days: pkg.duration_days,
      duration_nights: pkg.duration_nights,
      seats_total: pkg.seats_total,
      difficulty: pkg.difficulty,
      status: pkg.status,
      image_url: pkg.image_url || "",
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
            <CardTitle>All Packages</CardTitle>
            <CardDescription>Manage safari packages with images and pricing</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPackage ? "Edit Package" : "Create New Package"}</DialogTitle>
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
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (KES)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price_kes}
                      onChange={(e) => setFormData({ ...formData, price_kes: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="seats">Total Seats</Label>
                    <Input
                      id="seats"
                      type="number"
                      value={formData.seats_total}
                      onChange={(e) => setFormData({ ...formData, seats_total: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="days">Duration (Days)</Label>
                    <Input
                      id="days"
                      type="number"
                      value={formData.duration_days}
                      onChange={(e) => setFormData({ ...formData, duration_days: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nights">Duration (Nights)</Label>
                    <Input
                      id="nights"
                      type="number"
                      value={formData.duration_nights}
                      onChange={(e) => setFormData({ ...formData, duration_nights: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>
                <div>
                  <Label htmlFor="image">Package Image</Label>
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
                  {editingPackage ? "Update Package" : "Create Package"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {packages && packages.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price (KES)</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Available Seats</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg: any) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>
                      {pkg.duration_days}D / {pkg.duration_nights}N
                    </TableCell>
                    <TableCell>KES {Number(pkg.price_kes).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{pkg.difficulty}</Badge>
                    </TableCell>
                    <TableCell>
                      {pkg.seats_available} / {pkg.seats_total}
                    </TableCell>
                    <TableCell>⭐ {pkg.rating}</TableCell>
                    <TableCell>
                      <Badge variant={pkg.status === "published" ? "default" : "secondary"}>
                        {pkg.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this package?")) {
                              deleteMutation.mutate(pkg.id);
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
            <p className="text-muted-foreground">No packages found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PackagesManager;
