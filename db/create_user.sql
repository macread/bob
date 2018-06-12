INSERT INTO users
(username, avatarURL, auth_id)
VALUES
($1, $2, $3) 
RETURNING *;