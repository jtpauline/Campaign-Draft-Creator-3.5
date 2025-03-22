import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const DeityFields = ({ numDeities, updateFormData, formData }) => {
  useEffect(() => {
    console.log("DeityFields rendered with numDeities:", numDeities);
  }, [numDeities]);

  const handleDeityChange = (index, field, value) => {
    console.log(`Deity ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 5: Religion', {
      [`deity${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numDeities }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Deity {index + 1}</h3>
          <InputGroup label={`Deity ${index + 1} Name`} id={`deity${index + 1}Name`}>
            <TextInput
              id={`deity${index + 1}Name`}
              value={formData?.['Chapter 5: Religion']?.[`deity${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: Deity ${index + 1} Name - ${e.target.value}`);
                handleDeityChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter deity name"
            />
          </InputGroup>

          <InputGroup label={`Deity ${index + 1} Description`} id={`deity${index + 1}Description`}>
            <TextArea
              id={`deity${index + 1}Description`}
              value={formData?.['Chapter 5: Religion']?.[`deity${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: Deity ${index + 1} Description - ${e.target.value}`);
                handleDeityChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter deity description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default DeityFields;
