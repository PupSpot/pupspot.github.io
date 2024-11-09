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
                                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                                    <div>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Name:</strong> {user.name}
                                        </p>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Age:</strong> {user.age} years
                                        </p>
                                        <p className="text-blue-600">
                                            <strong className="text-gray-500">Email:</strong> {user.email}
                                        </p>
                                    </div>
                                    <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center rounded-full bg-gray-200 border-4 border-blue-500">
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
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
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
                                        <div className="relative inline-block cursor-pointer w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center rounded-full bg-gray-200 border-4 border-blue-500">
                                            <Image
                                                src="https://thumbs.dreamstime.com/b/connecting-natural-world-elements-cycles-nature-to-experience-sacredness-beauty-oneness-all-living-beings-t-321314003.jpg"
                                                alt={pet.name}
                                                width={400}
                                                height={400}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    </ModalTrigger>
                                    <ModalBody className="py-6 px-4 space-y-4">
                                        <div className="flex flex-col md:flex-row md:justify-between">
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
                                            <div className="flex justify-center mt-4 md:mt-0 md:w-[200px]">
                                                <Image
                                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
                                                    alt={pet.name}
                                                    width={200}
                                                    height={200}
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            className="mt-4 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                                            onClick={() => router.push('/settings/pets')}
                                        >
                                            Edit Details...
                                        </Button>
                                    </ModalBody>
                                </Modal>
                            ))
                        ) : (
                            <p>No pets found.</p>
                        )}
                    </CardContent>
                </Card>

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
