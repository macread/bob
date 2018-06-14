CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users (id),
    date DATE,
    type VARCHAR(30),
    title VARCHAR(100),
    url TEXT,
    description TEXT
)