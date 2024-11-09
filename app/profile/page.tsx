'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Plus, Edit, ArrowLeft } from 'lucide-react'; // Import the Plus and Edit icons

interface UserProfile {
    id: number;
    name: string;
    email: string;
    age: number;
    avatarUrl: string;
}

const user2 = {
    id: 1,
    name: "arka",
    email: "arka@1234",
    age: 12,
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrT_BjEyf_LEpcvb225JX2qFCJcLz5-0RXLg&s"
};

interface PetProfile {
    id: number;
    name: string;
    breed: string;
    age: number;
    weight: string;
}

const pets2 = [
    { id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, weight: "30kg" },
    { id: 2, name: "Milo", breed: "Labrador", age: 5, weight: "28kg" }
];

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [pets, setPets] = useState<PetProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                // Mock fetching data
                setUser(user2);
                setPets(pets2);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-3xl mx-auto">
            <Button
                    variant="ghost"
                    className="mb-4"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user && (
                            <>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Age:</strong> {user.age}</p>
                                    </div>
                                    <Image
                                        src={user.avatarUrl}
                                        alt="User Avatar"
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <Button
                                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                                    onClick={() => router.push('/settings/user')}
                                >
                                    Edit Profile
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Pet Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <Card key={pet.id} className="mb-4 relative group">
                                    <CardContent>
                                        <p><strong>Name:</strong> {pet.name}</p>
                                        <p><strong>Breed:</strong> {pet.breed}</p>
                                        <p><strong>Age:</strong> {pet.age}</p>
                                        <p><strong>Weight:</strong> {pet.weight}</p>
                                    </CardContent>

                                    {/* Pencil Icon appears on hover */}
                                    <Button
                                        className="absolute top-2 right-2 invisible group-hover:visible bg-transparent p-2"
                                        onClick={() => router.push(`/settings/pets`)}
                                    >
                                        <Edit className="h-6 w-6 text-blue-600" />
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <p>No pets found.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Add Pet Button */}
                <div className="fixed bottom-4 right-4">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => router.push('/pets')}
                        className="rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-4 shadow-lg"
                    >
                        <Plus className="h-8 w-8 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
