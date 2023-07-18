import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from './components/CandidatureProposal/CandidatureProposals';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RuleIcon from '@mui/icons-material/Rule';
import ApprovalRejectionIssues from "./Managers/ApprovalRejectionIssues";
import AddCandidatureProposal from './components/CandidatureProposal/AddCandidatureProposal';

const managerMenuItems = [
  {
    link: "managers/badges",
    text: "Badges",
    icon: <MilitaryTechIcon/>
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    icon: <GroupWorkIcon/>
  },
  {
    link: "managers/CandidatureProposals",
    text: "Candidature Proposals",
    icon: <PostAddIcon/>
  },
  {
    link: "managers/IssuingRequest",
    text: "Issuing Request",
    icon: <RuleIcon/>
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="managers/badges"
    drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
    mobileUtils={managerMenuItems}
    routes={[
      {
        path: "managers/AssociatedEngineers",
        element: <AssociatedEngineers />,
      },
      {
        path: "managers/badges",
        element: <AvailableBadges />,
      },
      {
        path: 'managers/AddCandidatureProposal/:engineerId/:engineerName',
        element: <AddCandidatureProposal />,      
      },
      {
        path: "managers/CandidatureProposals",
        element: <CandidatureProposals />,
      },
      {
        path: "managers/IssuingRequest",
        element: <ApprovalRejectionIssues />,
      },
    ]}
  />
);

export default AppManager;
