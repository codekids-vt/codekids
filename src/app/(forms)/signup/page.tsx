"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';

import joinClasses from "@/util/joinClasses";

const DEFAULT_FIELD_STYLING = joinClasses(
  "p-1 w-full rounded-md shadow-black drop-shadow-lg",
  "focus:shadow-xl transition duration-250 ease-out"
);

function ErrorNote({ message }: { message: string }) {
  return <div className="text-sm py-1 text-red-500">{message}</div>;
}

type SignUpFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
       .oneOf([yup.ref('password')], 'Passwords must match') // Removed null from oneOf
       .required('Please confirm your password'),
  }).required();  

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormValues>({ 
    resolver: yupResolver(validationSchema)  
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="container mx-auto flex flex-col justify-center">
      <form onSubmit={onSubmit}>
        <div className="w-80 mx-auto">
          <div className="[&>*]:pb-2">
            {/* Username Input */}
            <div>
              <p>Username</p>
              <input
                {...register("username")}
                className={joinClasses(
                  DEFAULT_FIELD_STYLING,
                  errors.username && "border border-red-500"
                )}
              />
              {errors.username?.message && <ErrorNote message={errors.username.message} />}
            </div>

            {/* Password Input */}
            <div>
              <p>Password</p>
              <input
                type="password"
                {...register("password")}
                className={joinClasses(
                  DEFAULT_FIELD_STYLING,
                  errors.password && "border border-red-500"
                )}
              />
              {errors.password?.message && <ErrorNote message={errors.password.message} />}
            </div>

            {/* Confirm Password Input */}
            <div>
              <p>Re-enter Password</p>
              <input
                type="password"
                {...register("confirmPassword")}
                className={joinClasses(
                  DEFAULT_FIELD_STYLING,
                  errors.confirmPassword && "border border-red-500"
                )}
              />
              {errors.confirmPassword?.message && <ErrorNote message={errors.confirmPassword.message} />}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <input 
              type="submit"
              className="w-auto py-1 px-12 text-white bg-blue-500 shadow-blue-500/40 shadow-md rounded-md hover:cursor-pointer hover:shadow-black/40 hover:drop-shadow-xl transition duration-200 ease-out"
            />
            <Link href="/login" passHref>
              <button 
                type="button"
                className="w-auto py-1 px-12 text-white bg-gray-500 shadow-gray-500/40 shadow-md rounded-md hover:cursor-pointer hover:shadow-black/40 hover:drop-shadow-xl transition duration-200 ease-out"
              >
                Go to Login
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
