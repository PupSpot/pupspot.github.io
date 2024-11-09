'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Plus, Edit, ArrowLeft } from 'lucide-react';
import { Modal, ModalBody, ModalTrigger } from '@/components/ui/animated-modal';

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
    avatar: string;
}

const pets2 = [
    { id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, weight: "30kg", avatar: "https://placekitten.com/200/200" },
    { id: 2, name: "Milo", breed: "Labrador", age: 5, weight: "28kg", avatar: "https://placekitten.com/201/201" }
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
                        <CardTitle className="text-2xl text-blue-600 font-bold">User Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user && (
                            <>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Name</strong> {user2.name}
                                        </p>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Age:</strong> {user2.age} years
                                        </p>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Email:</strong> {user2.email}
                                        </p>
                                    </div>
                                    <div className="relative w-[100px] h-[100px] flex items-center justify-center rounded-full bg-gray-200 border-4 border-blue-500">
                                        <Image
                                            src={user.avatarUrl}
                                            alt="User Avatar"
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
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
                        <CardTitle className="text-2xl text-blue-500 font-bold">Pet Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <Modal key={pet.id}>
                                    <ModalTrigger>
                                        {/* Circle-styled avatar with background border */}
                                        <div className="relative inline-block cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-full bg-gray-200 border-4 border-blue-500">
                                            <Image
                                                src="https://img.freepik.com/premium-photo/wallpaper-illustration_1137879-189707.jpg"
                                                alt={pet.name}
                                                width={200}
                                                height={200}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    </ModalTrigger>
                                    <ModalBody className='py-6 px-4'>
                                        <div className="flex flex-row justify-between space-y-4">
                                            <div>
                                                <h3 className="text-xl text-blue-700 font-bold">{pet.name}</h3>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Breed:</strong> {pet.breed}
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Age:</strong> {pet.age} years
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Weight:</strong> {pet.weight}
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Height:</strong> height
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Gender:</strong> gender
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Friendliness:</strong> friendliness
                                                </p>
                                                <p className="text-blue-600">
                                                    <strong className="text-gray-500">Energy Level:</strong> energy level
                                                </p>
                                            </div>
                                            <div className='py-5 px-4'>
                                                <div className="relative w-[400px] h-[400px] flex items-center justify-center rounded-full bg-gray-200 border-4 border-blue-500">
                                                    <Image
                                                        src="https://img.freepik.com/premium-photo/wallpaper-illustration_1137879-189707.jpg"
                                                        alt={pet.name}
                                                        width={400}
                                                        height={400}
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </Modal>
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
