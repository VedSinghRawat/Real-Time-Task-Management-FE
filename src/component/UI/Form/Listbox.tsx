import { Fragment, memo, useCallback, useState } from 'react'
import { Listbox as HeadlessListbox, Transition, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import { LuChevronsUpDown } from 'react-icons/lu'
import { BsCheckLg } from 'react-icons/bs'

interface ListboxProps<V, T extends { id: string; value: V; label: string }> {
  options: T[]
  placeholder?: string
  onChange?: (val: V) => void
  defaultSelected?: { id: string; value: V; label: string }
  showNoneOpt?: boolean
  buttonClasses?: string
  className?: string
}

const DEFAULT_OPT = { id: '__default__', value: '', label: '' }

function Listbox<V, T extends { id: string; value: V; label: string }>({
  options,
  defaultSelected,
  onChange,
  placeholder = 'Select Option',
  showNoneOpt = true,
  buttonClasses = '',
  className = '',
}: ListboxProps<V, T>) {
  const [selected, setSelected] = useState((defaultSelected || DEFAULT_OPT) as T)

  const handleChange = useCallback(
    (val: T) => {
      onChange && onChange(val.value)
      setSelected(val)
    },
    [onChange]
  )

  return (
    <HeadlessListbox as={Fragment} value={selected} onChange={handleChange}>
      <div className={`relative`}>
        <div
          className={`overflow-hidden relative text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ${className}`}
        >
          <ListboxButton
            className={`relative px-4 py-1 pr-8 w-full text-left rounded-lg shadow-md cursor-default bg-primary-9 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ${buttonClasses}`}
          >
            <span className="block truncate">{selected.label || placeholder}</span>

            <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <LuChevronsUpDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
        </div>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListboxOptions className="overflow-auto absolute z-10 py-1 mt-1 min-w-max max-h-60 text-base rounded-md ring-1 ring-black ring-opacity-5 shadow-lg bg-primary-9 focus:outline-none sm:text-sm">
            {showNoneOpt ? (
              <ListboxOption
                className={({ active }) =>
                  `relative cursor-default select-none z-10 py-2 pl-10 pr-4 ${active ? 'bg-primary-7 text-white' : 'text-gray-900'}`
                }
                value={DEFAULT_OPT}
              >
                ---
              </ListboxOption>
            ) : (
              <></>
            )}

            {options.map((opt) => (
              <ListboxOption
                key={opt.id}
                className={({ active }) =>
                  `relative cursor-default select-none z-10 py-2 pl-10 pr-4 ${active ? 'bg-primary-7 text-white' : 'text-gray-900'}`
                }
                value={opt}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{opt.label}</span>
                    {selected ? (
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                        <BsCheckLg className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </HeadlessListbox>
  )
}

export default memo(Listbox) as typeof Listbox
