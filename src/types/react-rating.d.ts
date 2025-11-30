declare module 'react-rating' {
  import * as React from 'react';

  export interface RatingProps {
    readonly?: boolean;
    initialRating?: number;
    fractions?: number;
    onChange?: (rate: number) => void;
    emptySymbol?: React.ReactNode | string;
    fullSymbol?: React.ReactNode | string;
    placeholderSymbol?: React.ReactNode | string;
    placeholderRating?: number;
    stop?: number;
    start?: number;
    step?: number;
  }

  const Rating: React.FC<RatingProps>;
  export default Rating;
}