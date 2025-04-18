"use client";

import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const LoginForm = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://blanco-backend.vercel.app/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const res_data = await res.json();
      console.log(res_data);
      // If login failed
      if (!res.ok) {
        toast(<div className="text-red-500">{res_data.message}</div>);
      }
      if (res.ok)
        toast(
          <div>
            Login successfull
            <h2 className="text-xl font-bold">Hi there!</h2>
          </div>
        );

      // Login succeeded
      setToken(res_data.token);
    } catch (err) {
      console.error(err);
      toast(
        <div className="text-red-500">{err || "Something went very wrong"}</div>
      );
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push("/");
    }
  }, []);

  return (
    <motion.form
      initial={{ x: -20, filter: "blur(2px)" }}
      animate={{ x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-r-xl  p-5 transform -translate-x-0  h-full bg-white  flex  flex-col justify-between ">
      <div className="ml-20">
        <h1 className="text-3xl font-bold">Let's get you started!</h1>
        <p className="text-[#999]">
          Login using your email and password. <br /> Don't have an account?
          signup
        </p>
      </div>
      <div className="p-4 py-10 flex flex-col gap-4 rounded border ">
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
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type={`password`}
            id="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your Password..."
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>
      <Button
        disabled={isSubmitting}
        className={`flex justify-between ${errors.incorrect && "bg-red-500"} `}>
        <div className="flex justify-between items-center w-full">
          {isSubmitting ? "Loading..." : "Login"}
        </div>

        <LogIn />
      </Button>
    </motion.form>
  );
};

export default LoginForm;
