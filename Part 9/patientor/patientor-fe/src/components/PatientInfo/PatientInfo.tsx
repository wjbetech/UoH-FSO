import { Link, useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types/types";
import { Diagnosis } from "../../types/types";
import { getAllDiagnoses } from "../../services/diagnoses";

// mUI icons for gender
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";

export default function PatientInfo() {
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
        console.log(patientData);
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

  // handle errors
  if (error) {
    return <div>{error}</div>;
  }

  // handle loading state if something is slow
  if (!patient) {
    return <div>Loading...</div>;
  }

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
              <Paper key={entry.id} elevation={2} sx={{ mb: 2, padding: 2, backgroundColor: "#eee" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {entry.date}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {entry.description}
                </Typography>
                {entry.diagnosisCodes && (
                  <List dense sx={{ pl: 2 }}>
                    {entry.diagnosisCodes.map((code) => (
                      <ListItem key={code} sx={{ display: "list-item", pl: 1 }}>
                        {`${code} - ${diagnosesData.find((d) => d.code === code)?.name || "Unknown diagnosis"}`}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            ))}
          </>
        ) : (
          <Typography>No entries for this patient.</Typography>
        )}
      </Box>

      <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 4, fontWeight: "bold" }}>
        Back
      </Button>
    </Box>
  );
}
