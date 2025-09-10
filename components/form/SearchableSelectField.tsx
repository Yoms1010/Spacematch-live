import React, { useState, useRef, useEffect } from 'react';

// A custom hook to detect clicks outside of a component
const useOutsideClick = (ref: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};


const SearchableSelect = ({ options, placeholder, onSelect }: {options: any, placeholder: any, onSelect: any}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const wrapperRef = useRef(null);
  
  // Use the custom hook to close the dropdown when clicking outside
  useOutsideClick(wrapperRef, () => setIsOpen(false));

  const handleSelectOption = (option: any) => {
    setSelectedValue(option);
    onSelect(option.value); // Pass the selected value to the parent
    setIsOpen(false);
    setSearchTerm(""); // Reset search term
  };

  // Filter options based on the search term
  const filteredOptions = options.filter((option: any) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      position: 'relative',
      width: '250px',
      fontFamily: 'sans-serif',
    },
    header: {
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      zIndex: 1000,
      marginTop: '4px',
      maxHeight: '200px',
      overflowY: 'auto',
    },
    searchInput: {
      width: 'calc(100% - 20px)',
      padding: '8px 10px',
      border: 'none',
      borderBottom: '1px solid #ccc',
      outline: 'none',
    },
    optionsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    optionItem: {
      padding: '10px 12px',
      cursor: 'pointer',
    },
    // A pseudo-hover effect using JS for simplicity
    optionItemHover: {
      padding: '10px 12px',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
    },
    placeholder: {
      color: '#888',
    }
  };


  return (
    <div style={styles.container} ref={wrapperRef}>
      {/* The visible part of the select component */}
      <div style={styles.header} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue ? selectedValue.label : <span style={styles.placeholder}>{placeholder || "Select an option"}</span>}
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* The dropdown list that appears when open */}
      {isOpen && (
        <div style={styles.dropdown}>
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul style={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: any) => (
                <li
                  key={option.value}
                  style={styles.optionItem}
                  onClick={() => handleSelectOption(option)}
                  // A simple way to add hover effect without CSS
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li style={{...styles.optionItem, cursor: 'default'}}>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;