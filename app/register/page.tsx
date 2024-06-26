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
import Image from "next/image";

const RegisterForm = () => {
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
      ownerId: "",
      onboardingCompleted: false,
    });

    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    router.push("/onboarding");

    form.reset({ name: "", email: "", password: "" });
  }
  return (
    <div className="w-full">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={212}
        height={50}
        className="mx-auto mb-16 mt-14 max-md:w-[156px]"
      />
      <div className="mx-auto max-w-lg px-5">
        <h1 className="h2-bold mb-5">Create Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
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
              className="w-full bg-primary-500 text-[14px]  font-bold text-black-900 hover:text-white-100 ">
              Create Account
            </Button>
            <Link
              href="/login"
              className="paragraph-3-medium block cursor-pointer text-center hover:underline">
              Already have an account
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

export default RegisterForm;
