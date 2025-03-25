"use client"

import React, { useState } from 'react';
import * as mammoth from 'mammoth';

function WordImageExtractor() {
  const [extractedImages, setExtractedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setExtractedImages([]);

    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Convert to HTML to extract images
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      // Create a temporary div to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.value;

      // Extract all image sources
      const imgElements = tempDiv.getElementsByTagName('img');
      const imageSources = Array.from(imgElements)
        .map(img => img.src)
        .filter(src => src.startsWith('data:image')); // Only base64 images

      setExtractedImages(imageSources);
      setIsLoading(false);

      if (imageSources.length === 0) {
        alert('No images found in the document');
      }
    } catch (error) {
      console.error('Error extracting images:', error);
      setIsLoading(false);
      alert('Failed to extract images from the Word document');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Document Image Extractor</h2>
      
      <input 
        type="file" 
        accept=".docx,.doc" 
        onChange={handleFileUpload}
        className="mb-4 block w-full text-sm text-gray-500 
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
      />

      {isLoading && (
        <div className="text-center">
          <p>Processing document...</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {extractedImages.map((image, index) => (
          <div key={index} className="border rounded p-2">
            <img 
              src={image} 
              alt={`Extracted image ${index + 1}`} 
              className="max-w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>

      {!isLoading && extractedImages.length === 0 && (
        <p className="text-center text-gray-500">
          No images detected in the document
        </p>
      )}
    </div>
  );
}

export default WordImageExtractor;