import { decorate, observable, action, runInAction } from 'mobx';
import ApiClient from 'utils/ApiClient';

const API_URL = '/api/patient?ssn=';

class PatientStore {
  client: ApiClient;
  isLoaded: boolean;
  proposedName: string;
  patientName: string;
  patientInfo: string;
  dob: string;
  ssn: string;
  illness: string;
  drugs: string;
  allergies: string;
  saveSuccess: boolean;

  onNameChange(e) {
    this.proposedName = e.target.value;
  }

  onDoBChange(e) {
    this.dob = e.target.value;
  }

  onSSNChange(e) {
    this.ssn = e.target.value;
  }

  onIllnessChange(e) {
    this.illness = e.target.value;
  }

  onDrugsChange(e) {
    this.drugs = e.target.value;
  }

  onAllergiesChange(e) {
    this.allergies = e.target.value;
  }

  async onSave() {
    const params = new URLSearchParams(window.location.search);
    const res = await this.client.post('/api/patient');
    this.saveSuccess = true;
    runInAction(() => {
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    });
  }

  onCancel() {
    this.proposedName = '';
    this.dob = '';
    this.ssn = '';
    this.illness = '';
    this.drugs = '';
    this.allergies = '';
  }

  async fetch() {
    const res = await this.client.get(API_URL + params.get('ssn'));
    if (res && res.name) {
      this.patientName = res.name;
      this.dob = res.dob;
      this.ssn = res.ssn;
      this.drugs = res.drugs;
      this.illness = res.illness;
      this.allergies = res.allergies;
    } else {
      this.patientName = 'Doe, John';
      this.patientInfo = '20, Male, 09/09/1992';
      this.dob = '09/09/1992';
      this.ssn = 'xxx-xx-x929';
      this.drugs = 'Atenolol,Medafinil';
      this.illness = 'Tinitis,Gaout';
      this.allergies = 'Penicillin';
    }
    this.proposedName = this.patientName;
  }

  constructor(client: ApiClient) {
    this.client = client;
    this.isLoaded = false;
    this.onNameChange = this.onNameChange.bind(this);
    this.onDoBChange = this.onDoBChange.bind(this);
    this.onSSNChange = this.onSSNChange.bind(this);
    this.onIllnessChange = this.onIllnessChange.bind(this);
    this.onDrugsChange = this.onDrugsChange.bind(this);
    this.onAllergiesChange = this.onAllergiesChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.proposedName = '';
    this.dob = '';
    this.ssn = '';
    this.illness = '';
    this.drugs = '';
    this.allergies = '';
    this.saveSuccess = false;
  }
}

decorate(PatientStore, {
  isLoaded: observable,
  patientName: observable,
  proposedName: observable,
  patientInfo: observable,
  fetch: action,
  onNameChange: action,
  onDoBChange: action,
  onSSNChange: action,
  onIllnessChange: action,
  onDrugsChange: action,
  onAllergiesChange: action,
  onCancel: action,
  saveSuccess: observable
});

export default PatientStore;
