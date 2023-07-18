import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import {
  GET_BADGES_VERSIONS,
  INSERT_CANDIDATURE_PROPOSAL
} from "../../state/queries-mutations.graphql";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from "@mui/material";
import { useForm } from "react-hook-form";

const AddCandidatureProposal = ({ selectedEngineer }) => {
  const { managerId } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    loading: versionsLoading,
    error: versionsError,
    data: versionsData
  } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] =
    useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      const selectedBadge = versionsData?.badges_versions_last.find(
        (version) => version.id === parseInt(data.selectedBadgeVersion)
      );

      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;

      if (badgeId && badgeVersion && selectedEngineer !== "" && managerId) {
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersion,
            engineer: parseInt(selectedEngineer.id),
            proposalDescription: data.proposalDescription,
            createdBy: managerId
          }
        });

        console.log("Candidature proposal added successfully!");
        console.log("Data:", {
          badgeId: Number(badgeId),
          badgeVersion: badgeVersion,
          engineer: parseInt(selectedEngineer.id),
          proposalDescription: data.proposalDescription,
          createdBy: managerId
        });
        navigate("/managers/CandidatureProposals");
      } else {
        console.error(
          "Failed to retrieve badge ID or badge version for the selected version."
        );
      }
    } catch (error) {
      console.error("Error adding candidature proposal:", error);
    }
  };

  if (!managerId) {
    return <Typography variant="body1">Manager ID not available.</Typography>;
  }

  if (versionsLoading || addLoading) {
    return <CircularProgress />;
  }

  if (versionsError || addError) {
    return (
      <Typography variant="body1">
        Error: {versionsError?.message || addError?.message}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        component="h1"
        variant="h5"
        style={{ marginBottom: "16px", textAlign: "center" }}
      >
        Add Candidature Proposal
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="engineer"
              label="Engineer Name"
              variant="outlined"
              fullWidth
              value={selectedEngineer ? selectedEngineer.name : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.selectedBadgeVersion}
            >
              <InputLabel id="badgeVersion-label">
                Select a Badge Version
              </InputLabel>
              <Select
                id="badgeVersion"
                labelId="badgeVersion-label"
                defaultValue={""}
                label="Select a Badge Version"
                {...register("selectedBadgeVersion", { required: true })}
              >
                <MenuItem value="">None</MenuItem>
                {versionsData?.badges_versions_last.map((version) => (
                  <MenuItem key={version.id} value={version.id}>
                    {version.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedBadgeVersion && (
                <FormHelperText>Please select a badge version.</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="proposalDescription"
              label="Proposal Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              {...register("proposalDescription", { required: true })}
              error={!!errors.proposalDescription}
            />
            {errors.proposalDescription && (
              <FormHelperText error>
                Please enter a proposal description.
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCandidatureProposal;
