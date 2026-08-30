'use client';

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Link from "next/link";
import { FC, Fragment, ReactElement, useState } from "react";
import { FaEye, FaEyeSlash, FaTv } from "react-icons/fa";
import clsx from "clsx";
import { useLogin } from "@/app/(auth)/login/useLogin";

const Home: FC = (): ReactElement => {
  const [passwordType, setPasswordType] = useState<string>('password');
  const { loading, validationErrors, setValidationErrors, onLoginSubmit } = useLogin();

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex flex-col mx-auto w-11/12 max-w-sm">
        <form action={onLoginSubmit}>
          <div className="w-full">
            <div className="mb-8 flex flex-col justify-between text-gray-600">
              <span className="flex items-center justify-center gap-2 mx-auto mb-6 text-lg font-semibold text-gray-900">
                <FaTv className="text-base text-brand" />
                Uptimer
              </span>
              <h1 className="flex w-full text-center justify-center text-2xl font-semibold text-gray-900 mb-2">
                Welcome back
              </h1>
              <h5 className="flex w-full text-gray-400 text-center justify-center text-sm font-normal">
                New here?&nbsp;<Link href="/create-account" className="text-gray-900 underline underline-offset-2">Create an account</Link>
              </h5>
            </div>
            <Fragment>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <TextInput
                id="username"
                name="username"
                type="text"
                className={clsx(
                  'mt-2 mb-4 flex h-11 w-full items-center rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                  {
                    'ring-2 ring-red-300': validationErrors!.username
                  }
                )}
                placeholder="Enter username"
                onChange={() => {
                  setValidationErrors!({...validationErrors!, username: '' });
                }}
              />
            </Fragment>
            <Fragment>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3.5 text-gray-400">
                  {passwordType === 'password' ? (
                    <FaEyeSlash onClick={() => setPasswordType('text')} className="text-sm" />
                  ) : (
                    <FaEye onClick={() => setPasswordType('password')} className="text-sm" />
                  )}
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={passwordType}
                  className={clsx(
                    'flex h-11 w-full items-center rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                    {
                      'ring-2 ring-red-300': validationErrors!.password
                    }
                  )}
                  placeholder="Enter password"
                  onChange={() => {
                    setValidationErrors!({...validationErrors!, password: '' });
                  }}
                />
              </div>
            </Fragment>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gray-900 mt-7 text-sm block w-full cursor-pointer rounded-xl py-3 text-center font-medium text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50"
              label={`${loading ? 'Logging in...' : 'Log in'}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
