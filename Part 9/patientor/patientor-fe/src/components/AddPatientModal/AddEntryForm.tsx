import { useState, useEffect, SyntheticEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Checkbox,
  ListItemText,
  SelectChangeEvent
} from "@mui/material";
import {
  NewEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Diagnosis
} from "../../types/types";
import getAllDiagnoses from "../../services/diagnoses";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryDialog = ({ open, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loadingDiagnoses, setLoadingDiagnoses] = useState<boolean>(true);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnosesData = await getAllDiagnoses();
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      } finally {
        setLoadingDiagnoses(false);
      }
    };
    fetchDiagnoses();
  }, []);

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const handleEntryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "HealthCheck" | "Hospital" | "OccupationalHealthcare";
    setEntryType(value);
    if (value !== "HealthCheck") setHealthCheckRating(HealthCheckRating.Healthy);
    if (value !== "Hospital") {
      setDischargeDate("");
      setDischargeCriteria("");
    }
    if (value !== "OccupationalHealthcare") setEmployerName("");
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    setHealthCheckRating(event.target.value as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: entryType
    };

    if (entryType === "HealthCheck") {
      onSubmit({ ...entry, healthCheckRating } as HealthCheckEntry);
    } else if (entryType === "Hospital") {
      onSubmit({ ...entry, discharge: { date: dischargeDate, criteria: dischargeCriteria } } as HospitalEntry);
    } else if (entryType === "OccupationalHealthcare") {
      onSubmit({ ...entry, employerName } as OccupationalHealthcareEntry);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Add New Entry</DialogTitle>
      <form onSubmit={addEntry}>
        <DialogContent dividers>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            margin="normal"
          />

          <FormControl component="fieldset" fullWidth margin="normal">
            <RadioGroup value={entryType} onChange={handleEntryTypeChange} row>
              <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
              <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
              <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare" />
            </RadioGroup>
          </FormControl>

          {entryType === "HealthCheck" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Health Check Rating</InputLabel>
              <Select value={healthCheckRating} onChange={onHealthCheckRatingChange}>
                {Object.values(HealthCheckRating).map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {entryType === "Hospital" && (
            <>
              <TextField
                label="Discharge Date"
                type="date"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Discharge Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                margin="normal"
              />
            </>
          )}

          {entryType === "OccupationalHealthcare" && (
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              margin="normal"
            />
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodesChange}
              renderValue={(selected) => selected.join(", ")}>
              {loadingDiagnoses ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                diagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                    <ListItemText primary={`${diagnosis.code} - ${diagnosis.name}`} />
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEntryDialog;
