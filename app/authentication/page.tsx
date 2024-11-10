"use client";

import React, { useState, useCallback, memo, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, User, Chrome } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "../services/auth.service";

interface LoginFormState {
  email: string;
  password: string;
}

interface SignupFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  confirmPassword?: string;
}

interface FormProps<T> {
  form: T;
  errors: FormErrors;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof T, value: string) => void;
  onGoogleLogin: () => Promise<void>;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FormField = forwardRef<
  HTMLDivElement,
  {
    label: string;
    icon: React.ComponentType<any>;
    error?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, icon: Icon, error, ...props }, ref) => (
  <motion.div className="space-y-2" variants={fadeIn} ref={ref}>
    <Label htmlFor={props.id}>{label}</Label>
    <div className="relative">
      <Icon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input className="pl-8" {...props} />
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="text-sm text-red-500"
      >
        {error}
      </motion.p>
    )}
  </motion.div>
));
FormField.displayName = "FormField";

const LoginForm = memo(
  ({
    form,
    errors,
    isLoading,
    onSubmit,
    onChange,
    onGoogleLogin,
  }: FormProps<LoginFormState>) => (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-4"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <FormField
        label="Email"
        icon={Mail}
        id="email"
        type="email"
        placeholder="bark@pupspot.com"
        value={form.email}
        onChange={(e) =>
          onChange("email", (e.target as HTMLInputElement).value)
        }
        error={errors.email}
      />

      <FormField
        label="Password"
        icon={Lock}
        id="password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e) =>
          onChange("password", (e.target as HTMLInputElement).value)
        }
        error={errors.password}
      />

      <motion.div variants={fadeIn}>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </motion.div>

      <motion.div className="relative my-4" variants={fadeIn}>
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
          or continue with
        </span>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </motion.div>
    </motion.form>
  )
);
LoginForm.displayName = "LoginForm";

const SignupForm = memo(
  ({
    form,
    errors,
    isLoading,
    onSubmit,
    onChange,
    onGoogleLogin,
  }: FormProps<SignupFormState>) => (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-4"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <FormField
        label="Full Name"
        icon={User}
        id="fullName"
        type="text"
        placeholder="John Doe"
        value={form.fullName}
        onChange={(e) =>
          onChange("fullName", (e.target as HTMLInputElement).value)
        }
        error={errors.fullName}
      />

      <FormField
        label="Email"
        icon={Mail}
        id="signupEmail"
        type="email"
        placeholder="bark@pupspot.com"
        value={form.email}
        onChange={(e) =>
          onChange("email", (e.target as HTMLInputElement).value)
        }
        error={errors.email}
      />

      <FormField
        label="Password"
        icon={Lock}
        id="signupPassword"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e) =>
          onChange("password", (e.target as HTMLInputElement).value)
        }
        error={errors.password}
      />

      <FormField
        label="Confirm Password"
        icon={Lock}
        id="confirmPassword"
        type="password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={(e) =>
          onChange("confirmPassword", (e.target as HTMLInputElement).value)
        }
        error={errors.confirmPassword}
      />

      <motion.div variants={fadeIn}>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </motion.div>

      <motion.div className="relative my-4" variants={fadeIn}>
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
          or continue with
        </span>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </motion.div>
    </motion.form>
  )
);
SignupForm.displayName = "SignupForm";

const AuthPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState<SignupFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [signupErrors, setSignupErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLoginChange = useCallback(
    (field: keyof LoginFormState, value: string) => {
      setLoginForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSignupChange = useCallback(
    (field: keyof SignupFormState, value: string) => {
      setSignupForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const errors: FormErrors = {};

      if (!loginForm.email) errors.email = "Email is required";
      else if (!validateEmail(loginForm.email))
        errors.email = "Invalid email format";

      if (!loginForm.password) errors.password = "Password is required";
      else if (loginForm.password.length < 6)
        errors.password = "Password must be at least 6 characters";

      setLoginErrors(errors);

      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        try {
          await authService.login({
            email: loginForm.email,
            password: loginForm.password,
          });
          window.location.href = "/profile";
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Login failed. Please try again."
          );
        } finally {
          setIsLoading(false);
        }
      }
    },
    [loginForm]
  );

  const handleSignupSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const errors: FormErrors = {};

      if (!signupForm.fullName) errors.fullName = "Full name is required";
      if (!signupForm.email) errors.email = "Email is required";
      else if (!validateEmail(signupForm.email))
        errors.email = "Invalid email format";

      if (!signupForm.password) errors.password = "Password is required";
      else if (signupForm.password.length < 6)
        errors.password = "Password must be at least 6 characters";

      if (!signupForm.confirmPassword)
        errors.confirmPassword = "Please confirm your password";
      else if (signupForm.password !== signupForm.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      setSignupErrors(errors);

      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        try {
          window.location.href = "/api/auth/signup";
        } catch (err) {
          setError("Signup failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [signupForm]
  );

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      window.location.href = "/api/auth/login?connection=google-oauth2";
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <motion.div
            className="flex items-center justify-center mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Image
              src="/pawicon.png"
              width={50}
              height={50}
              alt="PupSpot Logo"
              className="h-8 w-8"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold text-blue-600">
              PupSpot
            </CardTitle>
            <p className="text-gray-600">The Social Platform for Dogs 🐶</p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="login">
                <LoginForm
                  form={loginForm}
                  errors={loginErrors}
                  isLoading={isLoading}
                  onSubmit={handleLoginSubmit}
                  onChange={handleLoginChange}
                  onGoogleLogin={handleGoogleLogin}
                />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm
                  form={signupForm}
                  errors={signupErrors}
                  isLoading={isLoading}
                  onSubmit={handleSignupSubmit}
                  onChange={handleSignupChange}
                  onGoogleLogin={handleGoogleLogin}
                />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthPages;
