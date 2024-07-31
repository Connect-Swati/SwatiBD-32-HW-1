let express = require("express");
let app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});

let users = [
  {
    id: 1,
    username: "ankit",
    fullName: "Ankit Kumar",
    email: "ankit@gmail.com",
  },
  {
    id: 2,
    username: "dhananjit",
    fullName: "Dhananjit Singh",
    email: "dhananjit.singh@gmail.com",
  },
];

let creditCards = [
  { number: "1234567890123456", holder: "John Doe", expiry: "12/24" },
  { number: "9876543210987654", holder: "Jane Smith", expiry: "06/23" },
];

let books = [
  { isbn: "9783161484100", title: "Example Book", author: "John Author" },
  { isbn: "9781234567897", title: "Another Book", author: "Jane Writer" },
];

let people = [
  { ssn: "123-45-6789", name: "John Doe", birthDate: "1990-01-01" },
  { ssn: "987-65-4321", name: "Jane Smith", birthDate: "1985-05-05" },
];

/*
Exercise 1: Check username availability

Create an endpoint username/find/:username which accepts an username and checks if the username is available for creating a new account.

Declare a variable username to accept the input.


Note: This means that if we already have a user in the users array with the same username, we’ll have to return the response as Username is not available to indicate that the username is already taken.

API Call:

http://localhost:3000/username/find/ankit123

Expected Output:

{
  result: 'Username is available'
}
*/
function checkAvailabilityByUserName(userNameInArr, usernameProvided) {
  return userNameInArr === usernameProvided;
}
app.get("/username/find/:username", (req, res) => {
  let username = req.params.username;
  let result = users.find((eachUser) =>
    checkAvailabilityByUserName(eachUser.username, username),
  );

  if (result) {
    res.json({ result: "Username is not available" });
  } else {
    res.json({ result: "Username is available" });
  }
});

/*
Exercise 2: Find Credit Card Number

Create an endpoint /credit-cards/find that accepts a cardNumber from the query parameters.

Define the variable name for the credit card number as cardNumber.

Write a function findCreditCard to find the credit card number in an array of credit card objects.

Respond with the found credit card details.

API Call:

http://localhost:3000/credit-cards/find?cardNumber=1234567890123456

Expected Output:

{
  creditCard: {
    number: '1234567890123456',
    holder: 'John Doe',
    expiry: '12/24
  }
}
*/
function findCardDetails(eachcard, cardNumber) {
  return eachcard.number === cardNumber;
}
app.get("/credit-cards/find", (req, res) => {
  let cardNumber = req.query.cardNumber;
  let creditCard_details = creditCards.find((eachcard) =>
    findCardDetails(eachcard, cardNumber),
  );
  console.log(creditCard_details);
  res.json({ creditCard: creditCard_details });
});

/*
Exercise 3: Find Email Address

Create an endpoint /emails/find that accepts an email from the query parameters.

Define the variable name for the email address as email.

Write a function findUserByEmail to find the email address in an array of user objects.

Respond with the found user details.

API Call:

http://localhost:3000/emails/find?email=ankit@gmail.com

Expected Output:

{
  user: {
    email: 'ankit@gmail.com',
    fullName: 'Ankit Kumar',
    username: 'ankit',
    id: 1
  }
}
*/
function findUserByEmail(eachUser, email) {
  return eachUser.email === email;
}
app.get("/emails/find", (req, res) => {
  let email = req.query.email;
  let user_details = users.find((eachUser) => findUserByEmail(eachUser, email));
  // edge case check - self study
  //additional self study to handle if user not present.can put similar checks in all excersises like this
  if (!user_details) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user: user_details });
});
/*
Exercise 4: Find ISBN Number ( for books )

Create an endpoint /books/find that accepts an isbn from the query parameters.

Define the variable name for the ISBN number as isbn.

Write a function findBookByISBN to find the book by ISBN in an array of book objects.

Respond with the found book details.

API Call:

http://localhost:3000/books/find?isbn=9783161484100

Expected Output:

{
  book: {
    isbn: '9783161484100',
    title: 'Example Book',
    author: 'John Author'
  }
}
*/
function findBookByISBN(eachBook, isbn) {
  return eachBook.isbn === isbn;
}

app.get("/books/find", (req, res) => {
  let isbn = req.query.isbn;
  let book_details = books.find((eachBook) => findBookByISBN(eachBook, isbn));
  // self study to handle edge case
  /* note
  here put  return before res.status(404).json({ error: "Book not found" }) to ensure that the function exits after sending the 404 response, preventing the subsequent res.json({ book: book_details }); from executing.
  */
  if (!book_details) {
    console.log("Book not found");
    return res.status(404).json({ error: "Book not found" });
  }
  res.json({ book: book_details });
});

/*
Exercise 5: Find Social Security Number (SSN)

Create an endpoint /ssn/find that accepts an ssn from the query parameters.

Define the variable name for the SSN as ssn.

Write a function to find the SSN in an array of person objects.

Respond with the found person details.

API Call:

http://localhost:3000/ssn/find?ssn=123-45-6789

Expected Output:

{
  person: {
    ssn: '123-45-6789',
    name: 'John Doe',
    birthDate: '1990-01-01'
  }
}
*/
function findPersonDetailsBySSN(ssn) {
  let result = people.find((eachPerson) => eachPerson.ssn === ssn);
  return result;
}

app.get("/ssn/find", (req, res) => {
  let ssn = req.query.ssn;
  let personDetails = findPersonDetailsBySSN(ssn);
  /* self study : 
  here instead calling find here inside get request, i will write find logic inside function itself for clean code. similar can be done for aboves
  */
  if (!personDetails) {
    return res.status(404).json({ error: "Person not found" });
  }
  res.json({ person: personDetails });
});
