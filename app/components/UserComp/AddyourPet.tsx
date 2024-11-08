"use client"
import { useState } from "react";
import clsx from "clsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
      .required('please enter name'),
    height: Yup.number()
      .required('please enter height')
      .positive('correct height'),
    weight: Yup.string()
      .required('please enter weight'),
    breed: Yup.string()
      .required('please enter breed'),
    avatar: Yup.mixed()
      .required('upload a photo!!')
  
  });

export default function AddyourPet(){
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
    
        formData.append('name', values.name);
        formData.append('height', values.height);
        formData.append('weight', values.weight);
        formData.append('breed', values.breed);
    
        if (values.avatar) {
          formData.append('avatar', values.avatar); // Attach the avatar file
        }
    
        console.log(formData)
      };
    
    return(
        <div className="flex items-center text-black justify-center flex-col">
            <h1 className="bfont-sans font-bold text-2xl">Now lets add your pet.........</h1>
         <div className="w-full max-w-sm p-8 space-y-4 shadow-lg rounded-md">
          <Formik
            initialValues={{
              name: '',
              height: '',
              weight: '',
              breed: '',
              avatar: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">name</label>
                  <Field
                    type="text"
                    name="name"
                    className={clsx(
                      'w-full px-3 py-2 border text-black rounded-md',
                      'focus:outline-none focus:ring-2 focus:ring-blue-400'
                    )}
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">height</label>
                  <Field
                    type="number"
                    name="height"
                    className={clsx(
                      'w-full px-3 py-2 text-black border rounded-md',
                      'focus:outline-none focus:ring-2 focus:ring-blue-400'
                    )}
                  />
                  <ErrorMessage name="height" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Breed</label>
                  <Field
                    type="text"
                    name="breed"
                    className={clsx(
                      'w-full px-3 py-2 text-black border rounded-md',
                      'focus:outline-none focus:ring-2 focus:ring-blue-400'
                    )}
                  />
                  <ErrorMessage name="breed" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">weight</label>
                  <Field
                    type="text"
                    name="weight"
                    className={clsx(
                      'w-full px-3 py-2 text-black border rounded-md',
                      'focus:outline-none focus:ring-2 focus:ring-blue-400'
                    )}
                  />
                  <ErrorMessage name="weight" component="div" className="text-red-500 text-sm" />
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
                  Add...
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
}