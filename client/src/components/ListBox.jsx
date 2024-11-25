import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'



export default function List({data}) {
  const [selected, setSelected] = useState(data[1])

  return (
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'w-28',
            ''
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={
            'bg-white w-48 mt-1 p-2 rounded'
        }
        >
          {data.map((item) => (
            <ListboxOption
              key={item.name}
              value={item}
              className="text-gray-800 rounded p-2  hover:bg-gray-50 "
            >
        
              <button className="text-sm/6 text-black ">{item.name}</button>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
  )
}
