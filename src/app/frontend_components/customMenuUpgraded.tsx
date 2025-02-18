// "use client";

// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// const menuItems = ["Carbs", "Proteins", "Minerals"] as const;

// type PortionSize = "s" | "m" | "l";
// type DriedOrWet = "dry" | "wet";

// type MenuData = {
//     portion: PortionSize;
//     driedOrWet: DriedOrWet;
//     saltPercentage: number;
// };

// export default function CustomMenu() {
//     const [selectedItem, setSelectedItem] = useState<(typeof menuItems)[number]>("Carbs");
//     const [currentFormVals, setCurrentFormVals] = useState<MenuData>({ portion: "m", driedOrWet: "dry", saltPercentage: 0 })
//     const [formValues, setFormValues] = useState<{ [key: string]: MenuData }>(
//         Object.fromEntries(
//             menuItems.map((item) => [
//                 item,
//                 { portion: "m", driedOrWet: "dry", saltPercentage: 0 },
//             ])
//         )
//     );

//     const { register, handleSubmit, control, watch, reset } = useForm<MenuData>();

//     // Handle switching between menu items and retain values
//     const handleItemChange = (item: (typeof menuItems)[number]) => {
//         // console.log(`==============item: ${item}================`)
//         // console.log(`==============selectedItem: ${selectedItem}================`)
//         // console.log(formValues)
//         const currentValues = watch();
//         // console.log(`==============currentValues: ${JSON.stringify(currentValues)}================`)

//         setFormValues((prev) => ({
//             ...prev,
//             [selectedItem]: currentValues
//         })) // Save previous item values);

//         console.log(formValues)
//         setSelectedItem(item);
//         setCurrentFormVals(formValues[item]);
//         reset(formValues[item]); // Restore values for new selected item
//         // reset(formValues[item]); // Restore values for new selected item
//         // console.log(watch())
//     };

//     // Handle form submission
//     const onSubmit = (data: MenuData) => {
//         const finalData = {
//             ...formValues,
//             [selectedItem]: data, // Ensure latest selected item values are included
//         };

//         const resultArray = menuItems.map((item) => ({
//             [item]: finalData[item],
//         }));

//         console.log("Final Submitted Data:", resultArray);
//         alert(JSON.stringify(resultArray, null, 2));
//     };

//     useEffect(() => {

//     }, [formValues])

//     return (
//         <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             {/* Menu Navigation */}
//             <div className="flex justify-center gap-3 mb-5">
//                 {menuItems.map((item) => (
//                     <button
//                         key={item}
//                         onClick={() => handleItemChange(item)}
//                         className={`px-4 py-2 rounded-md text-sm font-medium transition ${selectedItem === item ? "bg-blue-500 text-white" : "bg-gray-200"
//                             }`}
//                     >
//                         {item}
//                     </button>
//                 ))}
//             </div>

//             {/* Form Fields */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <h2 className="text-lg font-semibold">{selectedItem} Options</h2>

//                 {/* Portion Size */}
//                 <div>
//                     <label className="block font-medium mb-1">Portion Size</label>
//                     <select {...register("portion")} className="w-full border p-2 rounded" defaultValue={currentFormVals.portion}>
//                         <option value="s">Small</option>
//                         <option value="m">Medium</option>
//                         <option value="l">Large</option>
//                     </select>
//                 </div>

//                 {/* Dried or Wet */}
//                 <div>
//                     <label className="block font-medium mb-1">Dried or Wet</label>
//                     <select {...register("driedOrWet")} className="w-full border p-2 rounded" defaultValue={currentFormVals.driedOrWet}>
//                         <option value="dry">Dry</option>
//                         <option value="wet">Wet</option>
//                     </select>
//                 </div>

//                 {/* Salt Percentage */}
//                 <div>
//                     <label className="block font-medium mb-1">Salt Percentage (0-20%)</label>
//                     <Controller
//                         name="saltPercentage"
//                         control={control}
//                         defaultValue={currentFormVals.saltPercentage}
//                         render={({ field }) => (
//                             <input
//                                 type="number"
//                                 min="0"
//                                 max="20"
//                                 {...field}
//                                 className="w-full border p-2 rounded"
//                             />
//                         )}
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const menuItems = ["Carbs", "Proteins", "Minerals"] as const;

