'use client';

import { useState } from 'react';

interface ProductDetailsProps {
  description: string;
  longDescription?: string;
}

export default function ProductDetails({ description, longDescription }: ProductDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="product__details">
      <h2 className="product__details-title">תיאור המוצר:</h2>
      <div className={`product__details-content ${isExpanded ? 'expanded' : ''}`}>
        <p className="product__details-description">
          {isExpanded ? longDescription : description}
          <span 
            className="product__details-warranty"
            onClick={() => setIsExpanded(!isExpanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsExpanded(!isExpanded);
              }
            }}
          >
            {isExpanded ? 'הצג פחות <' : 'למפרט מורחב >'}
          </span>
        </p>
      </div>
    </div>
  );
} 