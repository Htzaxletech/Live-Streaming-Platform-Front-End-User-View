import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
	tabs?: Tab[];
	className?: string;
	active?: number;
}

const Tab: React.FC<TabsProps> = ({ tabs, className, active }) => {
  const [activeTab, setActiveTab] = useState(active || 0);

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="flex">
        {tabs && tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${index !== 0 ? "mx-2.5" : "mr-2.5"} ${
              activeTab === index
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent"
            } focus:outline-none hover:text-primary font-bold py-3`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs?.[activeTab].content}</div>
    </div>
  );
};

export default Tab;