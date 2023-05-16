import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = (props: ReactDatePickerProps) => {
  return (
    <ReactDatePicker
      disabledKeyboardNavigation
      className="rounded-lg w-full h-10 pl-4 text-sm bg-gray-300 border-gray-300 focus:bg-slate-50 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 hover:border-yellow-500 hover:bg-slate-50 text-gray-900"
      {...props}
    />
  );
};

export default DatePicker;
