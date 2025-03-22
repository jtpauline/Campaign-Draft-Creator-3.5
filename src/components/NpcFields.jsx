import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const NpcFields = ({ numNpcs, updateFormData, formData }) => {
  useEffect(() => {
    console.log("NpcFields rendered with numNpcs:", numNpcs);
  }, [numNpcs]);

  const handleNpcChange = (index, field, value) => {
    console.log(`NPC ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 3: People', {
      [`npc${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numNpcs }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">NPC {index + 1}</h3>
          <InputGroup label={`NPC ${index + 1} Name`} id={`npc${index + 1}Name`}>
            <TextInput
              id={`npc${index + 1}Name`}
              value={formData?.['Chapter 3: People']?.[`npc${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: NPC ${index + 1} Name - ${e.target.value}`);
                handleNpcChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter NPC name"
            />
          </InputGroup>

          <InputGroup label={`NPC ${index + 1} Description`} id={`npc${index + 1}Description`}>
            <TextArea
              id={`npc${index + 1}Description`}
              value={formData?.['Chapter 3: People']?.[`npc${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: NPC ${index + 1} Description - ${e.target.value}`);
                handleNpcChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter NPC description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default NpcFields;
