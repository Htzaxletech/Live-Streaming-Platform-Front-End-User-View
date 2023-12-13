import React from "react";
import { Tab } from "@headlessui/react";
import { tv, type VariantProps } from "tailwind-variants";
import Button from "../Button";

type TabVariants = VariantProps<typeof tab>;

type TabProps = TabVariants & {
    label: string;
    index: number;
};

const tab = tv({
    base: ["flex flex-col"],
});

type TabComponentProps = TabProps & {
    Panel: typeof Tab.Panel; // Add the Panel property
};

const TabComponent: React.FC<TabComponentProps> = ({ label, index, Panel }) => {
    return (
        <Panel>
            <div className="flex flex-col">
                <Button
                    variant="light"
                    color="default"
                    size="md"
                    className={`focus:outline-none border-b-2 ${index === 0 ? "border-primary" : "border-transparent"
                        }`}
                >
                    {label}
                </Button>
            </div>
        </Panel>
    );
};



Tab.displayName = "Tab"

export default TabComponent
