import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tab: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="flex">
        {tabs.map((tab, index) => (
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
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tab;