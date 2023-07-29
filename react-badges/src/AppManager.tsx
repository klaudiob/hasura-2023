import React, { useContext } from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./views/manager/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./views/manager/AvailableBadges";
import CandidatureProposals from "./views/manager/CandidatureProposals";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RuleIcon from "@mui/icons-material/Rule";
import ApprovalRejectionIssues from "./views/manager/ApprovalRejectionIssues";
import ManagerCandidatureProposals from "./views/manager/ManagerCandidatureProposals";
import AddCandidatureProposal from "./views/manager/AddCandidatureProposal";
import { AuthContext } from "./state/with-auth";
import { users } from "./views/LoginView";
import './App.css';

const managerMenuItems = [
  {
    link: "managers/Badges",
    text: "Badges",
    icon: <MilitaryTechIcon />
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    icon: <GroupWorkIcon />
  },
  {
    link: "managers/CandidatureProposals",
    text: "Engineer Proposals",
    icon: <PostAddIcon />
  },
  {
    link: "managers/ManagerCandidatureProposals",
    text: "Manager Proposals",
    icon: <PostAddIcon />
  },
  {
    link: "managers/IssuingRequest",
    text: "Issuing Request",
    icon: <RuleIcon />
  }
];

const AppManager: React.FC = () => {
  const { managerId } = useContext(AuthContext);
  const manager = users.find((user) => user.id === managerId);

  return (
    <AppEntrypoint
      icon={<ManagerIcon />}
      title={`${manager?.name} (Manager)`}
      defaultRoute="managers/Badges"
      drawerContents={[
        <DrawerMenu title="Manager:" items={managerMenuItems} />
      ]}
      routes={[
        {
          path: "managers/AssociatedEngineers",
          element: <AssociatedEngineers />
        },
        {
          path: "managers/badges",
          element: <AvailableBadges />
        },
        {
          path: 'managers/AddCandidatureProposal/:engineerId',
          element: <AddCandidatureProposal />,      
        },
        {
          path: "managers/AddCandidatureProposal",
          element: <AddCandidatureProposal />
        },
        {
          path: "managers/CandidatureProposals",
          element: <CandidatureProposals />
        },
        {
          path: "managers/ManagerCandidatureProposals",
          element: <ManagerCandidatureProposals />
        },
        {
          path: "managers/IssuingRequest",
          element: <ApprovalRejectionIssues />
        }
      ]}
    />
  );
};

export default AppManager;
