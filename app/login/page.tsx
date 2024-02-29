"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
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
import Link from "next/link";
import { findUser } from "@/lib/actions/user.action";
import Image from "next/image";

const LogInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const user = await findUser({ email: values.email });
    if (!user) {
      form.setError("email", { message: "Email does not exist" });
      return;
    } else {
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      router.push("/home");
    }
  }
  return (
    <div className="w-full">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={212}
        height={50}
        className="mt-20 mx-auto"
      />
      <div className="max-w-lg mx-auto mt-52">
        <h1 className="h2-bold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary-500 ">
              Login
            </Button>
            <Link
              href="/signIn"
              className="text-center block paragraph-3-medium hover:underline cursor-pointer">
              I don’t have an account
            </Link>
            <div className="flex items-center justify-between">
              <Separator className="w-2/5 bg-primary-900" />
              <p className="paragraph-4-regular">or</p>
              <Separator className="w-2/5 bg-primary-900" />
            </div>
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="w-full bg-black-700 paragraph-3-medium">
              Continue with Google
            </Button>
            <Button
              onClick={() => signIn("github", { callbackUrl: "/home" })}
              type="button"
              className="w-full bg-black-700 paragraph-3-medium">
              Continue with Github
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogInForm;
