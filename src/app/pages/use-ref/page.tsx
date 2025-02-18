'use client'

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

// const MyForm = () => {
//   const { register, handleSubmit, getValues } = useForm();
//   const inputRef = useRef('');

//   const onSubmit = (data: any) => {
//     console.log("Form data submitted:", data);
//   };

//   // Function to get the value directly from the DOM via useRef
//   const getInputValue = () => {
//     console.log("Input value via useRef:", inputRef.current);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="ex1">Example Input:</label>
//           <input
//             id="ex1"
//             name="ex1"
//             type="text"
//             ref={(e: any) => {
//               // React Hook Form register and custom ref using useRef
//               register(e);
//               inputRef.current = e; // Assigning to useRef directly
//             }}
//           />
//         </div>
        
//         <button type="button" onClick={getInputValue}>Get Input Value from useRef</button>
//         <button type="submit">Submit</button>
//       </form>

//       <p>Form Value (using getValues): {getValues('ex1')}</p>
//     </div>
//   );
// };


// import React, { useRef } from 'react';

//=====================================================================================================WORKING
// function MyComponent() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const inputCheckboxRef = useRef<HTMLInputElement>(null);

//   const handleFocus = () => {
//     // Focus the input element
//     inputRef.current?.focus(); // Use optional chaining for safety
//   };

//   const handleChangeValue = () => {
//     // Assert that inputRef.current is not null
//     inputRef.current!.value = "New value!";  // Use `!` to assert non-null value
//     inputCheckboxRef.current!.checked = false;
//   };

//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <br />
//       <input ref={inputCheckboxRef} type="checkbox" />
//       <br />
//       <button onClick={handleFocus}>Focus on Input</button>
//       <br />
//       <button onClick={handleChangeValue}>Change Input Value And Untick checkbox</button>
//     </div>
//   );
// }

// export default MyComponent;
//=============================================================================================================


//===============================================================================================WORKING=======
export default function App() {
  const { register, handleSubmit } = useForm();
  //const firstNameRef = useRef<HTMLInputElement>(null);
  //   const firstNameRef = useRef(null) // @ts-ignore
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const checkboxUseRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = (data: any) => console.log(data);
  const { ref: textRef, ...rest } = register('firstName');
  const { ref: checkboxRef, ...rest1 } = register('checkboxEg')

  function handleButtonClick(){
    //firstNameRef.current? firstNameRef.current.value = "New value" : firstNameRef.current = null
    if (firstNameRef.current && checkboxUseRef.current){
        firstNameRef.current.value = "New value"
        checkboxUseRef.current.checked = false
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...rest} name="firstName" ref={(e: any) => {
            textRef(e)
            firstNameRef.current = e // you can still assign to ref
        }} />
        <input type="checkbox" {...rest} name="checkboxEg" ref={(e: any) => {
            checkboxRef(e)
            checkboxUseRef.current = e // you can still assign to ref
        }} />

        <button>Submit</button>
        </form>
        <br />
        <button onClick={handleButtonClick}>Set new value</button>
    </>
  );
}
//================================================================================================================