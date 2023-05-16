import { FieldProps } from 'formik';

export function CustomOptionInput({ field, form, ...props }: FieldProps) {
  return (
    <input
      type="text"
      {...field}
      {...props}
      className="block p-2 w-full box-border text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:bg-slate-50 hover:border-yellow-500 hover:bg-slate-100 mb-2"
    />
  );
}
