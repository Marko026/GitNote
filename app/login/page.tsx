"use client";
import Link from "next/link";
import Image from "next/image";

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
import { findUser } from "@/lib/actions/user.action";

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
    form.reset({ email: "", password: "" });
  }
  return (
    <div className="w-full px-5">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={212}
        height={50}
        className="mx-auto mb-16 mt-14 max-md:w-[156px]"
      />
      <div className="mx-auto max-w-lg ">
        <h1 className="h2-bold mb-5">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="h-11 rounded border-none bg-black-700 text-white-300"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="h-11 rounded border-none bg-black-700 text-white-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary-500 text-[14px] font-bold text-black-900 hover:text-white-100 ">
              Login
            </Button>
            <Link
              href="/register"
              className="paragraph-3-medium block cursor-pointer text-center hover:underline">
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
              className="paragraph-3-medium flex w-full items-center gap-2  bg-black-700">
              <Image
                src={"/assets/icons/google.svg"}
                alt="google"
                width={16}
                height={16}
              />
              <p>Continue with Google</p>
            </Button>

            <Button
              onClick={() => signIn("github", { callbackUrl: "/home" })}
              type="button"
              className="paragraph-3-medium item flex w-full gap-2 bg-black-700">
              <Image
                src={"/assets/icons/github.svg"}
                alt="github"
                width={16}
                height={16}
              />
              <p>Continue with Github</p>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogInForm;
