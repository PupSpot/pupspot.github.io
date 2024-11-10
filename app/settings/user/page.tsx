/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Image from "next/image";

interface UserProfileSettingsState {
    name: string;
    email: string;
    age: string;
    avatarUrl: string | null;
    password: string;
}

const ProfileSettingsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [avatarImage, setAvatarImage] = useState<File | null>(null);
    const [profileSettings, setProfileSettings] = useState<UserProfileSettingsState>({
        name: '',
        email: '',
        age: '',
        avatarUrl: null,
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility toggle

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const data = {
                    name: "arka",
                    email: "email@12",
                    password: "1234",
                    age: "12",
                    avatarUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
                };

                setProfileSettings({
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    avatarUrl: data.avatarUrl,
                    password: '' // Leave password blank for security
                });
            } catch (err) {
                setError('Failed to load profile data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (profileSettings.password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', profileSettings.name);
            formData.append('email', profileSettings.email);
            formData.append('age', profileSettings.age);
            formData.append('password', profileSettings.password);

            if (avatarImage) {
                formData.append('avatar', avatarImage);
            }

            console.log('Profile settings updated successfully:', profileSettings);
            console.log("data to be sent", formData);
        } catch (err) {
            setError('Failed to update profile settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto">
                <Button
                    variant="ghost"
                    className="mb-4"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-blue-600">Change Your Profile Information :</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                        {avatarImage ? (
                                            <Image
                                                src={URL.createObjectURL(avatarImage)}
                                                alt="Avatar preview"
                                                width={128}
                                                height={128}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            profileSettings.avatarUrl ? (
                                                <Image
                                                    src={profileSettings.avatarUrl}
                                                    alt="Avatar"
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <Camera className="h-8 w-8 text-gray-400" />
                                            )
                                        )}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="absolute bottom-0 right-0 rounded-full"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>

                            {['name', 'email', 'age'].map((field) => (
                                <div className="space-y-2" key={field}>
                                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        name={field}
                                        value={(profileSettings as any)[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}

                            <div className="space-y-2 relative">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={profileSettings.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter a new password"
                                />
                                <Button
                                    type="button"
                                    className="absolute right-2 top-2/3 transform -translate-y-2/3"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2 relative">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter the new password"
                                />
                                <Button
                                    type="button"
                                    className="absolute right-2 top-2/3 transform -translate-y-2/3"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    {confirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileSettingsPage;
