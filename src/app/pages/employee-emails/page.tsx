'use client'

import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const ContactForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      contacts: [{ name: '', email: '' }] // Initial field array with one item
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts' // The name of the field array
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Contact List</h2>

      {/* Render contact fields dynamically */}
      {fields.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <Controller
            control={control}
            name={`contacts.${index}.name`}
            defaultValue={item.name}
            render={({ field }) => <input {...field} placeholder="Enter Name" />}
          />
          {/* <p>item, index: {item.id}, {index}</p> */}  {/**HAVING THIS CAUSES ERRORS,BUT IT SHOWS DETAILS */}

          <br />

          <label>Email: </label>
          <Controller
            control={control}
            name={`contacts.${index}.email`}
            defaultValue={item.email}
            render={({ field }) => <input {...field} placeholder="Enter Email" />}
          />

          <button type="button" onClick={() => remove(index)} style={{ marginLeft: '10px' }}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ name: '', email: '' }) // Append a new blank contact
        }
        style={{ marginTop: '10px' }}
      >
        Add Contact
      </button>

      <div style={{ marginTop: '20px' }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;