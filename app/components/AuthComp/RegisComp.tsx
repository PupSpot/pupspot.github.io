"use client"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useState } from 'react';
import { Modal,ModalBody,ModalContent,ModalTrigger } from '../ui/animated-modal';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .required('Password is required.'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long.')
    .required('Username is required.'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long.')
    .required('Full name is required.'),
  avatar: Yup.mixed()
    .required('Avatar is required.')

});

export default function RegisterBtn() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Handle avatar file change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set the file in Formik's state
      setFieldValue('avatar', file);

      // Show image preview
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('username', values.username);
    formData.append('fullName', values.fullName);

    if (values.avatar) {
      formData.append('avatar', values.avatar); // Attach the avatar file
    }

    console.log(formData)
  };

  return (
    <Modal>
        <ModalTrigger>
                <div className="text-black" >Register</div>
        </ModalTrigger>
        <ModalBody>
            <ModalContent className='bg-white'>
                <div className="flex items-center text-black justify-center">
                  <div className="w-full max-w-sm p-8 space-y-4 shadow-lg rounded-md">
                    <h2 className="text-2xl font-bold text-center">Register</h2>
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                        username: '',
                        fullName: '',
                        avatar: null,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue }) => (
                        <Form className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium">Email</label>
                            <Field
                              type="email"
                              name="email"
                              className={clsx(
                                'w-full px-3 py-2 border text-black rounded-md',
                                'focus:outline-none focus:ring-2 focus:ring-blue-400'
                              )}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Password</label>
                            <Field
                              type="password"
                              name="password"
                              className={clsx(
                                'w-full px-3 py-2 text-black border rounded-md',
                                'focus:outline-none focus:ring-2 focus:ring-blue-400'
                              )}
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Username</label>
                            <Field
                              type="text"
                              name="username"
                              className={clsx(
                                'w-full px-3 py-2 text-black border rounded-md',
                                'focus:outline-none focus:ring-2 focus:ring-blue-400'
                              )}
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <Field
                              type="text"
                              name="fullName"
                              className={clsx(
                                'w-full px-3 py-2 text-black border rounded-md',
                                'focus:outline-none focus:ring-2 focus:ring-blue-400'
                              )}
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Avatar</label>
                            <input
                              type="file"
                              name="avatar"
                              accept="image/png, image/jpeg"
                              onChange={(e) => handleAvatarChange(e, setFieldValue)}
                              className={clsx(
                                'w-full px-3 py-2 border text-black rounded-md',
                                'focus:outline-none focus:ring-2 focus:ring-blue-400'
                              )}
                            />
                            <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm" />
                            {avatarPreview && (
                              <div className="mt-2">
                                <img src={avatarPreview} alt="Avatar preview" className="w-32 h-32 object-cover rounded-full" />
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className={clsx(
                              'w-full py-2 text-white bg-blue-500 rounded-md',
                              'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            )}
                          >
                            Register
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
            </ModalContent>
        </ModalBody>

    </Modal>
  );
}
