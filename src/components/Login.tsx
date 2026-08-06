'use client'

import { useState } from 'react';
import CredentialSignInButton from './UI/CredentialSignInButton';
import GitHubSignInButton from './UI/GithubSignInButton';
import GoogleSignInButton from './UI/GoogleSignInButton';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isUser, setIsUser] = useState(true);
  const router = useRouter();

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-zinc-100 p-4"
      style={{
        backgroundImage: "url('/image.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-6xl overflow-hidden rounded-3xl border-2 border-zinc-300 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.10),0_12px_40px_rgba(0,0,0,0.10)]">
        <div className="flex lg:min-h-[90vh] flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/2 m-2 rounded-3xl overflow-hidden cursor-pointer border border-zinc-500 shadow-[0_4px_20px_rgba(0,0,0,0.10),0_12px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.20),0_12px_40px_rgba(0,0,0,0.20)] transition-all duration-300">
            <img
              src="/image.png"
              alt="Login visual"
              className="h-full w-full object-cover hover:scale-[1.01] transition-all duration-300"
            />
          </div>

          <div className="flex flex-col relative w-full min-w-lg lg:w-1/2 items-center justify-center p-6 lg:p-10">
            <div className="w-full text-start space-y-3 py-5">
              <h1 className="text-3xl font-bold tracking-tight leading-none text-black">
                {isUser ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-sm leading-none text-black">
                {isUser
                  ? 'Sign in to continue to your account.'
                  : 'Sign up to continue to your account.'}
              </p>
            </div>

            <div className="w-full max-w-lg">
              {isUser ? (
                <>
                  <CredentialSignInButton isUser={isUser}/>

                  <div className="flex items-center justify-center text-zinc-500 my-2">
                    <span>or</span>
                  </div>

                  <div className="space-y-2">
                    <GoogleSignInButton />
                    <GitHubSignInButton />
                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full text-center text-sm leading-5 text-zinc-500"
                    onClick={() => setIsUser(false)}
                  >
                    <p>
                      Don't have an account?{' '}
                      <span className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                        Sign up
                      </span>
                    </p>
                  </button>
                </>
              ) : (
                <>
                  <CredentialSignInButton isUser={isUser}/>

                  <button
                    type="button"
                    className="mt-6 w-full text-center text-sm leading-5 text-zinc-500"
                    onClick={() => setIsUser(true)}
                  >
                    <p>
                      Already have an account?{' '}
                      <span className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                        Sign In
                      </span>
                    </p>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};