'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const BurgerCustomizer = () => {
  const { control, handleSubmit, setValue, watch, reset } = useForm();
  const toppings = ['lettuce', 'tomato', 'chili'];

  const onSubmit = (data: any) => {
    // Formatting the data to an array of selected toppings with grams
    const formattedData = toppings
      .filter(topping => data[topping])  // Only include selected toppings
      .map(topping => ({
        topping,
        grams: data[`${topping}Grams`] || 0,  // Default grams to 0 if not provided
      }));

    // Log the final array
    console.log(formattedData);
    reset({
        lettuce: false
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {toppings.map((topping) => (
        <div key={topping}>
          {/* Controller for the checkbox */}
          <Controller
            name={topping}
            control={control}
            render={({ field }) => (
              <>
                <input
                    type="checkbox"
                    {...field}
                    id={topping}
                    onChange={(e) => {
                        field.onChange(e.target.checked); // Toggle checkbox state
                        // If unchecked, reset grams field to empty
                        if (!e.target.checked) {
                        setValue(`${topping}Grams`, '');  // Clear grams input
                        }
                    }}
                />
                {topping}
                
                {/* Conditionally show grams input field if checkbox is checked */}
                {field.value && (
                  <div>
                    <Controller
                      name={`${topping}Grams`}
                      control={control}
                      defaultValue=""  // Set default value to empty string
                      render={({ field: gramsField }) => (
                        <input
                          type="number"
                          placeholder="Grams"
                          {...gramsField}  // Spread the Controller field for the input
                          onChange={(e) => gramsField.onChange(e.target.value)} // Correctly update the value
                        />
                      )}
                    />
                  </div>
                )}
              </>
            )}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BurgerCustomizer;

// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';

// const BurgerCustomizer = () => {
//   const [toppings, setToppings] = useState<string []>([]);
  
//   // Fetching dynamic toppings (this is just an example, adapt it to your actual fetching method)
//   useEffect(() => {
//     // Simulate fetching toppings data
//     setToppings(['lettuce', 'tomato', 'chili']); // This can come from an API
//   }, []);

//   const { control, handleSubmit, reset, setValue, watch } = useForm();
  
//   // Generate initial values for checkboxes and grams dynamically
//   const generateInitialValues = () => {
//     const initialValues = {};
//     toppings.forEach(topping => {
//       initialValues[topping] = false;  // Initial state for checkboxes (unchecked)
//       initialValues[`${topping}Grams`] = '';  // Initial state for grams (empty string)
//     });
//     return initialValues;
//   };

//   const onSubmit = (data: any) => {
//     const formattedData = toppings
//       .filter(topping => data[topping])  // Only include selected toppings
//       .map(topping => ({
//         topping,
//         grams: data[`${topping}Grams`] || 0,  // Default grams to 0 if not provided
//       }));

//     console.log(formattedData);

//     // Reset form with default values
//     reset(generateInitialValues());
//   };

//   useEffect(() => {
//     // Set the initial values for the form when the toppings data is available
//     if (toppings.length > 0) {
//       reset(generateInitialValues());
//     }
//   }, [toppings, reset]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {toppings.map((topping) => (
//         <div key={topping}>
//           {/* Controller for the checkbox */}
//           <Controller
//             name={topping}
//             control={control}
//             render={({ field }) => (
//               <>
//                 <label>
//                   <input
//                     type="checkbox"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e.target.checked); // Toggle checkbox state
//                       // If unchecked, reset grams field to empty
//                       if (!e.target.checked) {
//                         setValue(`${topping}Grams`, ''); // Reset grams input
//                       }
//                     }}
//                   />
//                   {topping}
//                 </label>
                
//                 {/* Conditionally show grams input field if checkbox is checked */}
//                 {field.value && (
//                   <div>
//                     <Controller
//                       name={`${topping}Grams`}
//                       control={control}
//                       defaultValue=""  // Set default value to empty string
//                       render={({ field: gramsField }) => (
//                         <input
//                           type="number"
//                           placeholder="Grams"
//                           {...gramsField}
//                           onChange={(e) => gramsField.onChange(e.target.value)} // Correctly update the value
//                         />
//                       )}
//                     />
//                   </div>
//                 )}
//               </>
//             )}
//           />
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default BurgerCustomizer;
