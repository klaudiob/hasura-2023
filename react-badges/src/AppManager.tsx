import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from "./CandidatureProposals";

const managerMenuItems = [
  {
    link: "managers/badges",
    text: "Badges"
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members"
  },
  {
    link: "managers/CandidatureProposals",
    text: "Candidature Proposals"
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="managers"
    drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
    mobileUtils={managerMenuItems}
    routes={[
      {
        path: "managers/badges",
        element: (
          <div>
            {/* <CandidatureProposals /> */}
            {/* <AssociatedEngineers/> */}
          </div>
        )
      },
      {
        path: "managers/AssociatedEngineers",
        element: (
          <div>
            <AssociatedEngineers />
          </div>
        )
      },
      {
        path: "managers/badges",
        element: (
          <div>
            <AvailableBadges />
          </div>
        )
      },
      {
        path: "managers/CandidatureProposals",
        element: (
          <div>
            <CandidatureProposals />
          </div>
        )
      }
    ]}
  />
);

export default AppManager;
