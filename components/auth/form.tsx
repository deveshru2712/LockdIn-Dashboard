"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be less than 50 characters" }),
});

export default function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    type="email"
                    className={
                      form.formState.errors.email
                        ? "border-red-500 focus:border-red-500"
                        : form.formState.dirtyFields.email &&
                            !form.formState.errors.email
                          ? "border-green-500 focus:border-green-500"
                          : ""
                    }
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    className={
                      form.formState.errors.password
                        ? "border-red-500 focus:border-red-500"
                        : form.formState.dirtyFields.password &&
                            !form.formState.errors.password
                          ? "border-green-500 focus:border-green-500"
                          : ""
                    }
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-red-500" />

                {/* Password validation feedback */}
                {!form.formState.errors.password && field.value.length > 0 && (
                  <p className="mt-1 text-xs text-green-600">
                    {field.value.length >= 6
                      ? "✓ Password meets requirements"
                      : `${6 - field.value.length} more characters needed`}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
