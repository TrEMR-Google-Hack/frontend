import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Title from 'components/Title';
import Navbar from 'components/Navbar';
import PatientStore from 'stores/PatientStore';

type Props = {
  patient: PatientStore
};

class Patient extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { patient } = this.props;
    const { isLoaded } = patient;
    if (!isLoaded) patient.fetch();
  }

  render() {
    const { patient } = this.props;
    const {
      patientName,
      proposedName,
      onNameChange,
      onDoBChange,
      onSSNChange,
      onIllnessChange,
      onDrugChange,
      onAllergiesChange,
      onSave,
      onCancel,
      dob,
      ssn,
      illness,
      drugs,
      allergies,
      saveSuccess
    } = patient;
    return (
      <React.Fragment>
        <Title title="Central EMR" />
        <Navbar title={{ label: 'Central EMR', path: '/' }} />
        <Header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="#" style={{ color: 'black' }}>
                  In-patients
                </a>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  Patient Details
                </a>
              </li>
            </ul>
          </nav>
          <BigName>{patientName}</BigName>
          <BigDetails>{dob}</BigDetails>
        </Header>
        <Body className="columns">
          <Sidebar className="column">
            <SelectedSidebarItem>Patient Summary</SelectedSidebarItem>
            <SidebarItem>Patient Information</SidebarItem>
            <SidebarItem>Clinical Encounters</SidebarItem>
            <SidebarItem>Radiology</SidebarItem>
            <SidebarItem>Labs</SidebarItem>
          </Sidebar>
          <PrimaryPanel className="column is-four-fifths">
            <div className="columns">
              <InputColumn className="column">
                <Input
                  label="Name"
                  onChange={onNameChange}
                  value={proposedName}
                />
                <Input
                  label="Illnesses"
                  onChange={onIllnessChange}
                  value={illness}
                />
                <br />
                <div className="columns">
                  <button
                    className="button is-inverted"
                    style={{ marginLeft: '12px', borderRadius: '12px' }}
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  &nbsp;
                  <button
                    style={{ borderRadius: '12px' }}
                    className="button is-primary"
                    onClick={onSave}
                  >
                    Save
                  </button>
                  {saveSuccess && <Huge>&nbsp;✓</Huge>}
                </div>
              </InputColumn>
              <InputColumn className="column">
                <Input
                  label="Date of birth"
                  onChange={onDoBChange}
                  value={dob}
                />
                <Input label="Drugs" onChange={onDrugChange} value={drugs} />
              </InputColumn>
              <InputColumn className="column">
                <Input
                  label="Social Security Number"
                  onChange={onSSNChange}
                  value={ssn}
                />
                <Input
                  label="Allergies"
                  onChange={onAllergiesChange}
                  value={allergies}
                />
              </InputColumn>
            </div>
          </PrimaryPanel>
        </Body>
      </React.Fragment>
    );
  }
}

const Header = styled.div`
  padding: 30px;
  border-bottom: 3px solid #ccc;
`;

const BigName = styled.h1`
  font-size: 3em;
  color: #2b7c59;
`;

const BigDetails = styled.h2`
  font-size: 1.5em;
  color: #2b7c59;
`;

const Body = styled.div`
  margin: 0 !important;
  height: 100%;
`;

const Sidebar = styled.div`
  padding: 0 30px !important;
  border-right: 3px solid #ccc;
`;

const SelectedSidebarItem = styled.div`
  font-weight: bold;
  color: #2B7C59
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
`;

const SidebarItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
`;

const PrimaryPanel = styled.div`
  padding: 50px 70px !important;
`;

const InputLabel = styled.span`
  color: #228ecd;
  font-size: 1.5em;
  font-weight: bold;
`;

const InputColumn = styled.div`
  padding-right: 60px !important;
`;

const Huge = styled.span`
  font-size: 2em;
`;

const Input = ({ label, value, onChange }) => (
  <div style={{ marginBottom: '15px' }}>
    <InputLabel>{label}</InputLabel>
    <input className="input is-small" value={value} onChange={onChange} />
  </div>
);

export default inject('patient')(observer(Patient));
