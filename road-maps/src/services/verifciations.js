export function emailHasBeenUsed(msg) {
  let start = 'Duplicate field value "';
  let end = '",please use another value';
  const regex = RegExp(`^${start}.*${end}$`);
  const result = regex.test(msg);
  return result;
}
// "name":"ali",
//   "email":"ali@gmail.com",
//   "password":"test1234",
//   "passwordConfirm":"test1234",
//   "photo":"default.jpg",
//   "role":"Beginner"
