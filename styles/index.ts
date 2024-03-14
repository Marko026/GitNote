export const selectStyles = {
  singleValue: (styles: any) => ({
    ...styles,
    color: "white",
    fontSize: "0.85rem",
  }),
  input: (styles: any) => ({
    ...styles,
    color: "white",
    fontSize: "0.85rem",
  }),
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderRadius: "0.375rem",
    minHeight: "3rem",
    color: "white",
    backgroundColor: "#1D2032",
    borderColor: state.isFocused ? "#1D2032" : "transparent",
    boxShadow: state.isFocused ? "0 0 0 0" : baseStyles.boxShadow,
    ":hover": {
      borderColor: "#55597D",
    },
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#55597D",
    fontSize: "0.85rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#1D2032",
    color: "#ADB3CC",
    borderRadius: "0.375rem",
    border: "1px solid #55597D",
    padding: "0.5rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2E3757"
      : state.isFocused
      ? "#2E3757"
      : "#1D2032",
    color: state.isFocused ? "white" : "#ADB3CC",
    fontSize: "0.85rem",
    ":active": {
      color: "white",
      backgroundColor: "#1D2032",
    },
  }),
  dropdownIndicator: (baseStyles: any) => ({
    ...baseStyles,
    color: "#55597D",
  }),
  indicatorsContainer: (baseStyles: any) => ({
    ...baseStyles,
    paddingRight: "0.3rem",
  }),
  indicatorSeparator: (baseStyles: any) => ({
    ...baseStyles,
    display: "none",
  }),
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: "#2E3757",
    color: "white",
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "white",
    fontSize: "0.85rem",
  }),
  multiValueRemove: (styles: any, state: any) => ({
    ...styles,
    color: state.isFocused ? "red" : "white",
    ":hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  }),
};
