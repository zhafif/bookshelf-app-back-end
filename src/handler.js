const {nanoid} = require('nanoid');
const books = require('./books');

//menambahkan buku
const addBooksHandler = (Request, h) => {
    const{name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const finished = false;
    const id = nanoid(16);
    //jika pageCount sama dengan identik readPage
    if(pageCount === readPage){
        finished = true;
    }
    const insertedAt = new Date().toISOString;
    const updatedAt = insertedAt;
    //jika name tidak ada
    if(name !== undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',  
        });
        response.code(400);
        return response;
    }
    //jika readPage lebih besar dari pageCount
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
    };
    //menambahkan buku baru
    books.push(newBooks);
    const isSuccess = books.filter((books) => books.id === id).length > 0;
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(201);
        return response;
    }
    response.code(500);
    return response;
};

//menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
    const {name, reading, finished} = request.query;
    const f_BooksName = books;
    
    if(name !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                books: f_BooksName.filter((books) => books.name.toLowerCase().includes(name.toLowerCase())).map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    if(reading !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                books: f_BooksName.filter((books) => books.reading === Number(reading)).map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    if(finished !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                books: f_BooksName.filter((books) => books.finished === Number(finished)).map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'success',
        data: {
            books: f_BooksName.map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const getDetailedBooksHandler = (request, h) => {
    const {id}  = request.params;
    const f_Books = books;
    
    f_Books.filter((books) => books.id === id)[0];
    if (books !== undefined) {
      return {
        status: 'success',
        data: {
          books,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBooksByIdHandler = (request, h) => {
    const {id} = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    if(name === null){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const indeks = books.findIndex((books) => books.id === id);

    if(indeks !== -1){
        books[indeks] = {
            ...books[indeks],
            name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBooksByIdHandler = (request, h) => {
    const {id} = request.params;

    const indeks = books.findIndex((books) => books.id === id);
    if(indeks !== -1){
        books.splice(indeks, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBooksHandler,
    getAllBooksHandler,
    getDetailedBooksHandler,
    editBooksByIdHandler,
    deleteBooksByIdHandler,
};