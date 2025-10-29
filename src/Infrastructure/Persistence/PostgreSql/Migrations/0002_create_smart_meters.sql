CREATE TABLE IF NOT EXISTS smart_meters (
    id UUID PRIMARY KEY,
    meter_type TEXT NOT NULL CHECK (meter_type IN ('electricity', 'gas')),
    house_number TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL
);