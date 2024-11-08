'use client';

import React, { useState, useCallback, memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from "next/image";

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

// eslint-disable-next-line react/display-name
const LoginForm = memo(({ form, errors, isLoading, onSubmit, onChange, onGoogleLogin }: FormProps<LoginFormState>) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="email"
                    type="email"
                    placeholder="bark@pupspot.com"
                    className="pl-8"
                    value={form.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
            </div>
            {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
            )}
        </div>

        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8"
                    value={form.password}
                    onChange={(e) => onChange('password', e.target.value)}
                />
            </div>
            {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
            )}
        </div>

        <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                or continue with
            </span>
        </div>

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
    </form>
));

// eslint-disable-next-line react/display-name
const SignupForm = memo(({ form, errors, isLoading, onSubmit, onChange, onGoogleLogin }: FormProps<SignupFormState>) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="pl-8"
                    value={form.fullName}
                    onChange={(e) => onChange('fullName', e.target.value)}
                />
            </div>
            {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
        </div>

        <div className="space-y-2">
            <Label htmlFor="signupEmail">Email</Label>
            <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="signupEmail"
                    type="email"
                    placeholder="bark@pupspot.com"
                    className="pl-8"
                    value={form.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
            </div>
            {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
            )}
        </div>

        <div className="space-y-2">
            <Label htmlFor="signupPassword">Password</Label>
            <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8"
                    value={form.password}
                    onChange={(e) => onChange('password', e.target.value)}
                />
            </div>
            {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
            )}
        </div>

        <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8"
                    value={form.confirmPassword}
                    onChange={(e) => onChange('confirmPassword', e.target.value)}
                />
            </div>
            {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
        </div>

        <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
        >
            {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                or continue with
            </span>
        </div>

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
    </form>
));

const AuthPages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginForm, setLoginForm] = useState<LoginFormState>({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState<SignupFormState>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loginErrors, setLoginErrors] = useState<FormErrors>({});
    const [signupErrors, setSignupErrors] = useState<FormErrors>({});

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleLoginChange = useCallback((field: keyof LoginFormState, value: string) => {
        setLoginForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSignupChange = useCallback((field: keyof SignupFormState, value: string) => {
        setSignupForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleLoginSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const errors: FormErrors = {};

        if (!loginForm.email) errors.email = 'Email is required';
        else if (!validateEmail(loginForm.email)) errors.email = 'Invalid email format';

        if (!loginForm.password) errors.password = 'Password is required';
        else if (loginForm.password.length < 6) errors.password = 'Password must be at least 6 characters';

        setLoginErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Login submitted:', loginForm);
            } catch (err) {
                setError('Login failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [loginForm]);

    const handleSignupSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const errors: FormErrors = {};

        if (!signupForm.fullName) errors.fullName = 'Full name is required';
        if (!signupForm.email) errors.email = 'Email is required';
        else if (!validateEmail(signupForm.email)) errors.email = 'Invalid email format';

        if (!signupForm.password) errors.password = 'Password is required';
        else if (signupForm.password.length < 6) errors.password = 'Password must be at least 6 characters';

        if (!signupForm.confirmPassword) errors.confirmPassword = 'Please confirm your password';
        else if (signupForm.password !== signupForm.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setSignupErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Signup submitted:', signupForm);
            } catch (err) {
                setError('Signup failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [signupForm]);

    const handleGoogleLogin = useCallback(async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Google login initiated');
        } catch (err) {
            setError('Google login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-2">
                        <Image
                            src="/favicon.webp"
                            alt="PupSpot Logo"
                            className="h-8 w-8"
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-600">PupSpot</CardTitle>
                    <p className="text-gray-600">The Social Platform for Dogs 🐶</p>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Tabs defaultValue="login" className="space-y-4">
                        <TabsList className="grid grid-cols-2 w-full">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
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
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthPages;