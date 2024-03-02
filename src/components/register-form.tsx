"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { register } from "@/actions/auth";
import { toast } from "sonner";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name must be at least 1 character." })
      .max(20, { message: "First name must be at less than 20 characters." }),
    lastName: z
      .string()
      .min(1, { message: "Last name must be at least 1 character." })
      .max(20, { message: "Last name must be at less than 20 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and confirm password must match.",
    path: ["confirmPassword"],
  });

type TFormSchema = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleRegister(values: TFormSchema) {
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          toast.error(data.message);
        }
        return;
      });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleRegister)}>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>Submit</Button>
        <div className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/login">Already have an account?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
