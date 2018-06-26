WITH inserted AS (
INSERT INTO networks (name, address, mobile, work, notes)
VALUES ($2, $3, $4, $5, $6) RETURNING *
)

INSERT INTO cr_networks (contactid, networkid) 
SELECT  $1 ,inserted.id FROM inserted;