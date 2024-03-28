"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { onBoardingSchema } from "@/lib/validation";
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
import { CldUploadWidget } from "next-cloudinary";

const Onboarding = () => {
  const [date, setDate] = React.useState<Date>();
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      name: "",
      image: "",
      portfolio: "",
      learningGoals: [],
      knowledgeLevel: [],
      techStack: "",
      acceptedTerms: false,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    fields: learningGoalsFields,
    append: appendLearningGoals,
    remove: removeLearningGoals,
  } = useFieldArray({
    control: form.control,
    name: "learningGoals",
  });

  const {
    fields: knowledgeLevelFields,
    append: appendKnowledgeLevel,
    remove: removeKnowledgeLevel,
  } = useFieldArray({
    control: form.control,
    name: "knowledgeLevel",
  });

  function onSubmit(values: z.infer<typeof onBoardingSchema>) {
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
                <div key={index + 1}>
                  <div className="flex items-center ">
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
                  </div>
                </div>
              ))}
            </div>
            <h2 className="h2-bold my-6">Basic Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className={`${image && "!p-0"} p-8 bg-black-700 rounded`}>
                <Image
                  src={!image ? "/assets/icons/img-basis.svg" : image}
                  width={!image ? 24 : 100}
                  height={!image ? 24 : 100}
                  alt="img"
                />
              </div>
              <div className="bg-black-700 flex py-2 px-5 gap-3 rounded-md">
                <Image
                  src="/assets/icons/img-cloud.svg"
                  width={20}
                  height={20}
                  alt="cloud"
                />
                <CldUploadWidget
                  signatureEndpoint="/api/sign-cloudinary-params"
                  onSuccess={(result) => {
                    setImage(result.info.secure_url);
                    form.setValue("image", result.info.secure_url);
                  }}
                  uploadPreset="gitnote">
                  {({ open }) => {
                    return (
                      <button
                        className="paragraph-3-medium"
                        onClick={() => open()}>
                        Update Profile Picture
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
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
                  {learningGoalsFields.map((item, index) => (
                    <div key={index + 1}>
                      <ReusableFormField
                        page="Onboarding"
                        name={`learningGoals.${index}.title`}
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
                            onClick={() => removeLearningGoals(index)}>
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
                  onClick={() => appendLearningGoals({ title: "" })}
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
                  {knowledgeLevelFields.map((item, index) => (
                    <div key={index + 1}>
                      <ReusableFormField
                        name={`knowledgeLevel.${index}.title`}
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
                            onClick={() => removeKnowledgeLevel(index)}>
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
                  onClick={() => appendKnowledgeLevel({ title: "" })}
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
                      name="acceptedTerms"
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
                          name="startDate"
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
                          name="endDate"
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
