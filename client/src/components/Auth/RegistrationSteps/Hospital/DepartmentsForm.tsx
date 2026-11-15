import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Layers, AlignLeft } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function DepartmentsForm() {
  const { register, control, formState: { errors } } = useFormContext<RegisterFormForHospital>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "departments",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
        <div>
          <h3 className="font-semibold text-zinc-950 text-sm mb-0.5">Departments</h3>
          <p className="text-zinc-500 text-xs">Add all available departments in the hospital.</p>
        </div>
        <button
          type="button"
          onClick={() => append({ name: "", description: "" })}
          className="flex items-center gap-2 text-xs font-semibold bg-[#00c950] text-white hover:bg-[#00b045] transition-colors px-3 py-2 rounded-lg shadow-sm"
        >
          <Plus className="size-4" /> Add Department
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
          <Layers className="size-8 text-zinc-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-500">No departments added yet</p>
        </div>
      )}

      {fields.map((item, index) => (
        <div key={item.id} className="p-4 border border-zinc-200 rounded-xl bg-white flex flex-col gap-4 relative shadow-sm">
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => remove(index)}
              className="size-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          
          <h4 className="font-bold text-zinc-950 text-xs uppercase tracking-wider">Department {index + 1}</h4>
          
          <div className="flex flex-col gap-2">
            <label className="text-zinc-950 text-sm font-semibold">Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cardiology"
                className="bg-white border border-zinc-200 h-11 px-4 pl-10 rounded-xl w-full md:w-3/4 focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                {...register(`departments.${index}.name` as const, { required: "Department name is required" })}
              />
              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[18px] text-zinc-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-950 text-sm font-semibold">Description</label>
            <div className="relative">
              <textarea
                placeholder="Heart and cardiovascular treatment"
                rows={2}
                className="bg-white border border-zinc-200 py-2.5 px-4 pl-10 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400 resize-none"
                {...register(`departments.${index}.description` as const, { required: "Description is required" })}
              />
              <AlignLeft className="absolute left-3.5 top-3 size-[18px] text-zinc-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
