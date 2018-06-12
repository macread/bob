CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    avatarURL TEXT,
    username TEXT,
    email TEXT,
    resourceGoal INTEGER,
    contactGoal INTEGER,
    factToFaceGoal INTEGER
)
