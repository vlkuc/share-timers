create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    pass VARCHAR(255)
);

create TABLE timer(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    timer_name VARCHAR(255),
    start_time BIGSERIAL,
    circle_time BIGSERIAL,
    restart_auto BOOLEAN,
    delay_time SERIAL,
    seen_mode VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);
