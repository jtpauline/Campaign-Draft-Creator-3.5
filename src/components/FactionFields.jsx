import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const FactionFields = ({ numFactions, updateFormData, formData }) => {
  useEffect(() => {
    console.log("FactionFields rendered with numFactions:", numFactions);
  }, [numFactions]);

  const handleFactionChange = (index, field, value) => {
    console.log(`Faction ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 4: Factions', {
      [`faction${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numFactions }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Faction {index + 1}</h3>
          <InputGroup label={`Faction ${index + 1} Name`} id={`faction${index + 1}Name`}>
            <TextInput
              id={`faction${index + 1}Name`}
              value={formData?.['Chapter 4: Factions']?.[`faction${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: Faction ${index + 1} Name - ${e.target.value}`);
                handleFactionChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter faction name"
            />
          </InputGroup>

          <InputGroup label={`Faction ${index + 1} Description`} id={`faction${index + 1}Description`}>
            <TextArea
              id={`faction${index + 1}Description`}
              value={formData?.['Chapter 4: Factions']?.[`faction${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: Faction ${index + 1} Description - ${e.target.value}`);
                handleFactionChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter faction description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default FactionFields;
