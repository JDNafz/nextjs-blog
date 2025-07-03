-- Drop tables if they already exist (in reverse dependency order)
DROP TABLE IF EXISTS comments,blog_posts,users;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Blog Posts Table
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    body TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);


-- Comments Table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO
	users (name, password, email)
VALUES
	('JD', 'nafnaf', 'naf@naf'),
	('GenericUser', 'user', 'user@user'),
	('Bruce', 'bruce', 'bruce@bruce');

INSERT INTO
	blog_posts (title, slug, body, author_id)
VALUES
	('My title', 'my-title', 'this is the body of the post', 1),
	('My title2', 'my-title2', '2222this is the body of the post', 1),
	('Next.js Tips', 'nextjs-tips', 'Useful Next.js tips.', 2),
	('PostgreSQL Basics', 'postgresql-basics', 'Intro to PostgreSQL.', 2),
	('Docker Setup', 'docker-setup', 'How to use Docker.', 3),
	('REST API Guide', 'rest-api-guide', 'Building REST APIs with Express.', 3);

INSERT INTO
	comments (content, post_id, user_id)
VALUES
	('Great post!', 1, 2),
	('Thanks for sharing!', 1, 3),
	('Helpful tips.', 2, 3),
	('I learned something new.', 2, 1),
	('Love it!', 3, 1),
	('Awesome write-up.', 3, 2),
	('Very clear explanation.', 4, 1),
	('Saved me a lot of time.', 4, 3),
	('Just what I needed.', 5, 2),
	('Perfect guide.', 5, 1),
	('So helpful, thanks!', 6, 2),
	('Bookmarking this one.', 6, 3);