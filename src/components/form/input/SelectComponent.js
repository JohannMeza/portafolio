import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../../util/ClassNames'
import Icon from '../../icon/Icon'

export default function SelectComponent({ 
  list, 
  value = null,
  error = {empty: ""},
  label, 
  name = "empty",
  onChange,
  style = {},
  className = ""
}) {
  return (
    <div style={style} className={className}>
      <label htmlFor="price" className={classNames("block text-sm font-medium text-start", error[name] && "text-red-500")}>{label}</label>
      <Listbox 
        value={list.filter(el => el.value === value[name])[0]} 
        onChange={({value}) => onChange({ target: { name, value }})}
      >
        <div className="relative z-[500000] mt-1 shadow-sm">
          <Listbox.Button className={classNames(error[name] ? "input-select-base input-select-base-error" : "input-select-base")}>
            <span className="block truncate text-start">{list.filter(el => el.value === value[name])[0]?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-text" aria-hidden="true"/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-paragraph-2 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-paragraph-3">
              {list.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-white-200 text-secondary' : 'text-text'}`}
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{selected}{person.label}</span>
                      {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      
      {error[name] && (
        <span className="text-span-1 flex items-center text-red-500 gap-2 mt-1">
          <Icon.Info className="icon-principal" /> {error[name]}
        </span>
      )}
    </div>
  )
}
