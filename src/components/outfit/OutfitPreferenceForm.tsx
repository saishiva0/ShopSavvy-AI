"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import type { OutfitPreferences } from "@/types";
import { OccasionOptions, StyleOptions, BudgetOptions, WeatherOptions, GenderOptions } from "@/types";

const formSchema = z.object({
  occasion: z.string().min(1, "Occasion is required"),
  style: z.string().min(1, "Style is required"),
  budget: z.enum(["low", "medium", "high"]),
  colors: z.string().min(3, "Preferred colors are required (e.g., blue, white)"),
  weather: z.string().min(1, "Weather condition is required"),
  gender: z.enum(["male", "female", "unisex"]),
});

type OutfitPreferenceFormProps = {
  onSubmit: (data: OutfitPreferences) => void;
  isLoading: boolean;
};

export default function OutfitPreferenceForm({ onSubmit, isLoading }: OutfitPreferenceFormProps) {
  const form = useForm<OutfitPreferences>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasion: "",
      style: "",
      budget: "medium",
      colors: "",
      weather: "",
      gender: "unisex",
    },
  });

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-primary" />
          Find Your Vibe
        </CardTitle>
        <CardDescription>Tell us your preferences, and we'll craft the perfect look.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occasion</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select an occasion" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {OccasionOptions.map(option => <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a style" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {StyleOptions.map(option => <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Colors</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., pastel pink, navy blue, beige" {...field} />
                  </FormControl>
                  <FormDescription>Separate colors with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="weather"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select weather conditions" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WeatherOptions.map(option => <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                      >
                        {BudgetOptions.map(option => (
                           <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                           <FormControl>
                             <RadioGroupItem value={option} />
                           </FormControl>
                           <FormLabel className="font-normal">{option.charAt(0).toUpperCase() + option.slice(1)}</FormLabel>
                         </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                    >
                       {GenderOptions.map(option => (
                           <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                           <FormControl>
                             <RadioGroupItem value={option} />
                           </FormControl>
                           <FormLabel className="font-normal">{option.charAt(0).toUpperCase() + option.slice(1)}</FormLabel>
                         </FormItem>
                        ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto text-lg py-6 px-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Outfit
                  <Wand2 className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
