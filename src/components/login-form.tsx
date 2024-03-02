"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { useTransition } from "react";
import { login } from "@/actions/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character." }),
});

type TFormSchema = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: TFormSchema) {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data.message);
        }
        return;
      });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
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
        <Button>Submit</Button>
        <div className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/register">Don&apos;t have an account?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
