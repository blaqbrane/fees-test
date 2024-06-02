

import React, { useState } from 'react';
import Select from 'react-select';



export default function SelectDropdown({options,onChange, selectedOption,placeholder}) {
   
  const selectCustomStyles = {
    menu: (provided) => ({
      ...provided,
      fontSize: '14px',
      zIndex: 100,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: '#A0A6AC',
    }),

    control: (provided, state) => ({
      ...provided,
      minHeight: '44px',
      fontSize: '14px',
      border: '2px solid #f5f2f2',
      color:  `${state.isFocused ? '' : '#E7EDF2'}`,
      borderRadius: '8px',
      outline: 'none',
      boxShadow: 'none',
      '&:hover':{
        border: '1px solid #f5f2f2',
      }
  
    }),

    option: (provided, state) => ({
      ...provided,
      color: `${
        state.isSelected ? 'black' : state.isFocused ? '#20282e' : '#20282e'
      }`,
      backgroundColor: state.isSelected
        ? '#f5f2f2'
        : state.isFocused
        ? '#fff'
        : '',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 3000ms ease';

      return { ...provided, opacity, transition };
    },
  };


  return (
    <div className="App">
      <Select
        components={{
          DropdownIndicator: () => (
            <span className="pr-4">
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="#838383"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ),
          IndicatorSeparator: () => null,
        }}
        // defaultValue={selectedOption}
        onChange={onChange}
        options={options}
        styles={ selectCustomStyles}
        placeholder={placeholder}
      />
    </div>
  );
}
