import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const OrganizationFields = ({ numOrganizations, updateFormData, formData }) => {
  useEffect(() => {
    console.log("OrganizationFields rendered with numOrganizations:", numOrganizations);
  }, [numOrganizations]);

  const handleOrganizationChange = (index, field, value) => {
    console.log(`Organization ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 6: Organizations', {
      [`organization${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numOrganizations }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Organization {index + 1}</h3>
          <InputGroup label={`Organization ${index + 1} Name`} id={`organization${index + 1}Name`}>
            <TextInput
              id={`organization${index + 1}Name`}
              value={formData?.['Chapter 6: Organizations']?.[`organization${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: Organization ${index + 1} Name - ${e.target.value}`);
                handleOrganizationChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter organization name"
            />
          </InputGroup>

          <InputGroup label={`Organization ${index + 1} Description`} id={`organization${index + 1}Description`}>
            <TextArea
              id={`organization${index + 1}Description`}
              value={formData?.['Chapter 6: Organizations']?.[`organization${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: Organization ${index + 1} Description - ${e.target.value}`);
                handleOrganizationChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter organization description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default OrganizationFields;
