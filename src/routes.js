const{
    addBooksHandler,
    getAllBooksHandler,
    getDetailedBooksHandler,
    editBooksByIdHandler,
    deleteBooksByIdHandler,
} = require('./handler');

const routes = [
    {
        //addBooksHandler routes
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        //getAllBooksHandler routes
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        //getDetailedBooksHandler routes
        method: 'GET',
        path: '/books/{id}',
        handler: getDetailedBooksHandler,
    },
    {
        //editBooksByIdHandler routes
        method: 'PUT',
        path: '/books/{id}',
        handler: editBooksByIdHandler,
    },
    {
        //deleteBooksByIdHandler
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooksByIdHandler,
    },
];

module.exports = routes;