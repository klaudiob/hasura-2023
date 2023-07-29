
CREATE TABLE manager_to_engineer_badge_candidature_proposals (
  id SERIAL PRIMARY KEY, 
  engineer INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  badge_id INTEGER NOT NULL,
  badge_version TIMESTAMP NOT NULL,
  proposal_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (badge_id, badge_version) REFERENCES badges_versions(id, created_at)
);



CREATE TABLE engineer_badge_candidature_proposal_response (
  response_id SERIAL PRIMARY KEY,
  is_approved BOOLEAN NOT NULL,
  disapproval_motivation VARCHAR(255) DEFAULT NULL,
  proposal_id INTEGER NOT NULL REFERENCES manager_to_engineer_badge_candidature_proposals(id) ON DELETE RESTRICT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by INTEGER REFERENCES users(id) ON DELETE RESTRICT
);




CREATE OR REPLACE FUNCTION get_approved_responses_by_manager(manager_id INTEGER)
RETURNS SETOF engineer_badge_candidature_proposal_response
AS $$
BEGIN
  RETURN QUERY
  SELECT r.*
  FROM engineer_badge_candidature_proposal_response r 
  LEFT JOIN manager_to_engineer_badge_candidature_proposals p ON r.proposal_id = p.id
  WHERE p.created_by = manager_id AND r.is_approved = TRUE;
END;
$$ LANGUAGE PLPGSQL;



CREATE OR REPLACE FUNCTION get_engineers_by_manager(manager_id INTEGER)
  RETURNS SETOF public.users AS
$$
BEGIN
  RETURN QUERY
    SELECT u.*
    FROM public.users_relations r
    INNER JOIN public.users u ON r.engineer = u.id
    WHERE r.manager = manager_id;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_managers_pending_proposals_for_engineers(managerId INTEGER)
  RETURNS SETOF manager_to_engineer_badge_candidature_proposals AS
$$
BEGIN
  RETURN QUERY
    SELECT *
    FROM manager_to_engineer_badge_candidature_proposals
    WHERE id NOT IN (
      SELECT proposal_id
      FROM engineer_badge_candidature_proposal_response
    )
    AND created_by = managerId;

  RETURN;
END;
$$ LANGUAGE plpgsql;