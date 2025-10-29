CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_image TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT NOT NULL,
    housing_type TEXT NOT NULL,
    household_size INTEGER NOT NULL,
    eco_goals TEXT[] NOT NULL,
    house_number TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL
);