type PortionSize = "s" | "m" | "l";
type DriedOrWet = "dry" | "wet";

type MenuData = {
    portion: PortionSize;
    driedOrWet: DriedOrWet;
    saltPercentage: number;
};

export default function CustomMenu() {
    const [selectedItem, setSelectedItem] = useState<(typeof menuItems)[number]>("Carbs");
    const [currentFormVals, setCurrentFormVals] = useState<MenuData>({ portion: "m", driedOrWet: "dry", saltPercentage: 0 })
    const [formValues, setFormValues] = useState<{ [key: string]: MenuData }>(
        Object.fromEntries(
            menuItems.map((item) => [
                item,
                { portion: "m", driedOrWet: "dry", saltPercentage: 0 },
            ])
        )
    );

    const { register, handleSubmit, control, watch, reset, getValues } = useForm<{ result: any }>();

    // Handle switching between menu items and retain values
    const handleItemChange = (item: (typeof menuItems)[number]) => {
        // console.log(`==============item: ${item}================`)
        // console.log(`==============selectedItem: ${selectedItem}================`)
        // console.log(formValues)
        const currentValues = watch().result[selectedItem];
        // console.log(`==============currentValues: ${JSON.stringify(currentValues)}================`)

        setFormValues((prev) => ({
            ...prev,
            [selectedItem]: currentValues
        })) // Save previous item values);

        console.log(formValues)
        setSelectedItem(item);
        setCurrentFormVals(formValues[item]);
        // reset({result: formValues}); // Restore values for new selected item
        reset({
            result: {
                ...getValues().result, // Keep other fields in the form as they are
                [item]: formValues[item] // Update only the selected item
            }
        });
        // reset(formValues[item]); // Restore values for new selected item
        // console.log(watch())
    };

    // Handle form submission
    const onSubmit = (data: any) => {
        console.log(getValues())
        const finalData = {
            ...formValues,
            [selectedItem]: data.result[selectedItem], // Ensure latest selected item values are included
        };

        const resultArray = menuItems.map((item) => ({
            [item]: finalData[item],
        }));

        console.log("Final Submitted Data:", resultArray);
        // const resultArray = data.result
        alert(JSON.stringify(resultArray, null, 2));
    };

    useEffect(() => {

    }, [formValues])

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Menu Navigation */}
            <div className="flex justify-center gap-3 mb-5">
                {menuItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => handleItemChange(item)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${selectedItem === item ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-lg font-semibold">{selectedItem} Options</h2>

                {/* Portion Size */}
                <div>
                    <label className="block font-medium mb-1">Portion Size</label>
                    <select {...register(`result.${selectedItem}.portion`)} className="w-full border p-2 rounded" defaultValue={currentFormVals.portion}>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                    </select>
                </div>

                {/* Dried or Wet */}
                <div>
                    <label className="block font-medium mb-1">Dried or Wet</label>
                    <select {...register(`result.${selectedItem}.driedOrWet`)} className="w-full border p-2 rounded" defaultValue={currentFormVals.driedOrWet}>
                        <option value="dry">Dry</option>
                        <option value="wet">Wet</option>
                    </select>
                </div>

                {/* Salt Percentage */}
                <div>
                    <label className="block font-medium mb-1">Salt Percentage (0-20%)</label>
                    {/* <Controller
                        name={`result.${selectedItem}.saltPercentage`}
                        control={control}
                        defaultValue={currentFormVals.saltPercentage}
                        render={({ field }) => (
                            <input
                                type="number"
                                min="0"
                                max="20"
                                {...field}
                                className="w-full border p-2 rounded"
                            />
                        )}
                    /> */}  {/**if i use the controller in this kinda scenario(using only one register key, it will mess the values real bad) */}
                    <input
                        type="number"
                        min="0"
                        max="20"
                        {...register(`result.${selectedItem}.saltPercentage`)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
}