CONSISTENCY QUORUM;

CREATE TABLE IF NOT EXISTS instaphant.post (
    id text PRIMARY KEY,
    author_id text,
    author_name text,
    description text,
    image text
);

INSERT INTO instaphant.post (id, author_id, author_name, description, image) VALUES ( 'post-1', 'user-1', 'John Smith', 'a description', 'https://fastly.picsum.photos/id/480/200/300.jpg?hmac=-NCJbhpqFCFd17uR0DXt17Ccp5H073pZLLaStM6erZg' ) IF NOT EXISTS;
INSERT INTO instaphant.post (id, author_id, author_name, description, image) VALUES ( 'post-2', 'user-1', 'John Smith', 'a description', 'https://fastly.picsum.photos/id/47/200/300.jpg?hmac=qgEtmhYzb3otRNnLN3afPLzmn6VJKj6x86OGOjDcBxQ' ) IF NOT EXISTS;
INSERT INTO instaphant.post (id, author_id, author_name, description, image) VALUES ( 'post-3', 'user-2', 'Jane Smith', 'a description', 'https://fastly.picsum.photos/id/44/200/300.jpg?hmac=XVdwVrJGHwXEzGWC6cZoztYj9nazQEbeWv9VrPmoqps' ) IF NOT EXISTS;
INSERT INTO instaphant.post (id, author_id, author_name, description, image) VALUES ( 'post-4', 'user-3', 'Jane Smith', 'a description', 'https://fastly.picsum.photos/id/881/200/300.jpg?hmac=OaIsS2cuxcnUpCVdxcFoc8JwfJgzWEv2Z9F_qEN9tHU' ) IF NOT EXISTS;
