import React, { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { GET_ENGINEERS } from "../../state/queries-mutations.graphql";
import { useNavigate } from "react-router-dom";
import LoadableCurtain from "../../components/LoadableCurtain";
import CenteredLayout from "../../layouts/CenteredLayout";
import ButtonComponent from "../../components/ButtonComponent";

const AssociatedEngineers = () => {
  const { managerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getEngineersByManager, { loading, error, data }] = useMutation(
    GET_ENGINEERS,
    { variables: { managerId } }
  );

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const handleProposalClick = (engineerId) => {
    navigate(`/managers/AddCandidatureProposal/${engineerId}`);
  };
  const engineerImageMap = {
    1: "1.jpg",
    4: "4.jpg",
    7: "7.jpg",
    8: "8.jpg"
  };

  if (loading)
    return (
      <CenteredLayout>
        <LoadableCurtain text="Team Members" />
      </CenteredLayout>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        padding="30px"
        fontWeight="bold"
        gutterBottom
      >
        List of Engineers
      </Typography>
      <Grid container rowSpacing={4} columnSpacing={2} justifyContent="center">
        {data &&
          data.get_engineers_by_manager.map((engineer) => (
            <Grid item key={engineer.id} xs={12} sm={3}>
              <Card
                sx={{
                  width: "90%",
                  height:"300px",
                  marginLeft: "20px",
                  boxShadow:
                    "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)"
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height:"100%"
                  }}
                >
                  <Avatar
                    src={`../images/${engineerImageMap[engineer.id]}`}
                    alt={engineer.name}
                    sx={{ width: 100, height: 100, marginBottom: "50px" }}
                  />
                  <Typography variant="h5" component="h2" sx={{ marginBottom: "10px" }}>
                    {engineer.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mb: 1, marginBottom: "10px" }}
                  >
                    Roles: {engineer.roles.join(", ")}
                  </Typography>
                  <ButtonComponent
                    content={"Add Proposal"}
                    sx={{ fontSize: "10px" }}
                    variant="contained"
                    handleClick={() =>
                      handleProposalClick(engineer.id)
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default AssociatedEngineers;
