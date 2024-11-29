"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "@/components/form/input";
import { MultiInputItem } from "./multi-input-item";
import { useMultiInput } from "./use-multi-input";

type MultiInputProps = {
  name: string;
  control: Control<FieldValues>;
  placeholder?: string;
};

export function MultiInput({
  name,
  control,
  placeholder = "Enter value and press Enter",
}: MultiInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    fields,
    editingIndex,
    handleKeyDown,
    startEditing,
    stopEditing,
    moveUp,
    moveDown,
    remove,
    update,
    values,
    append,
  } = useMultiInput({ name, control });

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full"
          ref={inputRef}
          aria-label="Add new item"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 btn-secondary"
          onClick={() => {
            const inputElement = inputRef.current;
            if (!inputElement) return;

            const inputValue = inputElement.value.trim();
            if (inputValue === "") return;

            const isEditing = editingIndex !== null;
            if (isEditing) {
              update(editingIndex, inputValue);
              stopEditing();
            } else {
              append(inputValue);
            }

            inputElement.value = "";
          }}
        >
          <Check className="size-4" />
        </button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <MultiInputItem
            key={field.id}
            item={values[index] || ""}
            index={index}
            isEditing={editingIndex === index}
            onKeyDown={(e, index) => {
              if (e.key === "Enter") {
                update(index, (e.target as HTMLInputElement).value.trim());
                stopEditing();
              }
            }}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
            onStartEditing={() => startEditing(index)}
            onStopEditing={(value) => {
              update(index, value.trim());
              stopEditing();
            }}
            onRemove={() => remove(index)}
            isFirst={index === 0}
            isLast={index === fields.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
