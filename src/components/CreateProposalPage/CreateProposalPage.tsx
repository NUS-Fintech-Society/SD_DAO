import { useToast } from '@chakra-ui/react';
import { Dialog, Transition } from '@headlessui/react';
import { Field, FieldArray, FieldProps, Form, Formik } from 'formik';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';
import useCreateProposal from '../../hooks/useCreateProposal';
import { getCurrentDateTime } from '../Vote/voteUtils';
import { CustomDateInput } from './CustomDateInput';
import { CustomOptionInput } from './CustomOptionInput';

const formTypes = [
  { label: 'Loss Voting', value: 'loss' },
  { label: 'Allocation Proposal', value: 'allocation' },
];

const minStakeValues = [
  { label: 'No Minimum', value: 0 },
  { label: '1 coin', value: 1 },
  { label: '5 coins', value: 5 },
  { label: '10 coins', value: 10 },
];

let initialType = 'loss';
let initialMinStakeVal = 1;

export interface ProposalFormValues {
  title: string;
  description: string;
  type: string;
  options: { id: number; label: string }[];
  min_stake: number;
  endDate: number;
}

const initialValues: ProposalFormValues = {
  title: '',
  description: '',
  type: initialType,
  options: [
    { id: 1, label: 'Yes' },
    { id: 2, label: 'No' },
  ],
  min_stake: initialMinStakeVal,
  endDate: getCurrentDateTime(),
};

const proposalSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  options: Yup.array().min(2, 'Please have at least 2 options'),
});

