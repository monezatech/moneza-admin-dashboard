"use client";

import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
};

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="w-full">
      <Popover className="relative">
        <Popover.Button className="w-full text-left border px-4 py-2 rounded bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div className="flex justify-between items-center">
            <span className={selectedLabel ? "" : "text-gray-400"}>
              {selectedLabel || `Select ${label}`}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-in"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute z-20 mt-2 w-full bg-white border rounded shadow-lg">
            <div className="p-2 sticky top-0 z-10 bg-white flex items-center gap-2 border-b">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full text-sm outline-none"
                placeholder={`Search ${label}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-auto">
              {filtered.length > 0 ? (
                filtered.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setQuery("");
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 flex justify-between items-center ${
                      option.value === value ? "bg-blue-50 font-medium" : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-400">
                  No results found
                </div>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
