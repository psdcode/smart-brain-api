BEGIN TRANSACTION;

INSERT INTO users (
  name,
  email,
  age,
  pet,
  entries,
  joined
)
values (
  'Bofman',
  'bof@bof.com',
  55,
  'Dragon',
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
