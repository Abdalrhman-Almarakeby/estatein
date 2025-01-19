import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/form/input";
import { cn } from "@/lib/utils";

type MultiInputItemProps = {
  item: string;
  index: number;
  isEditing: boolean;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onStartEditing: () => void;
  onStopEditing: (value: string) => void;
  onRemove: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function MultiInputItem({
  item,
  index,
  isEditing,
  onKeyDown,
  onMoveUp,
  onMoveDown,
  onStartEditing,
  onStopEditing,
  onRemove,
  isFirst,
  isLast,
}: MultiInputItemProps) {
  const [inputValue, setInputValue] = useState(item);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(item);
  }, [item]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "flex-grow rounded-md border p-2",
          isEditing ? "bg-background" : "bg-muted",
        )}
      >
        {isEditing ? (
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className="w-full"
            aria-label={`Edit item ${index + 1}`}
          />
        ) : (
          <span>{item}</span>
        )}
      </div>
      <div className="flex space-x-1">
        <button
          type="button"
          className="btn-secondary inline-flex size-8 items-center justify-center"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label={`Move item ${index + 1} up`}
        >
          <ChevronUp className="size-4" />
        </button>
        <button
          type="button"
          className="btn-secondary inline-flex size-8 items-center justify-center"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label={`Move item ${index + 1} down`}
        >
          <ChevronDown className="size-4" />
        </button>
        {isEditing ? (
          <button
            type="button"
            className="btn-secondary inline-flex size-8 items-center justify-center"
            onClick={() => onStopEditing(inputValue)}
            aria-label={`Save edit for item ${index + 1}`}
          >
            <Check className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            className="btn-secondary inline-flex size-8 items-center justify-center"
            onClick={onStartEditing}
            aria-label={`Edit item ${index + 1}`}
          >
            <Edit2 className="size-4" />
          </button>
        )}
        <button
          type="button"
          className="btn inline-flex size-8 items-center justify-center bg-red-500"
          onClick={onRemove}
          aria-label={`Remove item ${index + 1}`}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
