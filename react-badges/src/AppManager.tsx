import React from "react";
import CandidatureProposals from "./CandidatureProposals";

import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="dashboard"
    routes={[
      {
        path: "dashboard",
        element: (<div>
          <CandidatureProposals />
        </div>)
      }
    ]}
  />
);

export default AppManager;


