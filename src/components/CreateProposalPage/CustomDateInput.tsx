import { FieldProps, useFormikContext } from 'formik';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from '../CreateProjectPage/DatePicker';
import { ProposalFormValues } from './CreateProposalPage';

export function CustomDateInput({
  field,
  ...props
}: FieldProps<ProposalFormValues['endDate']>) {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="relative">
      <DatePicker
        {...field}
        {...props}
        value={new Date(field.value).toLocaleDateString()}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          if (val) setFieldValue(field.name, val.getTime());
        }}
        placeholderText="End Date: DD/MM/YY"
      />
      <AiTwotoneCalendar size={24} className="absolute top-2 right-3" />
    </div>
  );
}
