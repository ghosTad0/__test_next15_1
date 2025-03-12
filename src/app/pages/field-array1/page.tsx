'use client'

import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  val1: {
    code: string;
    content: {
      apiId: string;
      xRate: string;
      xRemaining: string;
    }[];
  };
};

export default function MyForm() {
  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      val1: {
        code: "",
        content: [{ apiId: "", xRate: "", xRemaining: "" }],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "val1.content",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {/* Code Field */}
      <div>
        <label className="block text-sm font-medium">Code</label>
        <input
          {...register("val1.code")}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Enter code"
        />
      </div>

      {/* Content Fields */}
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 border p-4 rounded">
          <div>
            <label className="block text-sm font-medium">API ID</label>
            <input
              {...register(`val1.content.${index}.apiId`)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="API ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">X-Rate</label>
            <input
              {...register(`val1.content.${index}.xRate`)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="X-Rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">X-Remaining</label>
            <input
              {...register(`val1.content.${index}.xRemaining`)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="X-Remaining"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add New Content Entry */}
      <button
        type="button"
        onClick={() =>
          append({ apiId: "", xRate: "", xRemaining: "" })
        }
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add API Entry
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded block mt-4"
      >
        Submit
      </button>
    </form>
  );
}