export default function CreateProposalPage() {
  const { address } = useAccount();
  // TODO: integrate with project page
  const { createProposal, isSuccess, txReceipt } = useCreateProposal(1);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Proposal Created Successfully!',
        status: 'success',
        description: JSON.stringify(txReceipt),
      });
    }
  }, [isSuccess]);

  return (
    <div className="grid gap-2 content-center pb-16">
      <h1 className="text-center text-5xl pt-12 pb-2">Create Proposal</h1>
      <div className="inline text-center">
        <h2 className="bg-yellow-100 rounded-lg inline p-1">Project XYZ</h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log({ values, address });
          if (address) {
            createProposal({
              isAllocationProposal: values.type === 'allocation',
              isLossVoting: values.type === 'loss',
              numOfOptions: values.options.length,
              min_stake: values.min_stake,
            });
            setSubmitting(false);
          }
        }}
        validationSchema={proposalSchema}
        validateOnMount
      >
        {({ values, errors, touched, isValid, setSubmitting }) => {
          return (
            <Form className="px-40">
              <label
                htmlFor="title"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Title
              </label>
              <Field
                id="title"
                type="text"
                name="title"
                placeholder="Proposal title"
                className="block p-2 w-full box-border h-10 text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 resize-none mb-6 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:bg-slate-50 hover:border-yellow-500 hover:bg-slate-100"
              />
              <label
                htmlFor="description"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                id="description"
                placeholder="Proposal description"
                className="block box-border h-28 p-2 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:bg-slate-50 hover:border-yellow-500 hover:bg-slate-100"
              />
              <div className="mt-6 flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="options" className="text-lg font-bold">
                    Proposal Type
                  </label>
                  <div className="flex items-center mt-3 space-x-3">
                    {formTypes.map((proposalType) => (
                      <div
                        key={proposalType.value}
                        className="flex items-center"
                      >
                        <input
                          id={proposalType.label}
                          type="radio"
                          value={proposalType.value}
                          name={proposalType.label}
                          className="form-radio w-4 h-4 bg-slate-100 checked:bg-yellow-500 cursor-pointer"
                        />
                        <label
                          htmlFor={proposalType.label}
                          className="ml-1 text-sm font-medium text-gray-900"
                        >
                          {proposalType.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="endDate"
                      className="block mb-2 text-lg font-bold text-gray-800"
                    >
                      End Date
                    </label>
                    <Field name="endDate" component={CustomDateInput} />
                  </div>
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="options"
                    className="block mb-2 text-lg font-bold text-gray-800"
                  >
                    Options
                  </label>
                  <div className="w-full">
                    <FieldArray name="options">
                      {({ remove, push }) => {
                        return values.options.map((option, index) => {
                          return (
                            <div
                              key={`${option.label} ${index}`}
                              className="relative"
                              // onKeyDown={(e) => {
                              //   if (
                              //     e.key === 'Enter' &&
                              //     values.options[index]?.label !== ''
                              //   ) {
                              //     push({
                              //       id: values.options.length,
                              //       label: '',
                              //     });
                              //     console.log('pushing');
                              //   }
                              // }}
                            >
                              <Field
                                name={`options.${index}.label`}
                                placeholder={'Enter option name'}
                                component={CustomOptionInput}
                              />
                              <AiOutlineDelete
                                className="absolute right-2 top-3 cursor-pointer"
                                onClick={() => remove(index)}
                              />
                            </div>
                          );
                        });
                      }}
                    </FieldArray>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  className="p-1 px-8 bg-amber-200 hover:bg-amber-300 font-bold rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const CustomTextInput = ({
  field,
  form,
  label,
  ...props
}: FieldProps & { label: string }) => (
  <div className="flex flex-col my-2 space-y-1 w-full">
    <div className="flex flex-row space-x-2 items-end">
      <div className="text-gray-500 font-semibold text-2xl">{label}</div>
      <div className="class">
        {form.errors.title && form.touched.title ? (
          <div className="text-red-500 font-thin text-sm">required</div>
        ) : null}
      </div>
    </div>
    <input
      type="text"
      {...field}
      {...props}
      className="border border-gray-200 rounded-lg p-2 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-medium"
    />
  </div>
);

function CustomStakeInput({
  field,
  form,
  ...props
}: FieldProps<ProposalFormValues['min_stake']>) {
  let [isOpen, setIsOpen] = useState(false);
  let [stakeLabel, setStakeLabel] = useState(getLabel());
  let buttonRefs = useRef(
    minStakeValues.map(() => React.createRef<HTMLButtonElement>())
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function setStake(stake: { value: number; label: string }) {
    initialMinStakeVal = stake.value;
    field.value = stake.value;
    setStakeLabel(stake.label);
    closeModal();
  }

  // Get the label corresponding to the value in minStakeValues
  function getLabel() {
    try {
      const filtered = minStakeValues.find(
        (stake) => stake.value === field.value
      );
      return filtered && filtered.value;
    } catch (error) {
      return 'Select Minimum Stake';
    }
  }

  // Get the position of the label in minStakeValues using value
  function getPosition() {
    return minStakeValues.findIndex((stake) => stake.value === field.value);
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <button
          className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all"
          onClick={openModal}
        >
          {stakeLabel}
        </button>
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        //  autoFocus={isOpen}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          initialFocus={buttonRefs.current[getPosition()]}
        >
          <div className="min-h-screen px-4 text-center">
            {/* Allow for clicking outside to close modal*/}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 cursor-default"
                >
                  Select Minimum Stake
                </Dialog.Title>
                <div className="mt-2">
                  {minStakeValues.map((stake, index) => (
                    <button
                      key={stake.value}
                      type="button"
                      {...field}
                      {...props}
                      value={stake.value}
                      ref={buttonRefs.current[index]}
                      className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all focus:ring-2 focus:border-transparent focus:ring-blue-400"
                      onClick={() => setStake(stake)}
                    >
                      {stake.label}
                    </button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function CustomVoteInput({
  field,
  form,
  ...props
}: FieldProps<ProposalFormValues['type']>) {
  let [isOpen, setIsOpen] = useState(false);
  let buttonRefs = useRef(
    formTypes.map(() => React.createRef<HTMLButtonElement>())
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function setType(type: { value: string }) {
    field.value = type.value;
    initialType = type.value;
    closeModal();
  }

  // Get the label corresponding to the value in formTypes
  function getLabel() {
    try {
      const filteredTypes = formTypes.find(
        (type) => type.value === field.value
      );
      return filteredTypes && filteredTypes.label;
    } catch (error) {
      return 'Select Type';
    }
  }

  // Get the position of the label in formTypes using value
  function getPosition() {
    return formTypes.findIndex((type) => type.value === field.value);
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <button
          className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all"
          onClick={openModal}
        >
          {getLabel()}
        </button>
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        // autoFocus={isOpen}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          initialFocus={buttonRefs.current[getPosition()]}
        >
          <div className="min-h-screen px-4 text-center">
            {/* Allow for clicking outside to close modal*/}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 cursor-default"
                >
                  Select Type
                </Dialog.Title>
                <div className="mt-2">
                  {formTypes.map((type, index) => (
                    <button
                      key={type.value}
                      type="button"
                      {...field}
                      {...props}
                      value={type.value}
                      ref={buttonRefs.current[index]}
                      className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all focus:ring-2 focus:border-transparent focus:ring-blue-400"
                      onClick={() => setType(type)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
