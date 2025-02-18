'use client'

import MultiselectComp from "@/app/frontend_components/MultiselectComp";
import MultiselectFormComp from "@/app/frontend_components/MultiselectFormComp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page(){
    const [options, setOptions] = useState([
        { value: "blues", label: "Blues" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "orchestra", label: "Orchestra" },
    ]);
    const { control, handleSubmit, setValue } = useForm();

    function addMoreOptions(){
        let randomId = Math.random() * 10000
        setOptions([...options, { value: `orchestra_${randomId}`, label: `Orchestra_${randomId}` }]);
    }

    function submitForm(data: any){
        console.log(data)
    }


    return (
        <div>
            <Button
                onClick={addMoreOptions}
            >
                Add More Entries
            </Button>
            <br />
            <br />
            <hr />
            <br />
            <form>
                <MultiselectFormComp options={options} control={control} />
            </form>
            <br />
            <br />
            <br />
            <br />
            <Button
                onClick={handleSubmit(submitForm)}
            >
                Submit
            </Button>
        </div>
    )
}