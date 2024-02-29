"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/validation";
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
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUser, findUser } from "@/lib/actions/user.action";

const LogInForm = () => {
  const router = useRouter();
  const [logIn, setLogIn] = useState(true);
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ako korsinik ne postoji i pokusava da se uloguje kreisranje acconta route.push.(/signIn)
    // izbaci gresku ako mail postoji i pokusava da se registruje / login page
    if (!logIn) {
      const user = await findUser({ email: values.email });
      if (user) {
        form.setError("email", { message: "Email already exists" });
        setLogIn(true);
        return;
      }
      // if (!values.name) form.setError("name", "Please input a name");
      const newUser = await createUser({
        name: values.name ?? "",
        email: values.email,
        password: values.password,
      });
      setLogIn(true);
    } else {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      console.log("Prijavljen");
    }
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="h1-bold">{logIn ? "Login" : "Create Account"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {!logIn && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            {logIn ? "Login" : "Create Account"}
          </Button>
          <p
            onClick={() => setLogIn(!logIn)}
            className="text-center block paragraph-3-medium hover:underline cursor-pointer">
            {logIn ? "Create an Account" : "I have an account"}
          </p>
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
