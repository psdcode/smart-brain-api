BEGIN TRANSACTION;

INSERT INTO users (
  name,
  email,
  entries,
  joined
)
values (
  'Bofman',
  'bof@bof.com',
  5,
  '2018-10-05'
);

INSERT INTO LOGIN (
  hash,
  email
)
values (
  '$2a$10$HwtkpyDLBjvd8ZcUCgJdFOgw1p/R84eZU0aepc62rNRB/HupocvGC',
  'bof@bof.com'
);

COMMIT;
