DELETE FROM cr_networks WHERE networkid = $1;
DELETE FROM networks WHERE id = $1;
