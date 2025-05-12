
import { useState } from 'react';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }
    
    if (!selectedFile.type.startsWith('image/')) {
      console.error('File is not an image');
      return;
    }

    setFile(selectedFile);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  return {
    file,
    preview,
    handleFileChange,
    clearFile
  };
}
