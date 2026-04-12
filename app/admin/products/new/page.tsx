// app/admin/products/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Package,
} from 'lucide-react';
import Link from 'next/link';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  compareAtPrice: string;
  category: string;
  subcategory: string;
  tags: string[];
  inStock: boolean;
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
  weight: string;
  dimensions: { length: string; width: string; height: string };
  metaTitle: string;
  metaDescription: string;
}

const categories = [
  'laundry',
  'dry-cleaning',
  'steam-pressing',
  'shoe-cleaning',
  'carpet-cleaning',
  'curtain-cleaning',
  'commercial',
  'apparel',
  'uniform',
  'accessories',
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    category: '',
    subcategory: '',
    tags: [],
    inStock: true,
    isActive: true,
    isFeatured: false,
    images: [],
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    metaTitle: '',
    metaDescription: '',
  });
  const [tagInput, setTagInput] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          uploadedImages.push(data.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setImages([...images, ...uploadedImages]);
    setFormData({ ...formData, images: [...images, ...uploadedImages] });
    setUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormData({ ...formData, images: newImages });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          dimensions: {
            length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : null,
            width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : null,
            height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : null,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        router.push('/admin/products');
      } else {
        alert(data.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create a new product for your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (AED) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Compare at Price (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Product Images</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-400" />
                      <span className="text-xs text-gray-500 mt-2">Upload</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Category</h2>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subcategory (optional)"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full mt-3 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Status</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm">In Stock</span>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Active</span>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Featured</span>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                </label>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Length"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, length: e.target.value }
                    })}
                    className="px-2 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, width: e.target.value }
                    })}
                    className="px-2 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, height: e.target.value }
                    })}
                    className="px-2 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}