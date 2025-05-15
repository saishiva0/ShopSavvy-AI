import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OutfitCardSkeleton() {
  return (
    <Card className="shadow-xl rounded-xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <Skeleton className="aspect-[3/4] w-full rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <Skeleton className="h-6 w-40" />
      </CardFooter>
    </Card>
  );
}
