DELETE FROM cr_networks WHERE contactid = $1;
DELETE FROM contacts WHERE id = $1;