CREATE TABLE networks (
    id SERIAL PRIMARY KEY,
    name varchar(100),
    address text,
    mobile varchar(10),
    work  varchar(10),
    email varchar(100),
    notes text
)