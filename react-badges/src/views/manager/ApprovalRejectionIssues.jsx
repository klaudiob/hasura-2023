import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import { TextField, Alert, AlertTitle, Typography, Card, CardContent, FormHelperText, Box, Grid } from "@mui/material";
import { GET_ISSUING_REQUESTS, REJECT_ISSUING_REQUEST, APPROVE_ISSUING_REQUEST } from "../../state/queries-mutations.graphql";
import SwalComponent from "../../components/SwalComponent";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../components/ButtonComponent";
import CenteredLayout from "../../layouts/CenteredLayout";
import LoadableCurtain from "../../components/LoadableCurtain";

const ApprovalRejectionIssues = () => {
  const { managerId } = useContext(AuthContext);
  const [issueRequests, setIssueRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [getExistingIssues, { loading, error, data }] = useMutation(GET_ISSUING_REQUESTS, { variables: { managerId } });
  const [rejectIssuingRequest] = useMutation(REJECT_ISSUING_REQUEST);
  const [approveIssuingRequest] = useMutation(APPROVE_ISSUING_REQUEST);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const handleApprovalClick = async (id) => {
    try {
      await approveIssuingRequest({
        variables: {
          id: id,
          isApproved: true,
          rejectionDescription: null
        }
      });
      console.log(`Engineer's id:`, id);
      getExistingIssues();
      SwalComponent("The issue request was approved!", "success", "2500");
      const updatedIssueRequests = issueRequests.map((issue) => {
        if (issue.id === id) {
          return { ...issue, showRejectionTextArea: false };
        }
        return issue;
      });
      setIssueRequests(updatedIssueRequests);
    } catch (error) {
      console.error("Error approving issuing request:", error);
    }
  };
  const handleRejectionClick = (id) => {
    setSelectedRequestId(id);
    const updatedIssueRequests = issueRequests.map((issue) => {
      console.log(issue);
      if (issue.id === id) {
        return { ...issue, showRejectionTextArea: true };
      }
      return issue;
    });
    setIssueRequests(updatedIssueRequests);
  };
  const handleRejectionSubmit = async (data) => {
    SwalComponent("The issue request was not approved!", "", "2500");
    try {
      await rejectIssuingRequest({
        variables: {
          id: selectedRequestId,
          rejectionDescription: data.rejectionDescription
        }
      });
      setSelectedRequestId(null);
      const updatedIssueRequests = issueRequests.map((issue) => {
        if (issue.id === selectedRequestId) {
          return { ...issue, showRejectionTextArea: false };
        }
        return issue;
      });
      setIssueRequests(updatedIssueRequests);
      getExistingIssues();
    } catch (error) {
      console.error("Error rejecting issuing request:", error);
    }
  };
  useEffect(() => {
    getExistingIssues();
  }, [getExistingIssues]);
  useEffect(() => {
    if (data && data.get_issuing_requests_for_manager) {
      const updatedIssueRequests = data.get_issuing_requests_for_manager.map((issue) => ({
        ...issue,
        showRejectionTextArea: false
      }));
      setIssueRequests(updatedIssueRequests);
    }
  }, [data]);
  if (loading) {
    return (
      <CenteredLayout>
        <LoadableCurtain text="Issuing Requests" />
      </CenteredLayout>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ marginTop: "20px" }} align="center" fontWeight="bold" gutterBottom>
          Existing Issues
        </Typography>
      </Grid>
      {issueRequests.length === 0 ? (
        <Grid item xs={12}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <strong>No issue requests found!</strong>
          </Alert>
        </Grid>
      ) : (
        issueRequests.map((issue) => (
          <Grid item key={issue.id} xs={12} sm={8}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: "10px",
                boxShadow:
                  "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)"
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography display="flex" justifyContent="center" gutterBottom>
                  <strong>{issue.badge_title}</strong>
                </Typography>
                <hr
                  style={{
                    border: "1px solid #1976D2",
                    margin: "10px auto",
                    width: "100%"
                  }}
                />

                <Typography textAlign="justify" variant="body1" component="p" padding="20px">
                  {issue.badge_description}
                </Typography>
                <Typography variant="body2">
                  <strong>Version: </strong>
                  {issue.badge_version}
                </Typography>
                <Typography variant="body2">
                  <strong> Eng. {issue.engineer_name}</strong>
                </Typography>
              </CardContent>
              <Box justifyContent="center" display="flex" alignItems="center" padding="20px">
                <ButtonComponent
                  variant="contained"
                  color="primary"
                  handleClick={() => handleApprovalClick(issue.id)}
                  sx={{ marginRight: "10px" }}
                  content={<DoneOutlinedIcon />}
                />
                <ButtonComponent
                  variant="contained"
                  color="error"
                  handleClick={() => handleRejectionClick(issue.id)}
                  content={<CloseOutlinedIcon />}
                />
              </Box>
              {issue.showRejectionTextArea && (
                <CardContent>
                  <TextField
                    id="rejectionDescription"
                    placeholder="Enter rejection description..."
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      marginBottom: "10px"
                    }}
                    fullWidth
                    {...register("rejectionDescription", {
                      required: "Please enter a rejection description."
                    })}
                    error={!!errors.rejectionDescription}
                  />
                  {errors.rejectionDescription && <FormHelperText error>{errors.rejectionDescription.message}</FormHelperText>}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <ButtonComponent
                      variant="contained"
                      color="success"
                      handleClick={handleSubmit(handleRejectionSubmit)}
                      content="Submit"
                      sx={{
                        width: "100px"
                      }}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};
export default ApprovalRejectionIssues;
