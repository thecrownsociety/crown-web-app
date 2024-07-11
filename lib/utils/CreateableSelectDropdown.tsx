import React, { Dispatch, SetStateAction } from "react";
import CreatableSelect from "react-select/creatable";

export interface Option {
  label: string;
  value: string;
}

interface CreateableSelectDropdownProps {
  options: Option[];
  isLoading: boolean;
  value: Option | null | undefined;
  setValue: Dispatch<SetStateAction<Option | null | undefined>>;
}

const CreateableSelectDropdown: React.FC<CreateableSelectDropdownProps> = ({
  options,
  isLoading,
  value,
  setValue,
}) => {
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#000",
    }),
    option: (
      styles: { [x: string]: any },
      { data, isDisabled, isFocused, isSelected }: any
    ) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#000" : isFocused ? "#333" : "#fff",
        color: isSelected ? "#fff" : styles.color,
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    singleValue: (styles: any) => ({
      ...styles,
      color: "#fff", // Color of the selected option in the input field
    }),
    input: (styles: any) => ({ ...styles, color: "#ccc" }),
    placeholder: (styles: any) => ({ ...styles, color: "#ccc" }),
  };

  return (
    <CreatableSelect
      styles={colourStyles}
      isDisabled={isLoading}
      placeholder="Select Interviewer"
      isClearable
      onChange={(newValue) => setValue(newValue)}
      value={value}
      options={options}
      required
    />
  );
};

export default CreateableSelectDropdown;
