INSERT INTO users
(username, avatar, auth_id)
VALUES
($1, $2, $3) 
RETURNING *;