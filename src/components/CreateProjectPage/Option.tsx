import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

interface OptionProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onAddOption: () => void;
}

const Option = (props: OptionProps) => {
  const { onAddOption, ...inputProps } = props;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onAddOption();
        }
      }}
    >
      <label className="flex items-center">
        <input
          list="browsers"
          className="w-full mb-2 bg-gray-300 border-gray-300 rounded-lg p-1 pl-2.5 text-sm focus:outline-yellow-500 focus:bg-slate-50 hover:border-yellow-500 hover:bg-slate-100"
          placeholder="Add Options"
          {...inputProps}
        />
        <IoIosAddCircle
          className="-ml-6 -mt-2 cursor-pointer"
          onClick={onAddOption}
        />
      </label>
    </div>
  );
};

export default Option;
