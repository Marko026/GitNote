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
import { components, ControlProps, Props, StylesConfig } from "react-select";
import {
  IEditProfile,
  IOnBoarding,
  editProfileSchema,
  onBoardingSchema,
} from "@/lib/validation";
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
import { TechImage } from "@/constants";
const animatedComponents = makeAnimated();

const ProfileDetails = ({ user }: { user: UserProps }) => {
  const [date, setDate] = React.useState<Date>();
  const [image, setImage] = useState(user.image ?? "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<IEditProfile>({
    resolver: zodResolver(editProfileSchema),

    defaultValues: {
      email: user.email ?? "",
      name: user.name ?? "",
      portfolio: user.portfolio ?? "",
      image: user.image ?? "",
      learningGoals: user.learningGoals ?? [],
      knowledge: user.knowledge ?? [],
      techStack:
        user.techStack?.map((stack) => ({ label: stack, value: stack })) ?? [],
      startDate: new Date(user.startDate ?? ""),
      endDate: new Date(user.endDate ?? ""),
      availability: user.availability ?? false,
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

  const onSubmit = async (data: IEditProfile) => {
    setLoading(true);
    await updateProfile(data);
    setLoading(false);
    router.push("/profile");
  };

  return (
    <div className="w-full px-8 text-white-100">
      <h2 className="h2-bold mb-5 mt-10">Edit Profile</h2>
      <p className="mb-4 text-[14px] uppercase text-white-500">
        Basic Information
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6">
          <div className="mb-6 flex items-center gap-4">
            <div className={`${image && "!p-0"}  rounded`}>
              <Image
                src={!image ? "/assets/icons/img-basis.svg" : image}
                width={!image ? 24 : 100}
                height={!image ? 24 : 100}
                alt="img"
                className="!h-24 !w-20  object-contain"
              />
            </div>
            <div className="flex gap-2 rounded-md bg-black-700 px-2 py-3">
              <Image
                src="/assets/icons/img-cloud.svg"
                width={20}
                height={20}
                alt="cloud"
              />
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(result) => {
                  if (typeof result.info !== "string") {
                    setImage(result.info?.secure_url ?? "");
                    form.setValue("image", result.info?.secure_url ?? "");
                  }
                }}
                uploadPreset="gitnote">
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      className=" md:!paragraph-3-medium whitespace-nowrap !text-[10px] text-white-300 md:!text-[14px] "
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
          <div className="!my-10 h-[0.5px] bg-black-600/20"></div>
          <h3 className="mb-3 uppercase text-white-500">Learning Goals</h3>
          <div className="flex flex-col space-y-2">
            {learningGoalsFields.map((item, index) => (
              <div
                key={index + 1}
                className="flex w-full items-center rounded-lg border border-transparent bg-black-700 px-3 hover:border-white-500 focus:outline-none">
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

          <h3 className="mb-3 uppercase text-white-500">Knowledge</h3>

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
                  className="!bg-transparent capitalize"
                  options={user.techStack?.map((stack) => ({
                    label: stack,
                    value: stack,
                  }))}
                  components={animatedComponents}
                  formatOptionLabel={({ label, value }) => (
                    <div className="flex items-center gap-2">
                      <Image
                        // @ts-ignore
                        src={
                          TechImage.some((tech) => tech.name.includes(label))
                            ? TechImage.find((tech) =>
                                tech.name.includes(label)
                              )?.image
                            : "/assets/icons/workflow.svg"
                        }
                        width={16}
                        height={16}
                        alt="tech-stack"
                      />

                      {label}
                    </div>
                  )}
                  isMulti
                />
                <p className="text-[14px] text-red-500">
                  {form.formState.errors.techStack?.message ?? ""}
                </p>
              </>
            )}
          />
          <h3 className="mb-3 uppercase text-white-500">
            Schedule & availability
          </h3>
          <div className="mb-10 flex flex-col gap-2 space-y-3">
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
                          className="text-sm  font-medium leading-none text-white-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Are you available for a new project?
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div className="w-full md:!w-[45%] ">
                <p className="mb-2">Start Date & Time</p>
                <Popover>
                  <PopoverTrigger
                    name="startDate"
                    asChild
                    className="border-transparent bg-black-700 !text-white-300 hover:border-white-500 hover:bg-black-600  hover:text-white-100">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 size-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{startDate.toDateString()}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-none p-0 ">
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
              <div className="w-full md:!w-[45%]">
                <p className="mb-2">End Date & Time</p>
                <Popover>
                  <PopoverTrigger
                    name="endDate"
                    asChild
                    className="border-transparent bg-black-700 !text-white-300 hover:border-white-500 hover:bg-black-600  hover:text-white-100 ">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 size-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{endDate.toDateString()}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-none p-0">
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
            className="bg-primary-500 font-bold text-black-900 disabled:opacity-50">
            {loading ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetails;
