/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import SettingModal from "../views/settings";

const userNavigation = [
  { name: "Log out", href: "/logout" },
  { name: "Reset password", href: "/reset" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Signup", href: "/signup", current: false },
  { name: "Signin", href: "/signin", current: false },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [auth, setAuth] = useState(false);
  const [nav, setNav] = useState(navigation);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userData") || "";
    const parsedUser = user == "" ? {} : JSON.parse(user);
    console.log(parsedUser);
    if (parsedUser.id) {
      setAuth(true);
      setNav([]);
    }
  }, []);



  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-slate-200 
        dark:border-slate-700 
        bg-white"
      >
        {({ open }) => (
          <div className="mx-auto px-4 sm:px-6 lg:px-4 py-2">
            {open && (
              <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-slate-700 divide-y-2 divide-green-500 dark:dividde-green-300 ">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <Link to={"/"}>
                        <img
                          width={"200px"}
                          src={Logo}
                          alt="Sports News"
                        />
                      </Link>
                      <div className="-mr-2">
                        <Disclosure.Button className="bg-white p-3 text-gray-400 rounded-xl hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black-600">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-5 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {nav.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-base font-medium text-gray-900 dark:text-slate-300 hover:text-dark-600 dark:hover:text-dark-500"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <img width={"100px"} height={"72px"} src={Logo} alt="Sports News" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {nav.map((item) => {
                      const isCurrent = pathname.includes(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-slate-50 text-black-700 dark:text-black-500"
                              : "text-slate-500 dark:text-slate-300 dark:hover:text-black-600 hover:text-black-900",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-2 md:ml-6">
                  {auth ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          className=" bg-white p-1 text-gray-600 hover:text-gray-900 
                                    "
                        >
                          <AdjustmentsHorizontalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white text-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "bg-slate-200/50"
                                      : "",
                                    "w-full text-left block px-4 py-2 text-sm"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button >
                  <span className="sr-only">Open main menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
                </Disclosure.Button>
              </div>
            </div>
            <SettingModal open={isOpen} setOpen={setIsOpen} />
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
