import { Fragment, memo, useCallback, useState } from 'react'
import { Listbox as HeadlessListbox, Transition } from '@headlessui/react'
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
      <div className={`relative `}>
        <div
          className={`relative overflow-hidden text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ${className}`}
        >
          <HeadlessListbox.Button
            className={`relative w-full py-1 px-4 pr-8 text-left rounded-lg shadow-md cursor-default bg-primary-light focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ${buttonClasses}`}
          >
            <span className="block truncate">{selected.label || placeholder}</span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <LuChevronsUpDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </HeadlessListbox.Button>
        </div>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <HeadlessListbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base rounded-md shadow-lg min-w-max bg-primary-light max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {showNoneOpt ? (
              <HeadlessListbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none z-10 py-2 pl-10 pr-4 ${active ? 'bg-tertiary-700 text-white' : 'text-gray-900'}`
                }
                value={DEFAULT_OPT}
              >
                ---
              </HeadlessListbox.Option>
            ) : (
              <></>
            )}

            {options.map((opt) => (
              <HeadlessListbox.Option
                key={opt.id}
                className={({ active }) =>
                  `relative cursor-default select-none z-10 py-2 pl-10 pr-4 ${active ? 'bg-tertiary-700 text-white' : 'text-gray-900'}`
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
              </HeadlessListbox.Option>
            ))}
          </HeadlessListbox.Options>
        </Transition>
      </div>
    </HeadlessListbox>
  )
}

export default memo(Listbox) as typeof Listbox
