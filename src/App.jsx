import React, { useState, useCallback, useMemo, useEffect } from 'react';
import InputGroup from './components/InputGroup';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import DynamicFields from './components/DynamicFields';
import ProgressBar from './components/ProgressBar';
import FormSection from './components/FormSection';
import NotificationWindow from './components/NotificationWindow';
import LocationFields from './components/LocationFields.jsx';
import NpcFields from './components/NpcFields';
import FactionFields from './components/FactionFields';
import DeityFields from './components/DeityFields';
import MonsterFields from './components/MonsterFields';
import OrganizationFields from './components/OrganizationFields';

const App = () => {
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [dynamicData, setDynamicData] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [numLocations, setNumLocations] = useState(1);
  const [numNpcs, setNumNpcs] = useState(1);
  const [numFactions, setNumFactions] = useState(1);
  const [numDeities, setNumDeities] = useState(1);
  const [numMonsters, setNumMonsters] = useState(1);
  const [numOrganizations, setNumOrganizations] = useState(1);
  const [documentPreview, setDocumentPreview] = useState('');

  const updateFormData = useCallback((section, data) => {
    console.log(`Updating formData for section: ${section}`, data);
    setFormData(prev => {
      return {
        ...prev,
        [section]: { ...prev[section], ...data },
      };
    });
  }, []);

  useEffect(() => {
    console.log('App re-rendered. formData:', formData);
    generateDocumentPreview();
  }, [formData, currentSection]);

  const handleSubmit = useCallback(() => {
    // Simulate submission process
    setProgress(30);
    setTimeout(() => setProgress(70), 500);
    setTimeout(() => {
      setProgress(100);
      setIsSubmitted(true);
      setNotification({
        type: 'success',
        message: 'Form submitted successfully!',
      });

      // Log the complete form data
      console.log('Complete Form Data:', formData);

    }, 1000);
  }, [formData]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleDynamicDataChange = data => {
    console.log('Dynamic data changed:', data);
    setDynamicData(data);
  };

  const handleNumLocationsChange = (value) => {
    setNumLocations(value);
  };

  const handleNumNpcsChange = (value) => {
    setNumNpcs(value);
  };

  const handleNumFactionsChange = (value) => {
    setNumFactions(value);
  };

  const handleNumDeitiesChange = (value) => {
    setNumDeities(value);
  };

  const handleNumMonstersChange = (value) => {
    setNumMonsters(value);
  };

  const handleNumOrganizationsChange = (value) => {
    setNumOrganizations(value);
  };

  const generateTxtContent = () => {
    let txtContent = '';
    for (const sectionKey in formData) {
      txtContent += `${sectionKey}:\n`;
      for (const fieldKey in formData[sectionKey]) {
        txtContent += `  ${fieldKey}: ${formData[sectionKey][fieldKey]}\n`;
      }
      txtContent += '\n';
    }
    return txtContent;
  };

  const downloadTxtFile = () => {
    const txtContent = generateTxtContent();
    const element = document.createElement("a");
    const file = new Blob([txtContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "campaign_data.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const generateDocxContent = () => {
    let docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
            <w:body>`;

    for (const sectionKey in formData) {
      docxContent += `<w:p><w:r><w:t>${sectionKey}</w:t></w:r></w:p>`;
      for (const fieldKey in formData[sectionKey]) {
        docxContent += `<w:p><w:r><w:t>${fieldKey}: ${formData[sectionKey][fieldKey]}\w:t></w:r></w:p>`;
      }
    }

    docxContent += `</w:body></w:document>`;
    return docxContent;
  };

  const downloadDocxFile = () => {
    const docxContent = generateDocxContent();
    const element = document.createElement("a");
    const file = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    element.href = URL.createObjectURL(file);
    element.download = "campaign_data.docx";
    document.body.appendChild(element);
    element.click();
  };

  const generateDocumentPreview = () => {
    let previewContent = '';

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    for (let i = 0; i <= currentSection; i++) {
      const section = sections[i];
      const sectionKey = section.title;
      previewContent += `Chapter ${i + 1}: ${sectionKey}\n\n`;

      if (formData[sectionKey]) {
        for (const fieldKey in formData[sectionKey]) {
          const capitalizedFieldKey = capitalizeFirstLetter(fieldKey);
          previewContent += `  ${capitalizedFieldKey}: ${formData[sectionKey][fieldKey]}\n`;
        }
      }
      previewContent += '\n';
    }

    setDocumentPreview(previewContent);
  };

  const sections = [
    {
      title: 'General Information',
      content: (
        <div className="space-y-4">
          <InputGroup label="Campaign Title" id="campaignTitle">
            <TextInput
              id="campaignTitle"
              value={formData?.['General Information']?.title || ''}
              onChange={e => {
                updateFormData('General Information', { title: e.target.value });
              }}
              placeholder="Enter campaign title"
            />
          </InputGroup>

          <InputGroup label="Introduction" id="campaignIntroduction">
            <TextArea
              id="campaignIntroduction"
              value={formData?.['General Information']?.introduction || ''}
              onChange={e => {
                updateFormData('General Information', { introduction: e.target.value });
              }}
              placeholder="Enter campaign introduction"
              rows={4}
            />
          </InputGroup>
        </div>
      ),
    },
    {
      title: 'Chapter 1: About the World',
      content: (
        <div className="space-y-4">
          <InputGroup label="World Overview" id="worldOverview">
            <TextArea
              id="worldOverview"
              value={formData?.['Chapter 1: About the World']?.overview || ''}
              onChange={e => {
                updateFormData('Chapter 1: About the World', { overview: e.target.value });
              }}
              placeholder="Enter world overview"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="World Geography" id="worldGeography">
            <TextArea
              id="worldGeography"
              value={formData?.['Chapter 1: About the World']?.geography || ''}
              onChange={e => {
                updateFormData('Chapter 1: About the World', { geography: e.target.value });
              }}
              placeholder="Enter world geography"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="World History" id="worldHistory">
            <TextArea
              id="worldHistory"
              value={formData?.['Chapter 1: About the World']?.history || ''}
              onChange={e => {
                updateFormData('Chapter 1: About the World', { history: e.target.value });
              }}
              placeholder="Enter world history"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="World Cosmology" id="worldCosmology">
            <TextArea
              id="worldCosmology"
              value={formData?.['Chapter 1: About the World']?.cosmology || ''}
              onChange={e => {
                updateFormData('Chapter 1: About the World', { cosmology: e.target.value });
              }}
              placeholder="Enter world cosmology"
              rows={4}
            />
          </InputGroup>
        </div>
      ),
    },
    {
      title: 'Chapter 2: Locations',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Locations" id="numLocations">
            <TextInput
              id="numLocations"
              type="number"
              value={numLocations}
              onChange={e => {
                handleNumLocationsChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of locations"
            />
          </InputGroup>
          <LocationFields numLocations={numLocations} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 3: People',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Important NPCs" id="numNpcs">
            <TextInput
              id="numNpcs"
              type="number"
              value={numNpcs}
              onChange={e => {
                handleNumNpcsChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of NPCs"
            />
          </InputGroup>
          <NpcFields numNpcs={numNpcs} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 4: Factions',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Factions" id="numFactions">
            <TextInput
              id="numFactions"
              type="number"
              value={numFactions}
              onChange={e => {
                handleNumFactionsChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of factions"
            />
          </InputGroup>
          <FactionFields numFactions={numFactions} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 5: Religion',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Deities" id="numDeities">
            <TextInput
              id="numDeities"
              type="number"
              value={numDeities}
              onChange={e => {
                handleNumDeitiesChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of deities"
            />
          </InputGroup>
          <DeityFields numDeities={numDeities} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 6: Organizations',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Organizations" id="numOrganizations">
            <TextInput
              id="numOrganizations"
              type="number"
              value={numOrganizations}
              onChange={e => {
                handleNumOrganizationsChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of organizations"
            />
          </InputGroup>
          <OrganizationFields numOrganizations={numOrganizations} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 7: Monsters and Enemies',
      content: (
        <div className="space-y-4">
          <InputGroup label="Number of Monsters" id="numMonsters">
            <TextInput
              id="numMonsters"
              type="number"
              value={numMonsters}
              onChange={e => {
                handleNumMonstersChange(parseInt(e.target.value));
              }}
              placeholder="Enter number of monsters"
            />
          </InputGroup>
          <MonsterFields numMonsters={numMonsters} updateFormData={updateFormData} formData={formData} />
        </div>
      ),
    },
    {
      title: 'Chapter 8: Campaign Information',
      content: (
        <div className="space-y-4">
          <InputGroup label="Starting the Campaign" id="startingCampaign">
            <TextArea
              id="startingCampaign"
              value={formData?.['Chapter 8: Campaign Information']?.startingCampaign || ''}
              onChange={e => {
                updateFormData('Chapter 8: Campaign Information', { startingCampaign: e.target.value });
              }}
              placeholder="Enter starting the campaign"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="Adventure Hooks" id="adventureHooks">
            <TextArea
              id="adventureHooks"
              value={formData?.['Chapter 8: Campaign Information']?.adventureHooks || ''}
              onChange={e => {
                updateFormData('Chapter 8: Campaign Information', { adventureHooks: e.target.value });
              }}
              placeholder="Enter adventure hooks"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="Themes and Tone" id="themesTone">
            <TextArea
              id="themesTone"
              value={formData?.['Chapter 8: Campaign Information']?.themesTone || ''}
              onChange={e => {
                updateFormData('Chapter 8: Campaign Information', { themesTone: e.target.value });
              }}
              placeholder="Enter themes and tone"
              rows={4}
            />
          </InputGroup>
        </div>
      ),
    },
    {
      title: 'Appendix',
      content: (
        <div className="space-y-4">
          <InputGroup label="Maps and Visual Aids" id="mapsVisualAids">
            <TextArea
              id="mapsVisualAids"
              value={formData?.['Appendix']?.maps || ''}
              onChange={e => {
                updateFormData('Appendix', { maps: e.target.value });
              }}
              placeholder="Enter maps and visual aids"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="Handouts and Props" id="handoutsProps">
            <TextArea
              id="handoutsProps"
              value={formData?.['Appendix']?.handouts || ''}
              onChange={e => {
                updateFormData('Appendix', { handouts: e.target.value });
              }}
              placeholder="Enter handouts and props"
              rows={4}
            />
          </InputGroup>

          <InputGroup label="Additional Resources" id="additionalResources">
            <TextArea
              id="additionalResources"
              value={formData?.['Appendix']?.additionalResources || ''}
              onChange={e => {
                updateFormData('Appendix', { additionalResources: e.target.value });
              }}
              placeholder="Enter additional resources"
              rows={4}
            />
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    console.log('handleNext called');
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
    console.log('currentSection after handleNext:', currentSection);
  };

  const handlePrevious = () => {
    console.log('handlePrevious called');
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
    console.log('currentSection after handlePrevious:', currentSection);
  };

  console.log('sections.length:', sections.length);
  console.log('currentSection:', currentSection);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">TTRPG Campaign Book Creator</h1>
      {notification && (
        <NotificationWindow
          type={notification.type}
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
      <ProgressBar currentSection={currentSection} totalSections={sections.length} />

      <FormSection title={sections[currentSection]?.title || 'Section NaN'}>
        {sections[currentSection]?.content || 'No content'}
      </FormSection>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          Previous
        </button>
        {currentSection === sections.length - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
      {currentSection === sections.length - 1 && (
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadTxtFile}
          >
            Export to TXT
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadDocxFile}
          >
            Export to DOCX
          </button>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold mb-4">Document Preview</h2>
        <pre className="whitespace-pre-wrap bg-white p-4 rounded-md overflow-x-auto document-preview">
          {documentPreview}
        </pre>
      </div>
    </div>
  );
};

export default App;
