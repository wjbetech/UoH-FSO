// PatientInfo.tsx

import { Link, useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { NewEntry, Patient } from "../../types/types";
import { Diagnosis } from "../../types/types";
import { getAllDiagnoses } from "../../services/diagnoses";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Button, Typography } from "@mui/material";

import EntryDetails from "./EntryDetails"; // sub-component
import AddEntryDialog from "../AddPatientModal/AddEntryForm";

export default function PatientInfo() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnosesData, setDiagnosesData] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) {
      setError("No id found!");
      return;
    }

    const fetchPatient = async () => {
      try {
        const patientData = await patients.getPatient(id);
        setPatient(patientData);
      } catch (e) {
        setError("Failed to fetch patient data");
      }
    };

    const fetchDiagnoses = async () => {
      const diagnosesData = await getAllDiagnoses();
      setDiagnosesData(diagnosesData);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(null);
  };

  // handle errors
  if (error) {
    return <div>{error}</div>;
  }

  // handle loading state if something is slow
  if (!patient) {
    return <div>Loading...</div>;
  }

  const submitNewEntry = async (values: NewEntry) => {
    if (!id) {
      setError("No patient ID found!");
      return;
    }

    try {
      const newEntry = await patients.addEntry(id, values);

      setPatient((prevPatient) => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: [...(prevPatient.entries ?? []), newEntry]
        };
      });

      closeModal();
    } catch (error) {
      setError("Failed to add entry");
    }
  };

  const genderIcon = (gender: Patient["gender"]) => {
    switch (gender) {
      case "male":
        return <MaleIcon color="primary" />;
      case "female":
        return <FemaleIcon color="warning" />;
      case "transgender":
        return <TransgenderIcon sx={{ color: "purple" }} />;
      default:
        return <QuestionMarkIcon sx={{ color: "#eee" }} />;
    }
  };

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {patient.name} {genderIcon(patient.gender)}
      </Typography>

      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>SSN:</strong> {patient.ssn}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>

      <Box sx={{ mt: 4 }}>
        {patient.entries && patient.entries.length > 0 ? (
          <>
            <Typography variant="h5" gutterBottom>
              Entries:
            </Typography>
            {patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} diagnosesData={diagnosesData} />
            ))}
          </>
        ) : (
          <Typography>No entries for this patient.</Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button variant="contained" color="primary" sx={{ mt: 4, fontWeight: "bold" }} onClick={openModal}>
          Add New Entry
        </Button>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 4, fontWeight: "bold" }}>
          Back
        </Button>
      </Box>

      {modalOpen && <AddEntryDialog open={modalOpen} onCancel={() => setModalOpen(false)} onSubmit={submitNewEntry} />}
    </Box>
  );
}
