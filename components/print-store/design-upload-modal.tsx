'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle, FileImage } from 'lucide-react';

interface DesignUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function DesignUploadModal({
  isOpen,
  onClose,
  productName,
}: DesignUploadModalProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setUploadedFile(file);
      simulateUpload();
    } else {
      alert('Please upload an image file (PNG, JPG, etc.)');
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 mx-4"
          >
            <div className="glassmorphism rounded-3xl p-8 border border-white/20 relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-foreground" />
              </motion.button>

              {!uploadSuccess ? (
                <>
                  {/* Header */}
                  <h2 className="text-2xl font-bold text-foreground mb-2">Upload Your Design</h2>
                  <p className="text-foreground/60 mb-6">for {productName}</p>

                  {/* Upload Area */}
                  {!uploadedFile ? (
                    <motion.div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      whileHover={{ scale: 1.02 }}
                      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                        isDragActive
                          ? 'border-primary bg-primary/10'
                          : 'border-primary/30 hover:border-primary/50'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <motion.div
                        animate={{ y: isDragActive ? -5 : 0 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <motion.div
                          animate={{ rotate: isDragActive ? 12 : 0 }}
                          className="p-4 rounded-full bg-primary/10"
                        >
                          <Upload size={32} className="text-primary" />
                        </motion.div>

                        <div>
                          <p className="text-lg font-semibold text-foreground mb-1">
                            Drag and drop your design
                          </p>
                          <p className="text-sm text-foreground/60">
                            or click to browse (PNG, JPG, up to 10MB)
                          </p>
                        </div>
                      </motion.div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileSelect(e.target.files[0]);
                          }
                        }}
                      />
                    </motion.div>
                  ) : !isUploading ? (
                    <>
                      {/* File Preview */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3"
                      >
                        <FileImage size={24} className="text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </motion.div>

                      {/* Info */}
                      <div className="mb-6 space-y-2 text-sm text-foreground/70">
                        <p>✓ File uploaded successfully</p>
                        <p>✓ Ready for custom printing</p>
                        <p>✓ Preview available in cart</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="flex-1"
                        >
                          Change File
                        </Button>
                        <Button
                          onClick={handleClose}
                          className="flex-1"
                        >
                          Confirm
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Uploading State */}
                      <motion.div className="py-8 flex flex-col items-center gap-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="p-4 rounded-full bg-primary/10"
                        >
                          <Upload size={32} className="text-primary" />
                        </motion.div>
                        <p className="font-semibold text-foreground">Uploading design...</p>
                        <motion.div
                          className="w-full h-1 bg-primary/20 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                          />
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Success State */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center mb-6"
                    >
                      <CheckCircle size={64} className="text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Design Uploaded!
                    </h3>
                    <p className="text-foreground/60 mb-6">
                      Your design is ready for {productName}
                    </p>

                    <div className="space-y-3 mb-8 text-left">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                        <span className="text-primary font-bold">✓</span>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            Design validated
                          </p>
                          <p className="text-xs text-foreground/60">
                            Resolution and format suitable for printing
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                        <span className="text-primary font-bold">✓</span>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            Saved to your designs
                          </p>
                          <p className="text-xs text-foreground/60">
                            You can reuse this design for other products
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleClose}
                        className="w-full rounded-full font-semibold"
                      >
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
