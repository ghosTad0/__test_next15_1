'use client';
import makeAnimated from 'react-select/animated';
import { Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { MultiValue } from 'react-select';

const CreatableSelect = dynamic(() => import('react-select/creatable'), { ssr: false });

type MultiselectProps = {
    options: Record<string, string>[] | null;
    control: any;
};

export default function MultiselectComp(props: MultiselectProps) {
    const animatedComponents = makeAnimated();

    return (
        <div className="w-[30vw] sm:w-[20vh] md:w-[25vh] lg:w-[30vw]">
            <Controller
                name="supported-purposes"
                control={props.control}
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        id="multiselectfield1"
                        components={animatedComponents}
                        onChange={(newValue) => field.onChange(newValue as MultiValue<{ value: string; label: string }>)} // Use react-hook-form's onChange
                        options={props.options ?? []}
                        isMulti
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                borderColor: state.isFocused ? '#FFA500' : base.borderColor,
                                boxShadow: state.isFocused ? '0 0 0 1px #FFA500' : base.boxShadow,
                                '&:hover': {
                                    borderColor: '#FFA500',
                                },
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? 'rgba(252, 232, 174, 1)' : base.backgroundColor,
                                color: state.isFocused ? '#000000' : base.color,
                                ':active': {
                                    backgroundColor: 'rgba(250, 213, 165, 50)',
                                },
                            }),
                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                '&:hover': {
                                    backgroundColor: '#FFA500',
                                },
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                '&:hover': {
                                    backgroundColor: '#FFA500',
                                },
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                backgroundColor: '#ffffff',
                                color: '#FFA500',
                                ':hover': {
                                    backgroundColor: '#dadada',
                                    color: '#FFA500',
                                },
                            }),
                        }}
                    />
                )}
            />
        </div>
    );
}




