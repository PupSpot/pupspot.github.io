'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface PetFormState {
    name: string;
    breed: string;
    age: string;
    weight: string;
    gender: string;
    size: string;
    energyLevel: string;
    friendliness: string;
    description: string;
    vaccinated: boolean;
    spayedNeutered: boolean;
}

interface FormErrors {
    name?: string;
    breed?: string;
    age?: string;
    weight?: string;
    gender?: string;
    size?: string;
    energyLevel?: string;
    friendliness?: string;
    description?: string;
}

const AddPetPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [petPhoto, setPetPhoto] = useState<string | null>(null);
    const [petForm, setPetForm] = useState<PetFormState>({
        name: '',
        breed: '',
        age: '',
        weight: '',
        gender: '',
        size: '',
        energyLevel: '',
        friendliness: '',
        description: '',
        vaccinated: false,
        spayedNeutered: false
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
        if (!petForm.name.trim()) errors.name = 'Pet name is required';
        if (!petForm.breed.trim()) errors.breed = 'Breed is required';
        if (!petForm.age.trim()) errors.age = 'Age is required';
        if (!petForm.weight.trim()) errors.weight = 'Weight is required';
        if (!petForm.gender) errors.gender = 'Gender is required';
        if (!petForm.size) errors.size = 'Size is required';
        if (!petForm.energyLevel) errors.energyLevel = 'Energy level is required';
        if (!petForm.friendliness) errors.friendliness = 'Friendliness level is required';
        if (!petForm.description.trim()) errors.description = 'Description is required';
        return errors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPetForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: keyof PetFormState, value: string) => {
        setPetForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggleChange = (name: keyof PetFormState) => {
        setPetForm(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Pet profile submitted:', petForm);
                // Redirect to pet profile or dashboard
            } catch (err) {
                setError('Failed to add pet. Please try again.');
            } finally {
                setIsLoading(false);
            }
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
                        <CardTitle className="text-2xl font-bold text-blue-600">Add Your Pet</CardTitle>
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
                                            <img
                                                src={petPhoto}
                                                alt="Pet preview"
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
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setPetPhoto(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Pet's Name*</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={petForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Max"
                                    />
                                    {formErrors.name && (
                                        <p className="text-sm text-red-500">{formErrors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="breed">Breed*</Label>
                                    <Input
                                        id="breed"
                                        name="breed"
                                        value={petForm.breed}
                                        onChange={handleInputChange}
                                        placeholder="Golden Retriever"
                                    />
                                    {formErrors.breed && (
                                        <p className="text-sm text-red-500">{formErrors.breed}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="age">Age*</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={petForm.age}
                                        onChange={handleInputChange}
                                        placeholder="2"
                                    />
                                    {formErrors.age && (
                                        <p className="text-sm text-red-500">{formErrors.age}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (lbs)*</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        value={petForm.weight}
                                        onChange={handleInputChange}
                                        placeholder="45"
                                    />
                                    {formErrors.weight && (
                                        <p className="text-sm text-red-500">{formErrors.weight}</p>
                                    )}
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender*</Label>
                                    <Select
                                        onValueChange={(value) => handleSelectChange('gender', value)}
                                        value={petForm.gender}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors.gender && (
                                        <p className="text-sm text-red-500">{formErrors.gender}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="size">Size*</Label>
                                    <Select
                                        onValueChange={(value) => handleSelectChange('size', value)}
                                        value={petForm.size}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Small (0-20 lbs)</SelectItem>
                                            <SelectItem value="medium">Medium (21-50 lbs)</SelectItem>
                                            <SelectItem value="large">Large (51-90 lbs)</SelectItem>
                                            <SelectItem value="xlarge">Extra Large (90+ lbs)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors.size && (
                                        <p className="text-sm text-red-500">{formErrors.size}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="energyLevel">Energy Level*</Label>
                                    <Select
                                        onValueChange={(value) => handleSelectChange('energyLevel', value)}
                                        value={petForm.energyLevel}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select energy level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="very-high">Very High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors.energyLevel && (
                                        <p className="text-sm text-red-500">{formErrors.energyLevel}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="friendliness">Friendliness*</Label>
                                    <Select
                                        onValueChange={(value) => handleSelectChange('friendliness', value)}
                                        value={petForm.friendliness}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select friendliness level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="shy">Shy with new friends</SelectItem>
                                            <SelectItem value="selective">Selective with friends</SelectItem>
                                            <SelectItem value="friendly">Friendly with most</SelectItem>
                                            <SelectItem value="very-friendly">Very friendly with all</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors.friendliness && (
                                        <p className="text-sm text-red-500">{formErrors.friendliness}</p>
                                    )}
                                </div>
                            </div>

                            {/* Health Information */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="vaccinated">Vaccinated</Label>
                                    <Switch
                                        id="vaccinated"
                                        checked={petForm.vaccinated}
                                        onCheckedChange={() => handleToggleChange('vaccinated')}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="spayedNeutered">Spayed/Neutered</Label>
                                    <Switch
                                        id="spayedNeutered"
                                        checked={petForm.spayedNeutered}
                                        onCheckedChange={() => handleToggleChange('spayedNeutered')}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Tell us about your pet*</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={petForm.description}
                                    onChange={handleInputChange}
                                    placeholder="Share your pet's personality, favorite activities, and what makes them special..."
                                    className="h-32"
                                />
                                {formErrors.description && (
                                    <p className="text-sm text-red-500">{formErrors.description}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding Pet...' : 'Add Pet'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddPetPage;