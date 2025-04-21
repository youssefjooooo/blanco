"use client";

import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://blanco-backend.vercel.app/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            passwordConfirm: data.confirmPassword,
            confirmPassword: undefined,
          }),
        }
      );

      const res_data = await res.json();
      if (!res.ok) {
        toast(<div className="text-red-500">{res_data.message}</div>);
      }
      if (res.ok) {
        toast(<div>Signup successfull !</div>);
        router.push("/auth/login");
      }
    } catch (err) {
      console.error(err);
      toast(
        <div className="text-red-500">{err || "Something went wrong"}</div>
      );
    }
  };

  const password = watch("password");

  return (
    <motion.form
      initial={{ x: -20, filter: "blur(2px)" }}
      animate={{ x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-r-xl  p-5  relative  h-full bg-white  flex  flex-col justify-between border-l-0">
      <div className="ml-20 text-center">
        <h2 className="text-3xl font-bold mb-2">Let's get you started!</h2>
        <p className="text-[#999]">
          Start by filling in the sign-up form below to create your account and
          unlock all features. <br />
          Already have an account?
          <Link href="/auth/login" className="underline ml-1">
            Log in here.
          </Link>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-4  p-4 py-6  rounded border">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name..."
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <Input
            id="phone"
            type="number"
            {...register("phone", { required: "Phone is required" })}
            placeholder="Enter your phone number..."
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password..."
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password..."
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-between mt-4 ">
        {isSubmitting ? (
          "Loading ... "
        ) : (
          <>
            Sign Up <LogIn />
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default SignupForm;
