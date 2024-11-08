// pages/profile.tsx (for Next.js)
"use client"
import { useEffect, useState } from 'react';
import clsx from 'clsx';



const ProfilePage = () => {
    const user ={
        "avatar": "https://example.com/avatar.jpg",
        "email": "user@example.com",
        "username": "user123",
        "fullName": "John Doe",
        "bio": "This is a short bio about the user.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis unde esse repudiandae neque at placeat iste soluta necessitatibus incidunt adipisci? Labore corrupti soluta officia reprehenderit illum provident, perspiciatis magnam. Ea rerum ab fuga iure dolor perferendis id magni repellat doloremque numquam impedit, at, a laudantium quam beatae ut atque soluta culpa perspiciatis sapiente dolorem saepe eaque! Laboriosam similique temporibus hic repudiandae illum doloremque fugit."
      }
      
    return (
        <div className="flex flex-col justify-center items-center  bg-gray-50">
            <div className=" w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center">
                    <img
                        src={user.avatar }
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
                    />
                    <h2 className="text-3xl font-bold mt-4">{user.fullName}</h2>
                    <p className="text-xl text-gray-600">{user.username}</p>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Owner Details</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span>{user.email}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Username:</span>
                            <span>{user.username}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Full Name:</span>
                            <span>{user.fullName}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Bio:</span>
                            <span>{user.bio || 'No bio provided'}</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-8 text-center">
                </div>
            </div>

            <div className= " w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center">
                    <img
                        src={user.avatar || '/default-avatar.png'} // Fallback to default avatar if not available
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
                    />
                    <h2 className="text-3xl font-bold mt-4">{user.fullName}</h2>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Pet Details</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Name:</span>
                            <span>{user.email}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Height:</span>
                            <span>{user.username}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Weight:</span>
                            <span>{user.fullName}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-medium text-gray-600">Breed:</span>
                            <span>{user.fullName}</span>
                        </li>
                    </ul>
                </div>
                    <button
                        className={clsx(
                            'py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg',
                            'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        )}
                        onClick={() => alert('Edit Profile clicked!')}
                    >
                        Edit Profile
                    </button>
            </div>

        </div>
    );
};

export default ProfilePage;
