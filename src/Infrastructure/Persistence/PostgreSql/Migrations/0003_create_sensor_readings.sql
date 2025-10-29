CREATE TABLE IF NOT EXISTS sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    smart_meter_id UUID NOT NULL REFERENCES smart_meters(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    unit TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_meter_time
    ON sensor_readings (smart_meter_id, timestamp);
