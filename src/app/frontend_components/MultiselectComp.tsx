'use client'
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MultiValue } from 'react-select';

const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });

type MultiselectProps = {
    options: Record<string, string>[]
}

export default function MultiselectComp(props: MultiselectProps) {
    const animatedComponents = makeAnimated();
    // const [options, setOptions] = useState([
    //     { value: "blues", label: "Blues" },
    //     { value: "rock", label: "Rock" },
    //     { value: "jazz", label: "Jazz" },
    //     { value: "orchestra", label: "Orchestra" },
    // ]);

    // const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
    //     value: string;
    //     label: string;
    // }> | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
        value: string;
        label: string;
    }> | null>([]);

    // Handle input change
    // const handleInputChange = (inputValue: string) => {
    //     console.log('Am I here????111')
    //     let randomId = Math.random() * 10000
    //     setOptions([...options, { value: `orchestra_${randomId}`, label: `Orchestra_${randomId}` }]);
    // };

    useEffect(()=>{
    }, [props.options])

    return (
        <div className="w-[30vw] sm:w-[20vh] md:w-[25vh] lg:w-[30vw]">
            <p>{`${selectedOptions?.map((e) => e.value)}`}</p>
            <CreatableSelect
                id="multiselectfield1"
                components={animatedComponents}
                defaultValue={selectedOptions}
                onChange={(newValue) => setSelectedOptions(newValue as MultiValue<{ value: string; label: string }>)}
                options={props.options}
                // onInputChange={handleInputChange}
                isMulti
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#FFA500' : base.borderColor, // Orange border on focus
                        boxShadow: state.isFocused ? '0 0 0 2px #FFA500' : base.boxShadow, // Orange outline on focus
                        '&:hover': {
                            borderColor: '#FFA500', // Orange border on hover
                        },
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                            ? 'rgba(252, 232, 174, 1)' // Orange background on hover
                            : base.backgroundColor,
                        color: state.isFocused ? '#000000' : base.color, // White text on hover
                        ':active': {
                            backgroundColor: 'rgba(250, 213, 165, 50)', // Slightly darker orange on selection
                        },
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#ffffff', // Orange background for selected items
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#FFA500', // Orange border on hover, this does nothing
                        },
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        backgroundColor: '#ffffff', // Orange background for selected items
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#FFA500', // Orange border on hover, this does not work
                        },
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        backgroundColor: '#ffffff', // Orange background for selected items
                        color: '#FFA500',
                        ':hover': {
                            backgroundColor: '#dadada', // Slightly darker orange on hover
                            color: '#FFA500',
                        },
                    }),
                }}
            />
        </div>
    );
}
