import { Dialog, Transition } from '@headlessui/react';
import { FieldProps, useFormikContext } from 'formik';
import React, { Fragment, useState } from 'react';
import DatePicker from '../CreateProjectPage/DatePicker';
import { showCurrentDate } from '../Vote/voteUtils';
import { initialValues } from './CreateProposalPage';

export function CustomDateInput({
  field,
  ...props
}: FieldProps<(typeof initialValues)['end_date']>) {
  const { setFieldValue } = useFormikContext();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <button
          className="w-full rounded-full items-center px-5 py-3 text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all"
          onClick={openModal}
        >
          End Date: {showCurrentDate(field.value)}
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
              <div className="inline-block w-full max-w-min px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 cursor-default text-center"
                >
                  Select Date
                </Dialog.Title>
                <div className="mt-2">
                  <DatePicker
                    {...field}
                    {...props}
                    value={String(field.value)}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={(val) => {
                      if (val) setFieldValue(field.name, val.getTime());
                    }}
                    inline
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <div className="text-center">
                    <button
                      className="rounded-full border border-purple-400 p-1 px-3 text-purple-600 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-gray-100"
                      onClick={closeModal}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
