import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useToast } from '@chakra-ui/react'
import { BellIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { getWalletAddress, getWeb3Provider } from '../api/api';
import { getShortAccountHash } from '../api/utils';

const navigation = [
  { name: 'Dashboard', href: `/` },
  { name: 'Vote', href: `/vote` },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const router = useRouter();
  const [address, setAddress] = useState('');

  useEffect(() => {
    getWalletAddress().then((address) => setAddress(address));
  }, []);

  const login = async () => {
    const provider = getWeb3Provider();
    if (provider !== undefined) {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address || '');
    }
  };

  const logout = async () => {
    setAddress('');
    const provider = getWeb3Provider();
    if (provider !== undefined) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address || '');
    }
  };

  // Toast (Chakra UI)
  function checkAccount() {
    const toast = useToast()
    if (address !== '') {
      return (
        <div
          className="block px-4 py-2 w-full text-left cursor-pointer"
          onClick={() => {
            toast({
              title: "Copied to clipboard",
              position: 'bottom-left',
              status: "success",
              duration: 3000,
              isClosable: true
            });
            navigator.clipboard.writeText(address);
          }}
        >
          <span> Logged in as </span>
          <span className="font-semibold text-gray-500">
            {getShortAccountHash(address)}
          </span>
        </div>
      );
    }
    return (
      <button className="block px-4 py-2 w-full text-left" onClick={login}>
        Login
      </button>
    );
  }

  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <CloseIcon h={6} w={6} /> // block?
                  ) : (
                    <HamburgerIcon h={6} w={6} /> // block?
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 items-center hidden sm:flex">
                  IMAGE HERE
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href} passHref>
                        <a
                          className={classNames(
                            router.pathname === item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-600 hover:bg-gray-500 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={
                            router.pathname === item.href ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Account Hash */}
                <div className="text-gray-400 font-semibold text-sm">
                  {checkAccount()}
                </div>

                {/* Bell notifications */}
                <button className="bg-gray-300 p-1 rounded-full text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon w={6} h={6} />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {/* Placeholder Image */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                            <Link href={`/profile`} passHref>
                              <a
                                className={classNames(
                                  active ? 'bg-gray-200' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Profile
                              </a>
                            </Link>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/setting"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'text-sm text-gray-700'
                            )}
                          >
                            {checkAccount()}
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <a
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-500 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={
                      router.pathname === item.href ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
