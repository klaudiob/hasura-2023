import { TableCell, TableRow } from "@mui/material";

const dateOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric"
};

const TableRowComponent = ({ sx, component, scope, align, item, additionalCell }) => {
  return (
    <TableRow sx={sx}>
      <TableCell component={component} scope={scope}>
        {item.user.name}
      </TableCell>
      <TableCell align={align}>{new Date(item.badge_version).toLocaleDateString(undefined, dateOptions)}</TableCell>
      <TableCell align={align}>{item.badges_version.title}</TableCell>
      <TableCell align={align}>{item.proposal_description}</TableCell>
      {additionalCell ? additionalCell : null}
    </TableRow>
  );
};

export default TableRowComponent;
