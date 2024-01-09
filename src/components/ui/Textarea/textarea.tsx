import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type TextareaVariantProps = VariantProps<typeof textarea>;

export type TextareaProps = Omit<ComponentPropsWithRef<"textarea">, "size"> &
	TextareaVariantProps & {
		startContent?: ReactNode;
		endContent?: ReactNode;
		withClearButton?: boolean;
		onClear?: () => void;
	};

const textarea = tv({
	slots: {
		root: [
			"flex",
			"relative",
			"items-center",
			"w-56", // You can adjust the width as needed
			"outline-none",
			"text-xl",
			"bg-background-base",
			"text-foreground-secondary",
			"border border-border",
			"rounded-md",
			"hover:ring-[1px] hover:ring-border",
			"focus-within:!ring-[2px] focus-within:!ring-primary",
		],
		textareaBox: [
			"text-sm",
			"w-full h-full",
			"bg-transparent",
			"outline-none",
			// "bg-background-base",
			// "text-foreground-secondary",
			// "border border-border",
			// "rounded-md",
			// "hover:ring-[1px] hover:ring-border",
			// "focus-within:!ring-[2px] focus-within:!ring-primary",
		],
	},
	variants: {
		size: {
			sm: { root: ["h-[30px]", "px-1", "gap-1"] },
			md: { root: ["h-9", "px-2", "gap-2"] },
		},
		disabled: {
			true: { root: "!opacity-70 !pointer-events-none" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const { root, textareaBox } = textarea();

const Textarea: FC<TextareaProps> = forwardRef(
	(
		{
			value,
			disabled,
			className,
			size,
			...props
		},
		forwardedRef
	) => {
		return (
			<div className={root({ disabled, size, class: className })}>
				<textarea
					{...props}
					value={value}
					disabled={disabled}
					ref={forwardedRef}
					className={textareaBox()}
				></textarea>
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

export default Textarea;