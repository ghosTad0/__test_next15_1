'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define Zod Schema
const schema = z.object({
  p: z.object({
    a: z.number().int().min(1, "Must be a positive integer"), // 'a' should be an integer
    b: z.string().min(1, "Must be at least 1 character").max(10, "Max length is 10"), // 'b' length 1-10
    c: z.string().min(1, "Must be at least 1 character").max(10, "Max length is 10"), // 'c' length 1-10
  }),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Valid Data Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>A (Integer):</label>
        <input type="number" {...register("p.a", { valueAsNumber: true })} />
        {errors.p?.a && <p>{errors.p.a.message}</p>}
      </div>

      <div>
        <label>B (1-10 chars):</label>
        <input type="text" {...register("p.b")} />
        {errors.p?.b && <p>{errors.p.b.message}</p>}
      </div>

      <div>
        <label>C (1-10 chars):</label>
        <input type="text" {...register("p.c")} />
        {errors.p?.c && <p>{errors.p.c.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
