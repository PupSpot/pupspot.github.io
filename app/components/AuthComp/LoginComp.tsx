"use client"
import { Modal, ModalContent, ModalBody, ModalTrigger } from "../../../components/ui/animated-modal"
import { useState } from 'react';
import clsx from 'clsx';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup schema for validation
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
});

const handlesubmit=async(value:object)=>{
    console.log("this is handlesubmit")
}

export default function LoginBtn() {
    return (
    <Modal >
            <ModalTrigger>
                <div className="text-black">Login</div>
            </ModalTrigger>
         
    <ModalBody>
        <ModalContent className="bg-black">     {/* dark theme here for background over all */}
            <div className="flex items-center text-white justify-center">      {/* //darktheme text*/}
                <div className="w-full max-w-sm p-8 space-y-4 shadow-lg rounded-md">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('Form submitted with values:', values);
                            handlesubmit(values)
                        }}
                    >
                        {() => (
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
                                <button
                                    type="submit"
                                    className={clsx(
                                        'w-full py-2 text-white bg-blue-500 rounded-md',
                                        'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    )}
                                >
                                    Login
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </ModalContent>
    </ModalBody>
    </Modal>
    )
}
