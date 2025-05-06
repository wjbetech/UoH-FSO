import { Link, useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types/types";

// mUI icons for gender
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Button } from "@mui/material";

export default function PatientInfo() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    void fetchPatient();
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
        return <QuestionMarkIcon color="disabled" />;
    }
  };

  return (
    <div>
      <h3>
        {patient.name} - <span>{genderIcon(patient.gender)}</span>
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <div className="entries">
        <h3>Entries:</h3>
        {patient.entries?.map((entry) => {
          return (
            <div>
              <h5>{entry.date}</h5>
              <p>{entry.description}</p>
              {entry.diagnosisCodes?.map((c) => (
                <ul>
                  <li>{c}</li>
                </ul>
              ))}
            </div>
          );
        })}
      </div>
      <Button component={Link} to="/" variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
        Back
      </Button>
    </div>
  );
}
