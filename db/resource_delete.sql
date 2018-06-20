DELETE FROM contacts WHERE resourceid = $1;
DELETE FROM resources WHERE id = $1;
