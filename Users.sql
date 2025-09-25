CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(70) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_notes(
    note_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    note_title VARCHAR(255) NOT NULL,
    note_text VARCHAR(5000)
);