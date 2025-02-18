'use client'

import { PreventNavigation } from "@/utils/frontend_utils/PreventNavigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function handleAddEmployeeSubmit(data: any, router: AppRouterInstance) {
    console.log(data)
    router.push("/pages/random-page2")
    return
}

export default function page(){
    const {register, reset, handleSubmit, formState:{isDirty}} = useForm()
    const addRouter = useRouter();

    const onSubmit = (data: any) => handleAddEmployeeSubmit(data, addRouter)  // this is a closure. you can use a closure or bind the router to the function, to give extra args to the handleSubmit in react hook form

    useEffect(() => {
        reset()
    }, [])

    return(
        <div>
            <PreventNavigation isDirty={isDirty} backHref={'/home'} resetData={reset} />
            <p>Employee add form</p>
            <br />
            <hr />
            <form>
                <p>Name:</p>
                <input 
                    type="text"
                    placeholder="name"
                    {...register("employeeName")}
                />
                <p>Age:</p>
                <input
                    type="text"
                    placeholder="age"
                    {...register("employeeAge")}
                />
            </form>
            <button onClick={handleSubmit(onSubmit)}>Submit</button>
            <hr />
            <br />
            <Link href={"/pages/random-page1"}>Navigate to random link1</Link>
        </div>
    )
}