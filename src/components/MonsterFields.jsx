import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import TextInput from './TextInput';
import TextArea from './TextArea';

const MonsterFields = ({ numMonsters, updateFormData, formData }) => {
  useEffect(() => {
    console.log("MonsterFields rendered with numMonsters:", numMonsters);
  }, [numMonsters]);

  const handleMonsterChange = (index, field, value) => {
    console.log(`Monster ${index}: Changing ${field} to ${value}`);
    updateFormData('Chapter 7: Monsters and Enemies', {
      [`monster${index + 1}${field}`]: value,
    });
  };

  return (
    <div>
      {Array.from({ length: numMonsters }, (_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Monster {index + 1}</h3>
          <InputGroup label={`Monster ${index + 1} Name`} id={`monster${index + 1}Name`}>
            <TextInput
              id={`monster${index + 1}Name`}
              value={formData?.['Chapter 7: Monsters and Enemies']?.[`monster${index + 1}Name`] || ''}
              onChange={(e) => {
                console.log(`Input change: Monster ${index + 1} Name - ${e.target.value}`);
                handleMonsterChange(index, 'Name', e.target.value);
              }}
              placeholder="Enter monster name"
            />
          </InputGroup>

          <InputGroup label={`Monster ${index + 1} Description`} id={`monster${index + 1}Description`}>
            <TextArea
              id={`monster${index + 1}Description`}
              value={formData?.['Chapter 7: Monsters and Enemies']?.[`monster${index + 1}Description`] || ''}
              onChange={(e) => {
                console.log(`TextArea change: Monster ${index + 1} Description - ${e.target.value}`);
                handleMonsterChange(index, 'Description', e.target.value);
              }}
              placeholder="Enter monster description"
              rows={4}
            />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default MonsterFields;
