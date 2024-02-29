"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser, findUser } from "@/lib/actions/user.action";
import { signInSchema } from "@/lib/validation";
import Link from "next/link";

const LogInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const user = await findUser({ email: values.email });
    if (user) {
      form.setError("email", { message: "Email already exists" });
      return;
    }
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    router.push("/home");

    // await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    // });
    // console.log("Prijavljeni ste!");
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="h1-bold">Create Account</h1>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary-500 ">
            Create Account
          </Button>
          <Link
            href="/login"
            className="text-center block paragraph-3-medium hover:underline cursor-pointer">
            Already have an account
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
