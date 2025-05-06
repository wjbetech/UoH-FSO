import { Diagnosis, Entry } from "../../types/types";
import { Box, Typography, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const healthCheckColor = (rating: number) => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "orange";
    case 2:
      return "red";
    case 3:
      return "black";
    default:
      return "gray";
  }
};

const EntryDetails = ({ entry, diagnosesData }: { entry: Entry; diagnosesData: Diagnosis[] }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, my: 2, borderLeft: "5px solid #1976d2" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Typography variant="h6">{entry.date}</Typography>
        <Typography variant="body2">Specialist: {entry.specialist}</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        {entry.description}
      </Typography>

      {"diagnosisCodes" in entry && entry.diagnosisCodes?.length && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Diagnosis Codes:
          </Typography>
          <ul>
            {entry.diagnosisCodes.map((code) => {
              const diagnosis = diagnosesData.find((d) => d.code === code);
              return (
                <li key={code}>
                  <Typography variant="body2">
                    {code} {diagnosis ? `– ${diagnosis.name}` : ""}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </Box>
      )}

      {/* render type-specific fields */}
      {"type" in entry &&
        (() => {
          switch (entry.type) {
            case "HealthCheck":
              return (
                <Box sx={{ mt: 1 }}>
                  <FavoriteIcon sx={{ color: healthCheckColor(entry.healthCheckRating) }} />
                </Box>
              );
            case "Hospital":
              return (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", pt: 2, pb: 2 }}>
                    <LocalHospitalIcon color="error" sx={{ mr: 1 }} />
                    <Typography>Hospital</Typography>
                  </Box>
                  <Typography variant="body2">
                    Discharge: {entry.discharge.date} – {entry.discharge.criteria}
                  </Typography>
                </Box>
              );
            case "OccupationalHealthcare":
              return (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", pt: 2, pb: 2, alignItems: "center" }}>
                    <WorkIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>Occupational Healthcare Provider</Typography>
                  </Box>
                  <Typography variant="body2">Employer: {entry.employerName}</Typography>
                  {entry.sickLeave && (
                    <Typography variant="body2">
                      Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                    </Typography>
                  )}
                </Box>
              );
            default:
              return assertNever(entry);
          }
        })()}
    </Paper>
  );
};

// Helper to enforce exhaustive checks
function assertNever(value: never): never {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
}

export default EntryDetails;
