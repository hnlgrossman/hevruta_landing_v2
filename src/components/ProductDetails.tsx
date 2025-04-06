'use client';

import { useState } from 'react';
import { Item } from '@/utils/items';


export default function ProductDetails({ item: {description, modelNumber, detailed_list} }: { item: Item }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="product__details">
      <h2 className="product__details-title">תיאור המוצר:</h2>
      <div className={`product__details-content ${isExpanded ? 'expanded' : ''}`}>
        <p className="product__details-description">
          {modelNumber && <span className="product__details-model">מספר דגם: {modelNumber}</span>}
          {isExpanded ? (
            <>
              {description}
              {detailed_list && detailed_list.length > 0 && (
                <ul className="product__details-list">
                  {detailed_list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            description
          )}
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