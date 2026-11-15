import Text from "@/shared/components/atoms/Text";
import QuestionNumber from "@/modules/survey-response/components/atoms/QuestionNumber";
import { cn } from "@/lib/cn";
import Input from "@/shared/components/atoms/Input";
type RadioQuestionFieldProps = {
  id: string;
  number: number;
  question: string;
  choices: string[];
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  readOnly: boolean;
  mode: "edit" | "view";
};

export default function RadioQuestionField({
  id,
  number,
  question,
  choices,
  value,
  onChange,
  readOnly,
  mode = "edit",
  required,
}: RadioQuestionFieldProps) {
  return (
    <fieldset
      aria-labelledby={`${id}-question-label`}
      className={`${mode === "edit" ? "border-b border-[var(--border-color-card)] last:border-b-0" : "!border-b-0"} py-5`}
    >
      <div className="flex gap-4 sm:gap-5">
        <QuestionNumber number={number} />

        <div className="min-w-0 flex-1">
          <div id={`${id}-question-label`} className="mb-3 inline-flex">
            <Text size="sm">{question}</Text>
            {required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </div>

          <div className="space-y-2">
            {choices.map(choice => {
              const isSelected = value === choice;

              return (
                <label
                  key={choice}
                  className={`group ${readOnly ? "ds-text-secondary cursor-default" : "ds-text-primary cursor-pointer"} flex items-center gap-2.5 text-sm font-[var(--font-heading)]`}
                >
                  <Input
                    id={`${id}-${choice}`}
                    name={id}
                    type="radio"
                    value={choice}
                    checked={isSelected}
                    disabled={readOnly}
                    onChange={readOnly ? undefined : () => onChange?.(choice)}
                    className="sr-only"
                    required={required}
                  />

                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border",
                      isSelected ? "border-[var(--color-primary)]" : "border-[var(--border-color)]",
                      "group-has-[:focus-visible]:shadow-[0_0_0_var(--focus-ring-width)_var(--focus-ring-color)]"
                    )}
                  >
                    {isSelected && (
                      <span className="size-2 rounded-full bg-[var(--color-primary)]" />
                    )}
                  </span>

                  {choice}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
