DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Groups;
DROP TABLE IF EXISTS UserGroups;

-- USERS
-- TODO: store last online/last connected
CREATE TABLE Users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ) UNIQUE NOT NULL,
  usersecret VARCHAR ( 50 ) NOT NULL,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GROUPS
CREATE TABLE Groups (
  group_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 25 ) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOIN USERS GROUPS
CREATE TABLE UserGroups (
  user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
  group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE
);

-- TEST DATA FOR Users
INSERT INTO Users 
  (username, usersecret, created_at, last_login)
VALUES 
  ('janson', 'ilovepotato', NOW() - interval '8 days', null),
  ('dpuckring0', '111', NOW() - interval '7 days', null),
  ('ssiviour1', '222', NOW() - interval '3 days', NOW() - interval '2 days'),
  ('gsomerled2', '333', NOW() - interval '4 days', null),
  ('wedginton3', '444', NOW() - interval '6 days', NOW() - interval '5 days'),
  ('mshine4', '555', NOW() - interval '8 days', NOW() - interval '7 days'),
  ('marnli5', '666', NOW() - interval '10 days', NOW() - interval '9 days'),
  ('wjohnston6', '777', NOW() - interval '12 days', NOW() - interval '17 days'),
  ('shenstone7', '888', NOW() - interval '14 days', NOW() - interval '13 days'),
  ('chuffey8', '999', NOW() - interval '16 days', NOW() - interval '15 days'),
  ('asandiland9', '000', NOW() - interval '18 days', NOW() - interval '17 days');

-- TEST DATA FOR Groups
INSERT INTO Groups
  (name, created_at)
VALUES
  ('GROUP_0', NOW() - interval '9 days'),
  ('GROUP_1', NOW() - interval '12 days'),
  ('GROUP_2', NOW() - interval '5 days');

-- TEST DATA FOR UserGroups
INSERT INTO UserGroups
  (user_id, group_id)
VALUES
  (3,1),
  (6,1),
  (9,1),
  (1,2),
  (3,2),
  (2,3),
  (4,3);
