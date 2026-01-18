
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);


CREATE TABLE IF NOT EXISTS api_request_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    method VARCHAR(10) NOT NULL,
    url TEXT NOT NULL,
    headers JSONB,
    query_params JSONB,
    path_params JSONB,
    request_body JSONB,

    user_id UUID,
    user_email VARCHAR(255),

    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(100),

    status_code INT NOT NULL,
    response_body JSONB,
    response_time_ms INT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_api_logs_user
      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE SET NULL
);


CREATE INDEX IF NOT EXISTS idx_api_logs_created_at
ON api_request_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_api_logs_user_id
ON api_request_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_api_logs_status_code
ON api_request_logs(status_code);

CREATE INDEX IF NOT EXISTS idx_api_logs_method
ON api_request_logs(method);
