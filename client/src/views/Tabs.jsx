import React, { useState } from "react";
import Tab from "./Tab";
import "../App.css";
 
const Tabs = ({ tabs, content, onChangeTab, activeTab }) => {
    const [tab, setTab] = useState(0);
 
    const handleTabClick = (e, index) => {
        e.preventDefault()
        setTab(index);
        onChangeTab(tab);
        console.log(activeTab)
    };
 
    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        onClick={(e) =>
                            handleTabClick(e, index)
                        }
                        isActive={index === activeTab}
                    />
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};
export default Tabs;