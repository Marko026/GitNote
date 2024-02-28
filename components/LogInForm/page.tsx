"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/validation";
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
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/user.action";

const LogInForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    if (user) {
      router.push("/home");
    }
    return user;
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="h1-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary-500 ">
            Login
          </Button>
          <Link
            href=""
            className="text-center block paragraph-3-medium hover:underline">
            I don't have an account
          </Link>
          <div className="flex items-center justify-between">
            <Separator className="w-2/5 bg-primary-900" />
            <p className="paragraph-4-regular">or</p>
            <Separator className="w-2/5 bg-primary-900" />
          </div>
          <Button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-black-700 paragraph-3-medium">
            Continue with Google
          </Button>
          <Button
            onClick={() => signIn("github")}
            type="button"
            className="w-full bg-black-700 paragraph-3-medium">
            Continue with Github
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
