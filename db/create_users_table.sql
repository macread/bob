CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    avatar TEXT,
    username TEXT,
    email TEXT,
    resouces INTEGER,
    contacts INTEGER,
    meetings INTEGER
)