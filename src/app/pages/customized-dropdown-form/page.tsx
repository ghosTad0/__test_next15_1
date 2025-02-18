"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableForm() {
  const { register, handleSubmit } = useForm();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Always visible input */}
        <div>
          <label className="block text-sm font-medium">Group 1</label>
          <input
            {...register("grp1")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter first field"
          />
        </div>

        {/* Dropdown toggle button */}
        <div
          className="flex items-center justify-between cursor-pointer bg-gray-100 p-2 rounded"
          onClick={toggleExpansion}
        >
          <span className="text-sm font-medium">Group 2</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {/* Expandable fields */}
        {isExpanded && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Field 2</label>
              <input
                {...register("grp2.field2")}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter second field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Field 3</label>
              <input
                {...register("grp2.field3")}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter third field"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
