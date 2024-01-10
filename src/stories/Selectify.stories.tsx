import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { useSelectify, UseSelectProps } from "../use-selectify";
import SelectedCheckIcon from "./assets/check.svg";

const Template = (args: UseSelectProps) => {
    const containerRef = React.useRef(null);
    const exclusionZoneRef = React.useRef(null);
    const {
        SelectBoxOutlet,
        clearSelection,
        hasSelected,
        selectAll,
        selectedElements,
        mutateSelections,
    } = useSelectify(containerRef, {
        ...args,
        exclusionZone: exclusionZoneRef.current,
        onSelect: (el: Element) => {
            el.classList.add("table-item-active");
        },
        onUnselect: (el: Element) => {
            el.classList.remove("table-item-active");
        },
        onDragStart: () => {
            document.body.style.userSelect = "none";
        },
        onDragEnd: () => {
            document.body.style.userSelect = "auto";
        },
    });

    function toggleItemSelection(elementToSelect: HTMLElement | null | undefined) {
        if (!elementToSelect) return;

        // check if it isn't alredy selected
        if (!selectedElements.includes(elementToSelect)) {
            mutateSelections((prevSelections) => [...prevSelections, elementToSelect]);
        } else {
            // unselect
            mutateSelections((prevSelections) =>
                prevSelections.filter((element) => element !== elementToSelect)
            );
        }
    }

    return (
        <React.StrictMode>
            <div ref={containerRef} className="table-container">
                <div className="table-content">
                    <header className="table-header">
                        <div className="table-header-button">
                            <button
                                onClick={hasSelected ? clearSelection : selectAll}
                                data-active={!hasSelected}>
                                -
                            </button>
                        </div>
                        <span>Type</span>
                        <span>Group</span>
                        <span>Serial.</span>
                        <span>Code</span>
                    </header>

                    <div className="table-list" ref={exclusionZoneRef}>
                        {[...Array(32)].map((_, i) => (
                            <div key={i} className="table-item">
                                <button
                                    className="table-item-icon"
                                    onClick={(e) =>
                                        toggleItemSelection(
                                            e.currentTarget.parentElement // here we're getting the .table-item element to select
                                        )
                                    }>
                                    <img src={SelectedCheckIcon} />
                                </button>
                                <span>Articulated</span>
                                <span>Virtual Factory</span>
                                <span>KR-{i + 1 * 1234}</span>
                                <span>{(i + 200 * 4321).toFixed(0)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <SelectBoxOutlet />
            </div>
        </React.StrictMode>
    );
};

export const Basic = Template.bind({}) as ComponentStory<any>;
Basic.args = {
    selectCriteria: `.table-item`,
};
Basic.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export const SecondTheme = Template.bind({}) as ComponentStory<any>;
SecondTheme.args = {
    selectCriteria: `.table-item`,
    theme: "outline",
};
SecondTheme.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export const FullInsersectionOnly = Template.bind({}) as ComponentStory<any>;
FullInsersectionOnly.args = {
    selectCriteria: `.table-item`,
    onlySelectOnFullOverlap: true,
};
FullInsersectionOnly.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export const OnMetaKeyOnly = Template.bind({}) as ComponentStory<any>;
OnMetaKeyOnly.args = {
    selectCriteria: `.table-item`,
    activateOnMetaKey: true,
};
OnMetaKeyOnly.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export const OnlySelectOnDragEnd = Template.bind({}) as ComponentStory<any>;
OnlySelectOnDragEnd.args = {
    selectCriteria: `.table-item`,
    onlySelectOnDragEnd: true,
};
OnlySelectOnDragEnd.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export const WithDelay = Template.bind({}) as ComponentStory<any>;
WithDelay.args = {
    selectCriteria: `.table-item`,
    selectionDelay: 1000,
    onSelect: (el: Element) => {
        el.classList.add("table-item-active");
    },
    onUnselect: (el: Element) => {
        el.classList.remove("table-item-active");
    },
};
WithDelay.parameters = {
    docs: {
        source: {
            code: "Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554",
        },
    },
};

export default {
    title: "Selectify",
    component: Template,
} as ComponentMeta<typeof Template>;
