'use client';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PostType } from '@/constants';
import { createPost, findAndUpdatePost } from '@/lib/actions/post.action';
import { ICreatePost, createPostSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';
import { Editor } from '@tinymce/tinymce-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

import { selectStyles } from '@/styles';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import ReusableFormField from '../shared/ReusableFormFileld';

const animatedComponents = makeAnimated();

interface IFormCreatePost {
  type?: string;
  post?: ICreatePost;
  tags: {
    _id: string;
    name: string;
  }[];
}

const FormCreatePost = ({ post, tags, type }: IFormCreatePost) => {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const options = post?.tags.map((tag: any) => ({
    value: tag._id,
    label: tag.name,
  }));
  const relatedTagsForCreatingPost = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current = Editor;
    }
  }, [Editor]);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),

    defaultValues: {
      title: post?.title ?? '',
      postType: post?.postType ?? 'Component',
      tags: type === 'relatedPost' ? relatedTagsForCreatingPost : options,
      description: post?.description ?? '',
      lessons: post?.lessons ?? [],
      codeSnippet: post?.codeSnippet ?? '',
      content: post?.content ?? '',
      resources: post?.resources ?? [],
    },
  });

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLessons,
  } = useFieldArray({
    name: 'lessons',
    control: form.control,
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    name: 'resources',
    control: form.control,
  });

  let postType = form.watch('postType');

  async function onSubmit(values: ICreatePost) {
    setLoading(true);
    try {
      if (type === 'Update') {
        await findAndUpdatePost({ _id: post?._id, ...values });
        router.push(`/postDetails/${post?._id}`);
      }

      if (type === 'Create') {
        await createPost(values);
        router.push(`/home`);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-10 w-full px-3 md:px-7">
      <div className="mb-6">
        <h1 className="h1-bold my-5 w-full md:my-8 ">
          {type === 'Update' ? ' Update Post' : 'Create Post'}
        </h1>
        <p className="text-white-500 uppercase">Basic Information</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6">
          <ReusableFormField
            name="title"
            label="Title"
            placeholder="Enter your title of your post"
          />

          <FormField
            control={form.control}
            name="postType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(
                      value: 'WorkFlow' | 'Component' | 'Knowledge'
                    ) => form.setValue('postType', value)}>
                    <FormLabel className="paragraph-3-medium">
                      Create Type
                    </FormLabel>
                    <SelectTrigger
                      className={`
                      bg-black-700
                      text-white-500 focus-within:border-white-500 hover:border-white-500 !mt-2
                      min-h-12 
                      w-full  border-transparent placeholder:text-slate-300 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 `}>
                      <SelectValue placeholder="Component" />
                    </SelectTrigger>
                    <SelectContent className="bg-black-700 focus-within:border-white-500 group border border-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                      {PostType.map((type, idx) => (
                        <SelectItem
                          key={idx}
                          value={type.value}
                          className={` hover:!bg-black-600 flex 
                          ${type.value === 'Component' && '!text-purple-500'}
                          ${type.value === 'WorkFlow' && '!text-primary-500'}
                          ${type.value === 'Knowledge' && '!text-green-500'}`}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={type.image}
                              alt={type.label}
                              width={15}
                              height={15}
                            />
                            <p
                              className={`
                              ${
                                type.value === 'Component' && '!text-purple-500'
                              }
                              ${
                                type.value === 'WorkFlow' && '!text-primary-500'
                              }
                              ${type.value === 'Knowledge' && '!text-green-500'}
                      `}>
                              {type.label}
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="paragraph-3-medium mb-2">Tags</h4>

          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <>
                <CreatableSelect
                  {...field}
                  onChange={(e) => {
                    console.log(e);
                    field.onChange(e);
                  }}
                  styles={selectStyles}
                  className="!bg-transparent capitalize"
                  components={animatedComponents}
                  options={tags.map((tag) => ({
                    value: tag._id,
                    label: tag.name,
                  }))}
                  isMulti
                />

                <p className="text-[14px] text-red-500">
                  {form.formState.errors.tags?.message ||
                    form.formState.errors.tags?.[0]?.value?.message}
                </p>
              </>
            )}
          />

          <div className="flex w-full flex-col space-y-3 ">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your description"
                      className="custom-scrollbar 
                    bg-black-700 text-white-100 focus-within:border-white-500
                    hover:border-white-500  !h-48 border-transparent
                     focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="paragraph-3-medium mb-2">
              {postType === 'WorkFlow' && 'Steps to fallow'}
              {postType === 'Knowledge' && 'What you learnd'}
            </h4>
            {lessonFields.map((item, index) => (
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
                      className="hover:bg-black-900 bg-transparent"
                      onClick={() => removeLessons(index)}>
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
          {postType !== 'Component' && (
            <Button
              type="button"
              onClick={() => appendLesson({ title: '' })}
              className="bg-black-600 flex w-full items-center gap-2">
              <Image
                src="/assets/icons/blue-plus.svg"
                alt="pluse"
                width={13}
                height={13}
              />
              <p className="paragraph-4-medium">Add checkmark</p>
            </Button>
          )}

          <Separator className="bg-white-500 my-6 h-[0.68px] w-full bg-opacity-10" />
          <div className="!mt-0 flex flex-col space-y-8">
            {postType !== 'Knowledge' && postType !== 'WorkFlow' && (
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormItem>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                      tagName="codeSnippet"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onBlur={field.onBlur}
                      onEditorChange={(codeSnippet) =>
                        form.setValue('codeSnippet', codeSnippet)
                      }
                      initialValue={post?.codeSnippet}
                      init={{
                        height: 250,
                        skin: 'oxide-dark',
                        placeholder: 'Paste your code here...',
                        content_css: 'dark',
                        content_style: ` body { font-family: Roboto, sans-serif; font-size: 14px; color: #ffff;  background-color: #1d2032;} body::-webkit-scrollbar {display: none; }pre, code { font-family: "Roboto Mono", monospace; background-color: transparent !important;  padding: 5px; } body::before { color: #55597D !important; } `,
                        menu: {
                          code: { title: 'Code', items: 'codesample' },
                          preview: { title: 'Preview', items: 'preview' },
                        },
                        plugins: ['code', 'codesample', 'preview'],
                        menubar: 'code preview',
                        toolbar: '',
                      }}
                    />
                  </FormItem>
                )}
              />
            )}
            <div>
              <h3 className="text-white-500 mb-3 uppercase">Content</h3>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Editor
                      apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
                      tagName="content"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onBlur={field.onBlur}
                      onEditorChange={(content) =>
                        form.setValue('content', content)
                      }
                      init={{
                        height: 250,
                        skin: 'oxide-dark',
                        placeholder: 'Write your content here...',
                        content_css: 'dark',
                        content_style: ` body { font-family: Roboto, sans-serif; font-size: 14px; color: #ffff;  background-color: #1d2032;} body::-webkit-scrollbar {display: none; }pre, code { font-family: "Roboto Mono", monospace; background-color: transparent !important;  padding: 5px; } body::before { color: #55597D !important; } `,
                        menubar: '',
                        plugins: [
                          'code',
                          'codesample',
                          'preview',
                          'media',
                          'emoticons',
                          'image',
                          'link',
                        ],
                        toolbar:
                          ' bold italic code codesample alignleft aligncenter alignright alignjustify bullist numlist link image media emoticons',
                      }}
                      initialValue={post?.content}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="bg-white-500 my-6 h-[0.68px] w-full bg-opacity-10" />
          <h4 className="text-white-500 mb-7 uppercase">RESOURCES & LINKS</h4>
          <div className="flex flex-col gap-2">
            {resourceFields.map((item, idx) => (
              <div key={item.id} className="flex gap-2">
                <ReusableFormField
                  formItemClassName="w-full"
                  name={`resources.${idx}.label` as any}
                  placeholder="Label"
                  inputClassName="bg-black-700
                min-h-12
                text-white-100
                border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                />

                <ReusableFormField
                  formItemClassName="w-full"
                  name={`resources.${idx}.resource` as any}
                  placeholder="Resource Link"
                  inputClassName="bg-black-700 
                  min-h-12
                  text-white-100
                  border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                />

                <Button
                  type="button"
                  onClick={() => removeResource(idx)}
                  className=" bg-black-600 flex h-12 items-center gap-2 ">
                  <Image
                    src="/assets/icons/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => appendResource({ label: '', resource: '' })}
            className="bg-black-600 mt-2 flex items-center gap-2">
            <Image
              src="/assets/icons/blue-plus.svg"
              alt="plus"
              width={13}
              height={13}
            />
            <p className="paragraph-4-medium">New Resource</p>
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary-500 text-black-900 font-bold disabled:opacity-50">
            {type === 'Create' || type === 'relatedPost'
              ? loading
                ? 'Creating Post ...'
                : 'Create Post'
              : null}
            {type === 'Update'
              ? loading
                ? 'Updating Post ...'
                : 'Update Post'
              : null}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormCreatePost;
