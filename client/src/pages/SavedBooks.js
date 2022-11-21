// import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
// import Auth from '../utils/auth';
// import { deleteBook } from '../utils/API';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = () => {

  const { loading, data } = useQuery(GET_ME); //removed error
  const [removeBook] = useMutation(REMOVE_BOOK);


const userData = data?.me
console.log(userData);

//Deleting the book via it's bookID
const handleDeleteBook = async (bookId) => {
 try {
  const response = await removeBook({
    variables: { bookId: bookId }
  });

  if (!response) {
    throw new Error('something went wrong!');
  }
  removeBookId(bookId);
  window.location.reload()

 } catch (err) {
  console.error(err);
 }
};

// Loading data 
if (loading) {
  return <h2>LOADING...</h2>;
}

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
