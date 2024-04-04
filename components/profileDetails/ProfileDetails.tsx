"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { use, useState } from "react";
import { map, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { IOnBoarding, onBoardingSchema } from "@/lib/validation";
import ReusableFormField from "@/components/shared/ReusableFormFileld";
import { Checkbox } from "@/components/ui/checkbox";
import { selectStyles } from "@/styles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { updateProfile } from "@/lib/actions/user.action";
import { UserProps } from "@/database/user.model";
import { useRouter } from "next/navigation";
const animatedComponents = makeAnimated();

type TechProps = {
  value: string;
  label: string;
};

const ProfileDetails = ({ user }: { user: IOnBoarding }) => {
  const [date, setDate] = React.useState<Date>();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),

    defaultValues: {
      email: user.email ?? undefined,
      name: user.name ?? "",
      portfolio: user.portfolio ?? "",
      image: user.image ?? "",
      learningGoals: user.learningGoals ?? [],
      knowledge: user.knowledge ?? [],
      techStack: user.techStack ?? "",
      startDate: new Date(user.startDate ?? ""),
      endDate: new Date(user.endDate ?? ""),
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
    name: "knowledge",
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const onSubmit = async (data: z.infer<typeof onBoardingSchema>) => {
    await updateProfile(data);
    router.push("/profile");
  };

  return (
    <div className="w-full text-white-100 px-8">
      <h2 className="h2-bold mt-10 mb-5">Edit Profile</h2>
      <p className="text-white-500 uppercase text-[14px] mb-4">
        Basic Information
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`${image && "!p-0"} p-8 bg-black-700 rounded`}>
              <Image
                src={!image ? "/assets/icons/img-basis.svg" : image}
                width={!image ? 24 : 100}
                height={!image ? 24 : 100}
                alt="img"
              />
            </div>
            <div className="bg-black-700 flex gap-2 py-3 px-2 rounded-md">
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
                      type="button"
                      className="paragraph-3-medium "
                      onClick={() => open()}>
                      Update Profile Picture
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>

          <ReusableFormField
            label="Name"
            placeholder="Enter your name"
            name="name"
          />
          <ReusableFormField
            label="Email"
            placeholder="Enter your name"
            name="email"
          />
          <ReusableFormField
            label="Portfolio"
            placeholder="Enter your name"
            name="portfolio"
          />
          <div className="h-[0.5px] bg-black-600/20 !my-10"></div>
          <h3 className="uppercase text-white-500 mb-3">Learning Goals</h3>
          <div className="flex flex-col space-y-2">
            {learningGoalsFields.map((item, index) => (
              <div
                key={index + 1}
                className="flex items-center border border-transparent hover:border-white-500 w-full focus:outline-none bg-black-700 rounded-lg px-3">
                <FormField
                  control={form.control}
                  name={`learningGoals.${index}.isChecked`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          color="primary"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`border-2 border-white-500  data-[state=checked]:border-none `}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <ReusableFormField
                  name={`learningGoals.${index}.title`}
                  placeholder="Enter your lesson"
                  formItemClassName="w-full"
                  formControlClassName="flex items-center justify-center gap-2 w-full"
                  inputClassName="bg-black-700 text-white-100 min-h-12  border-transparent  focus-visible:ring-0  focus-visible:ring-offset-0 w-full"
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

          <h3 className="uppercase text-white-500 mb-3">Knowledge</h3>

          <div className="flex flex-col space-y-2">
            <h4 className="paragraph-3-medium mb-2"></h4>
            {knowledgeLevelFields.map((item, index) => (
              <div key={index + 1}>
                <ReusableFormField
                  name={`knowledge.${index}.title`}
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
          <h4 className="paragraph-3-medium">Tech Stack </h4>
          <FormField
            name="techStack"
            control={form.control}
            render={({ field }) => (
              <>
                <CreatableSelect
                  {...field}
                  styles={selectStyles}
                  defaultInputValue={
                    Array.isArray(field.value) ? field.value[0] : field.value
                  }
                  className="!bg-transparent capitalize"
                  components={animatedComponents}
                  isMulti
                />

                <p className="text-red-500 text-[14px]">
                  {form.formState.errors.techStack?.message ?? ""}
                </p>
              </>
            )}
          />
          <h3 className="uppercase text-white-500 mb-3">
            Schedule & availability
          </h3>
          <div className="mb-10 flex gap-2 flex-col space-y-3">
            <div className="flex items-center gap-3">
              <FormField
                name="availability"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <div className="flex gap-2">
                        <Checkbox
                          color="primary"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`border-2 border-white-500  data-[state=checked]:border-none `}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm  text-white-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Are you available for a new project?
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
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
                        <span>{startDate.toDateString()}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none ">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Calendar
                              className="bg-black-700  text-white-100"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </FormControl>
                        </FormItem>
                      )}
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
                        <span>{endDate.toDateString()}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Calendar
                              className="bg-black-700  text-white-100"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-primary-500 text-black-900 font-bold disabled:opacity-50">
            {loading ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetails;
