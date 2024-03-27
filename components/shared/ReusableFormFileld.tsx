import React, { ReactElement } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, useFormContext } from "react-hook-form";

type ReusableFormFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  formControlClassName?: string;
  formItemClassName?: string;
  inputClassName?: string;
};

const ReusableFormField = ({
  name,
  label,
  placeholder,
  leftIcon,
  rightIcon,
  formItemClassName,
  formControlClassName,
  inputClassName,
}: ReusableFormFieldProps) => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={formItemClassName}>
            {!!label && (
              <FormLabel className="paragraph-3-medium">{label}</FormLabel>
            )}
            <FormControl>
              <div className={formControlClassName}>
                {leftIcon}
                <Input
                  placeholder={placeholder}
                  className={
                    inputClassName ??
                    "bg-black-700 !placeholder-slate-500 min-h-12 text-white-100 border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                  }
                  {...field}
                />
                {rightIcon}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ReusableFormField;
