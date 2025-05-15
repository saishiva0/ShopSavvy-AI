import Image from 'next/image';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  categoryHint?: string;
}

export default function ProductCard({ product, categoryHint = "fashion item" }: ProductCardProps) {
  const placeholderImage = `https://placehold.co/300x400.png`;
  const imageSrc = product.imageUrl && product.imageUrl.startsWith('http') ? product.imageUrl : placeholderImage;
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] w-full relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={categoryHint}
            onError={(e) => (e.currentTarget.src = placeholderImage)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg truncate" title={product.name}>{product.name}</h3>
        <p className="text-primary font-bold text-md flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          {product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild variant="outline" className="w-full transition-colors duration-300">
          <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
            Buy Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
