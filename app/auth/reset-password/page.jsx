"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SquareChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function Page() {
  const [showPasswordsForm, setShowPassowrdsForm] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(
        showPasswordsForm
          ? `https://blanco-backend.vercel.app/api/v1/users/resetPassword/${data.token}`
          : "https://blanco-backend.vercel.app/api/v1/users/forgotPassword",
        {
          method: showPasswordsForm ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const res_data = await res.json();
      if (!res.ok) {
        toast(<div className="text-red-500">{res_data.message}</div>);
      }
      if (res.ok) {
        if (showPasswordsForm) {
          toast(
            <div>
              <h2 className="text-lg font-bold">
                Password updated successfully!
              </h2>
            </div>
          );
          router.push("/auth/login");
        } else {
          toast(
            <div>
              <h2 className="text-lg font-bold">Email sent successfully!</h2>
              <div>Please check your email for more information</div>
            </div>
          );
          setShowPassowrdsForm(true);
        }
      }
    } catch (err) {
      console.error(err);
      toast(
        <div className="text-red-500">{err || "Something went very wrong"}</div>
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
      className="rounded-r-xl  p-5 transform -translate-x-0  h-full bg-white  flex  flex-col justify-between ">
      <div className="ml-20 text-center">
        <h2 className="text-3xl font-bold mb-2">
          Forgot your password? No problem.
        </h2>
        <p className="text-[#999]">
          Enter your email address below and we’ll send you a link to reset your
          password. You’ll be back in no time.
        </p>
      </div>
      <div className="p-4 py-10 flex flex-col gap-4 rounded border ">
        {showPasswordsForm ? (
          <>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password..."
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <Input
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password..."
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="token">Token</label>
              <Input
                id="token"
                {...register("token", { required: "Token is required" })}
                placeholder="Enter your token... (sent in the email)"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        )}
      </div>
      <Button
        disabled={isSubmitting}
        className={`flex justify-between ${errors.incorrect && "bg-red-500"} `}>
        <div className="flex justify-between items-center w-full">
          {isSubmitting
            ? "Loading..."
            : showPasswordsForm
            ? "Reset Password"
            : "Send Email"}
        </div>
        <SquareChevronRight />
      </Button>
    </motion.form>
  );
}

export default Page;
