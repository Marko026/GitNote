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
import { Checkbox } from "../ui/checkbox";

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
                    "min-h-12 border-transparent bg-black-700 text-white-100 !placeholder-slate-500  focus-within:border-white-500 hover:border-white-500 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
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
