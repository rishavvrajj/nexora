"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { signIn, signUp } from "../../../lib/auth-client";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),
  image: z.any().optional(),
});

type FormData = {
  name?: string;
  email: string;
  password: string;
  image?: FileList;
};

export default function CredentialSignInButton({
  isUser,
}: {
  isUser: boolean;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(isUser ? loginSchema : signupSchema),
  });

  const imageRegister = register("image");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue("image", e.target.files as FileList);
    }
  };

  const submitData = async (data: FormData) => {

    try {
      const result = await signUp(data.name || "", data.email, data.password);

      if (result) {
        router.push('/dashboard')
      };
    } catch(e) {
      console.error(e);
    };

    try {
      const result = await signIn(data.email, data.password);

      if (result) {
        router.push('/dashboard');
      };
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(submitData)} className="w-full space-y-4">
        <div className="space-y-2 text-zinc-900">
          {!isUser && (
            <div className="flex flex-col items-center gap-3">
              <label className="cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-400 bg-zinc-100 flex items-center justify-center hover:opacity-80 transition">
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-zinc-500">Add Photo</span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...imageRegister}
                  onChange={(e) => {
                    imageRegister.onChange(e);
                    handleImageSelect(e);
                  }}
                />
              </label>
            </div>
          )}

          {!isUser && (
            <div className="flex flex-col">
              <label className="ml-0.5 text-sm">
                Name{" "}
                {errors.name && (
                  <span className="text-xs text-red-400">
                    {" "}
                    * {errors.name.message}
                  </span>
                )}
              </label>
              <input
                type="text"
                className="p-2 my-1 border border-zinc-600 w-full rounded-md hover:border-zinc-500 transition-all duration-300"
                placeholder="name"
                {...register("name")}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="ml-0.5 text-sm">
              Email{" "}
              {errors.email && (
                <span className="text-xs text-red-400">
                  {" "}
                  * {errors.email.message}
                </span>
              )}
            </label>
            <input
              type="email"
              className="p-2 my-1 border border-zinc-600 w-full rounded-md hover:border-zinc-500 transition-all duration-300"
              placeholder="email"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col">
            <label className="ml-0.5 text-sm">
              Password{" "}
              {errors.password && (
                <span className="text-xs text-red-400">
                  {" "}
                  * {errors.password.message}
                </span>
              )}
            </label>
            <input
              type="password"
              className="p-2 my-1 border border-zinc-600 w-full rounded-md hover:border-zinc-500 transition-all duration-300"
              placeholder="password"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {isUser ? "Login" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}