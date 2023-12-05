import React, { FC, ComponentPropsWithRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

type CategoryLinkVariants = VariantProps<typeof categorylink>;

type CategoryLinkProps = CategoryLinkVariants & ComponentPropsWithRef<typeof Link>;

const categorylink = tv({
    base: [
        "font-bold text-lg",
        "flex items-center justify-between",
        "px-3 py-1 rounded",
    ],

    variants: {
        color: {
            default: [
                "bg-primary text-white",
                "hover:bg-primary-600",
                "active:bg-teal-600",
            ],
        },
        size: {
            sm: ["h-[30px] min-w-[28px]"],
            md: ["h-[45px] min-w-[40px]"],
            lg: ["h-[45px] min-w-[45px]"],
        },
    },
});

interface CategoryLinkWithIconProps extends CategoryLinkProps {
    icon?: React.ReactNode;
    to: string;
}

const CategoryLink: FC<CategoryLinkWithIconProps> = forwardRef(
    ({ children, className, color, size, icon, to, ...rest }, forwardedRef) => {
        const containerClasses = "max-w-[250px]";
        return (
            <div className={containerClasses}>
                <Link
                    to={to}
                    {...rest}
                    ref={forwardedRef}
                    className={categorylink({ color, size, class: className })}
                >
                    <span className="flex items-center justify-between">
                        <span className="mr-12 text-xl">{children}</span>
                        {icon && <span className="ml-10">{icon}</span>}
                    </span>
                </Link>
            </div>
        );
    }
);

CategoryLink.displayName = "CategoryLink";

export default CategoryLink;
