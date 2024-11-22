import { KeyboardEvent, useCallback, useState } from "react";
import {
  Control,
  FieldValues,
  UseFieldArrayReturn,
  useFieldArray,
  useWatch,
} from "react-hook-form";

type UseMultiInputProps = {
  name: string;
  control: Control<FieldValues>;
};

type UseMultiInputReturn = Pick<
  UseFieldArrayReturn,
  "update" | "fields" | "append" | "remove" | "move"
> & {
  editingIndex: number | null;
  setEditingIndex: (index: number | null) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  startEditing: (index: number) => void;
  stopEditing: () => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  values: { value: string }[];
};

export function useMultiInput({
  name,
  control,
}: UseMultiInputProps): UseMultiInputReturn {
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value.trim();

      if (event.key === "Enter" && inputValue !== "") {
        event.preventDefault();

        const isEditing = editingIndex !== null;
        if (isEditing) {
          update(editingIndex, {
            value: inputValue,
          });
          setEditingIndex(null);
          return;
        }

        append({ value: inputValue });
        inputElement.value = "";
      }
    },
    [append, update, editingIndex],
  );

  const startEditing = useCallback((index: number) => {
    setEditingIndex(index);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingIndex(null);
  }, []);

  const moveUp = useCallback(
    (index: number) => {
      if (index > 0) {
        move(index, index - 1);
      }
    },
    [move],
  );

  const moveDown = useCallback(
    (index: number) => {
      if (index < fields.length - 1) {
        move(index, index + 1);
      }
    },
    [move, fields.length],
  );

  const values =
    useWatch({
      name,
      control,
    }) || [];

  return {
    fields,
    append,
    remove,
    move,
    update,
    editingIndex,
    setEditingIndex,
    handleKeyDown,
    startEditing,
    stopEditing,
    moveUp,
    moveDown,
    values,
  };
}
