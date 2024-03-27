"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReusableFormField from "@/components/shared/ReusableFormFileld";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CldUploadButton } from "next-cloudinary";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  portfolio: z.string().min(2).max(50),
});

const Onboarding = () => {
  const [date, setDate] = React.useState<Date>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      portfolio: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col pt-20">
        <Image
          src="/assets/icons/logo.svg"
          width={220}
          height={50}
          alt="logo"
          className="mx-auto mb-32"
        />
        <div className="flex justify-center items-center">
          <div className="bg-black-800 w-[600px]  p-8 rounded-md ">
            <div className="flex items-center justify-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <>
                  <div className="p-1 bg-black-600 inline-block rounded-xl">
                    <Image
                      src="/assets/icons/content.svg"
                      width={50}
                      height={50}
                      alt="content"
                    />
                  </div>
                  {index !== 3 && (
                    <span className="h-[2px] rounded-sm inline-block bg-primary-500 w-28"></span>
                  )}
                </>
              ))}
            </div>
            <h2 className="h2-bold my-6">Basic Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-8 bg-black-700 rounded">
                <Image
                  src="/assets/icons/img-basis.svg"
                  width={24}
                  height={24}
                  alt="img"
                />
              </div>
              <CldUploadButton
                className=" flex gap-2 items-center p-4 rounded-md h-10 !bg-black-600  duration-200 paragraph-3-medium hover:text-white-100 "
                // onUpload={(error, result, widget) => {
                //   setResource(result?.info); // Updating local state with asset details
                //   widget.close(); // Close widget immediately after successful upload
                // }}
                signatureEndpoint="/api/sign-cloudinary-params"
                uploadPreset="next-cloudinary-signed">
                <Image
                  src="/assets/icons/img-cloud.svg"
                  width={20}
                  height={20}
                  alt="cloud"
                />
                Upload to Cloudinary
              </CldUploadButton>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                <ReusableFormField name="name" label="Name" />
                <ReusableFormField name="portfolio" label="Portfolio" />

                <h2 className="h2-bold my-6">Add your learning goals</h2>

                <div className="flex flex-col space-y-2">
                  <h4 className="paragraph-3-medium mb-2"></h4>
                  {[1, 2].map((item, index) => (
                    <div key={item.id}>
                      <ReusableFormField
                        page="Onboarding"
                        name={`lessons.${index}.title`}
                        checkbox={
                          <Checkbox
                            color="primary"
                            className={`border-2 border-white-500  data-[state=checked]:border-none `}
                            id="terms"
                          />
                        }
                        placeholder="Enter your lesson"
                        formControlClassName="flex items-center border border-transparent hover:border-white-500 w-full focus:outline-none bg-black-700 rounded-lg px-3"
                        inputClassName="bg-black-700 text-white-100 min-h-12  border-transparent  focus-visible:ring-0  focus-visible:ring-offset-0"
                        rightIcon={
                          <Button
                            type="button"
                            className="bg-transparent hover:bg-black-900"
                            // onClick={() => removeLessons(index)}
                          >
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close"
                              width={10}
                              height={10}
                              className="object-cover"
                            />
                          </Button>
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  // onClick={() => appendLesson({ title: "" })}
                  className="flex w-full items-center gap-2 bg-black-600">
                  <Image
                    src="/assets/icons/blue-plus.svg"
                    alt="pluse"
                    width={13}
                    height={13}
                  />
                  <p className="paragraph-4-medium">Add checkmark</p>
                </Button>

                <h2 className="h2-bold my-6">Add your knowledge level</h2>

                <div className="flex flex-col space-y-2">
                  <h4 className="paragraph-3-medium mb-2"></h4>
                  {[1, 2].map((item, index) => (
                    <div key={item.id}>
                      <ReusableFormField
                        name={`lessons.${index}.title`}
                        leftIcon={
                          <Image
                            src="/assets/icons/check-mark.svg"
                            alt="checkmark"
                            width={16}
                            height={16}
                          />
                        }
                        placeholder="Enter your lesson"
                        formControlClassName="flex items-center border border-transparent hover:border-white-500 w-full focus:outline-none bg-black-700 rounded-lg px-3"
                        inputClassName="bg-black-700 text-white-100 min-h-12  border-transparent  focus-visible:ring-0  focus-visible:ring-offset-0"
                        rightIcon={
                          <Button
                            type="button"
                            className="bg-transparent hover:bg-black-900"
                            // onClick={() => removeLessons(index)}
                          >
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close"
                              width={10}
                              height={10}
                              className="object-cover"
                            />
                          </Button>
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  // onClick={() => appendLesson({ title: "" })}
                  className="flex w-full items-center gap-2 bg-black-600">
                  <Image
                    src="/assets/icons/blue-plus.svg"
                    alt="pluse"
                    width={13}
                    height={13}
                  />
                  <p className="paragraph-4-medium">Add checkmark</p>
                </Button>

                <ReusableFormField name="techStack" label="Tech Stack" />

                <h2 className="h2-bold ">Schedule & availability</h2>
                <div className="mb-10 flex gap-2 flex-col space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      className={`border-2 border-white-500  data-[state=checked]:border-none `}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm  text-white-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Accept terms and conditions
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <div className="!w-[45%]">
                      <p className="mb-2">Start Date & Time</p>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="bg-black-700 hover:bg-black-600 border-transparent !text-white-300 hover:border-white-500  hover:text-white-100">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Select date & time</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none ">
                          <Calendar
                            className="bg-black-700  text-white-100"
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="!w-[45%]">
                      <p className="mb-2">End Date & Time</p>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="bg-black-700 hover:bg-black-600 border-transparent !text-white-300 hover:border-white-500  hover:text-white-100 ">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Select date & time</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none">
                          <Calendar
                            className="bg-black-700  text-white-100"
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary-500 duration-200 text-black-900 font-extrabold uppercase hover:text-white-100 hover:bg-black-600">
                  Next
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
