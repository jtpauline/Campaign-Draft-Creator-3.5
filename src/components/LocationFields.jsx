import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const LocationFields = ({ numLocations, updateFormData, formData }) => {
  useEffect(() => {
    console.log("LocationFields rendered with numLocations:", numLocations);
  }, [numLocations]);

  const handleLocationChange = (index, field, value) => {
    console.log(`Location ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 2: Locations', {
      [`location${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numLocations }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Location {index + 1}</h3>
          <InputGroup label={`Location ${index + 1} Name`} id={`location${index + 1}Name`}>
            <TextInput
              id={`location${index + 1}Name`}
              value={formData?.['Chapter 2: Locations']?.[`location${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: Location ${index + 1} Name - ${e.target.value}`);
                handleLocationChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter location name"
            />
          </InputGroup>

          <InputGroup label={`Location ${index + 1} Description`} id={`location${index + 1}Description`}>
            <TextArea
              id={`location${index + 1}Description`}
              value={formData?.['Chapter 2: Locations']?.[`location${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: Location ${index + 1} Description - ${e.target.value}`);
                handleLocationChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter location description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default LocationFields;
