'use client';
import ReusableFormField from '@/components/shared/ReusableFormFileld';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { onBoardingSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { compleatUserOnboarding } from '@/lib/actions/user.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const [date, setDate] = React.useState<Date>();
  const [image, setImage] = useState('');
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState('/assets/icons/tick-1.svg');

  const router = useRouter();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      email: session?.user?.email ?? undefined,
      name: '',
      image: image,
      portfolio: '',
      learningGoals: [
        {
          title: '',
          isChecked: false,
        },
      ],
      knowledge: [
        {
          title: '',
        },
      ],
      techStack: '',
      availability: false,
      startDate: new Date(),
      endDate: new Date(),
      onBoardingCompleted: false,
    },
  });

  const {
    fields: learningGoalsFields,
    append: appendLearningGoals,
    remove: removeLearningGoals,
  } = useFieldArray({
    control: form.control,
    name: 'learningGoals',
  });

  const {
    fields: knowledgeLevelFields,
    append: appendKnowledgeLevel,
    remove: removeKnowledgeLevel,
  } = useFieldArray({
    control: form.control,
    name: 'knowledge',
  });

  async function onSubmit(values: z.infer<typeof onBoardingSchema>) {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      await compleatUserOnboarding(values);
      router.push('/home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const goToNext = async () => {
    if (step === 0) {
      const success = await form.trigger(['name', 'portfolio']);

      if (success) {
        setProgress([100, 0, 0, 0]);
        setCurrentImage(image);
        setStep(1);
      }
    }
    if (step === 1) {
      const success = await form.trigger('learningGoals');

      if (success) {
        setProgress([100, 100, 0, 0]);
        setCurrentImage(image);
        setStep(2);
      }
    }
    if (step === 2) {
      const success = await form.trigger(['knowledge', 'techStack']);
      setProgress([100, 100, 100]);

      if (success) {
        setCurrentImage(image);
        setStep(3);
      }
    }
    if (step === 3) {
      const success = await form.trigger([
        'availability',
        'startDate',
        'endDate',
      ]);
      if (success) form.handleSubmit(onSubmit)();
    }
  };

  const getImageSrc = (index: number, step: number, currentImage: string) => {
    if (index === 4) return currentImage;
    if (index < step) return '/assets/icons/tick-1.svg';
    if (index !== step) return '/assets/icons/step-base-icon.svg';
    if (index === step) return '/assets/icons/content-1.svg';
  };

  const startDate = form.watch('startDate');
  const endDate = form.watch('endDate');

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col pt-20">
        <Image
          src="/assets/icons/logo.svg"
          width={220}
          height={50}
          alt="logo"
          className="mx-auto mb-16 w-44 md:mb-32 md:w-52"
        />
        <div className="flex items-center justify-center">
          <div className="bg-black-800 max-w-[600px]  rounded-md p-8 ">
            <div className="mb-6 flex items-center justify-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index + 1}>
                  <div className="flex items-center ">
                    <div
                      className={`bg-black-600 rounded-xl p-1 ${
                        step >= index + 1 ? 'bg-primary-500 w-12 p-2 ' : ''
                      } `}>
                      <Image
                        src={getImageSrc(index, step, currentImage) || ''}
                        width={44}
                        height={44}
                        alt="content"
                      />
                    </div>
                    {index <= 2 && (
                      <div className="bg-black-600 relative h-[2px] w-10 rounded-sm md:w-28 ">
                        <div
                          style={{ width: `${progress[index]}%` }}
                          className="bg-primary-500 h-full transition-all duration-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                {step === 0 && (
                  <>
                    <h2 className="h2-bold my-6">Basic Information</h2>
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`${
                          image && '!p-0'
                        } bg-black-700 rounded p-8`}>
                        <Image
                          src={!image ? '/assets/icons/img-basis.svg' : image}
                          width={!image ? 24 : 100}
                          height={!image ? 24 : 100}
                          alt="img"
                        />
                      </div>
                      <div className="bg-black-700 flex gap-2 rounded-md px-2 py-3">
                        <Image
                          src="/assets/icons/img-cloud.svg"
                          width={20}
                          height={20}
                          alt="cloud"
                        />
                        <CldUploadWidget
                          signatureEndpoint="/api/sign-cloudinary-params"
                          onSuccess={(result) => {
                            if (typeof result.info !== 'string') {
                              setImage(result.info?.secure_url ?? '');
                              form.setValue(
                                'image',
                                result.info?.secure_url ?? ''
                              );
                            }
                          }}
                          uploadPreset="gitnote">
                          {(props) => {
                            const { open } = props || {};
                            return (
                              <button
                                type="button"
                                className="paragraph-3-medium "
                                onClick={() => open && open()}>
                                Update Profile Picture
                              </button>
                            );
                          }}
                        </CldUploadWidget>
                      </div>
                    </div>
                    <ReusableFormField name="name" label="Name" />
                    <ReusableFormField name="portfolio" label="Portfolio" />
                    <Button
                      onClick={goToNext}
                      type="button"
                      className="bg-primary-500 text-black-900 hover:bg-black-600 hover:text-white-100 w-full rounded py-2 font-extrabold capitalize duration-200">
                      Next
                    </Button>
                  </>
                )}
                {step === 1 && (
                  <>
                    <h2 className="h2-bold my-6">Add your learning goals</h2>

                    <div className="flex flex-col space-y-2">
                      {learningGoalsFields.map((item, index) => (
                        <div
                          key={index + 1}
                          className="bg-black-700 hover:border-white-500 flex w-full items-center rounded-lg border border-transparent px-3 focus:outline-none">
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
                                    className={`border-white-500 border-2  data-[state=checked]:border-none `}
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
                                className="hover:bg-black-900 bg-transparent"
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
                      onClick={() => appendLearningGoals({ title: '' })}
                      className="bg-black-600 flex w-full items-center gap-2">
                      <Image
                        src="/assets/icons/blue-plus.svg"
                        alt="pluse"
                        width={13}
                        height={13}
                      />
                      <p className="paragraph-4-medium">Add checkmark</p>
                    </Button>
                    <Button
                      onClick={goToNext}
                      type="button"
                      className="bg-primary-500 text-black-900 hover:bg-black-600 hover:text-white-100 w-full rounded py-2 font-extrabold capitalize duration-200">
                      Next
                    </Button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="h2-bold my-6">Add your knowledge level</h2>

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
                                className="hover:bg-black-900 bg-transparent"
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
                      onClick={() => appendKnowledgeLevel({ title: '' })}
                      className="bg-black-600 flex w-full items-center gap-2">
                      <Image
                        src="/assets/icons/blue-plus.svg"
                        alt="pluse"
                        width={13}
                        height={13}
                      />
                      <p className="paragraph-4-medium">Add checkmark</p>
                    </Button>
                    <ReusableFormField name="techStack" label="Tech Stack" />
                    <Button
                      onClick={goToNext}
                      type="button"
                      className="bg-primary-500 text-black-900 hover:bg-black-600 hover:text-white-100 w-full rounded py-2 font-extrabold capitalize duration-200">
                      Next
                    </Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="h2-bold ">Schedule & availability</h2>
                    <div className="mb-10 flex flex-col gap-2 space-y-3">
                      <div className="flex items-center gap-3">
                        <FormField
                          name="availability"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Checkbox
                                    color="primary"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className={`border-white-500 border-2  data-[state=checked]:border-none `}
                                  />
                                  <label
                                    htmlFor="terms"
                                    className="text-white-100  text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                              className="bg-black-700 !text-white-300 hover:border-white-500 hover:bg-black-600 hover:text-white-100  border-transparent">
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start text-left font-normal',
                                  !date && 'text-muted-foreground'
                                )}>
                                <CalendarIcon className="mr-2 size-4" />
                                {date ? (
                                  format(date, 'PPP')
                                ) : (
                                  <span>{startDate?.toDateString()}</span>
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
                        <div className="!w-[45%]">
                          <p className="mb-2">End Date & Time</p>
                          <Popover>
                            <PopoverTrigger
                              name="endDate"
                              asChild
                              className="bg-black-700 !text-white-300 hover:border-white-500 hover:bg-black-600 hover:text-white-100  border-transparent ">
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start text-left font-normal',
                                  !date && 'text-muted-foreground'
                                )}>
                                <CalendarIcon className="mr-2 size-4" />
                                {date ? (
                                  format(date, 'PPP')
                                ) : (
                                  <span>{endDate?.toDateString()}</span>
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
                    {step === 3 && (
                      <Button
                        type="submit"
                        className="bg-primary-500 text-black-900 hover:bg-black-600 hover:text-white-100 w-full font-extrabold uppercase duration-200">
                        {step === 3 ? `${loading ? '' : 'Submit'}` : 'Next'}
                        {loading && 'Submitting...'}
                      </Button>
                    )}
                  </>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
