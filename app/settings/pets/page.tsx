/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, ArrowLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Image from "next/image";

interface PetSettingsState {
    name: string;
    breed: string;
    age: string;
    weight: string;
    gender: string;
    energyLevel: string;
    friendliness: string;
    description: string;
    vaccinated: boolean;
    spayedNeutered: boolean;
}
const SettingsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [petPhoto, setPetPhoto] = useState<File | null>(null);
    const [petSettings, setPetSettings] = useState<PetSettingsState>({
        name: 'Max',
        breed: '',
        age: '',
        weight: '',
        gender: '',
        energyLevel: '',
        friendliness: '',
        description: 'A friendly and playful dog.',
        vaccinated: false,
        spayedNeutered: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPetSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPetPhoto(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', petSettings.name);
            formData.append('breed', petSettings.breed);
            formData.append('age', petSettings.age);
            formData.append('weight', petSettings.weight);
            formData.append('gender', petSettings.gender);
            formData.append('energyLevel', petSettings.energyLevel);
            formData.append('friendliness', petSettings.friendliness);
            formData.append('description', petSettings.description);
            formData.append('vaccinated', String(petSettings.vaccinated));
            formData.append('spayedNeutered', String(petSettings.spayedNeutered));

            if (petPhoto) {
                formData.append('avatar', petPhoto);
            }

            console.log('Pet settings updated successfully:', petSettings);
            console.log("data to be send", formData)
        } catch (err) {
            setError('Failed to update pet settings. Please try again.');
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
                        <CardTitle className="text-2xl font-bold text-blue-600">Change Your Pet Information :</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Pet Photo Upload */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                        {petPhoto ? (
                                            <Image
                                                src={URL.createObjectURL(petPhoto)}
                                                alt="Pet preview"
                                                width={128}
                                                height={128}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <Camera className="h-8 w-8 text-gray-400" />
                                        )}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="absolute bottom-0 right-0 rounded-full"
                                        onClick={() => document.getElementById('photo-upload')?.click()}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </div>

                            {/* Pet Details */}
                            {['name', 'breed', 'age', 'weight', 'gender', 'energyLevel', 'friendliness'].map((field) => (
                                <div className="space-y-2" key={field}>
                                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        name={field}
                                        value={(petSettings as any)[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Tell us about your pet</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={petSettings.description}
                                    onChange={handleInputChange}
                                    className="h-32"
                                />
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

export default SettingsPage;
