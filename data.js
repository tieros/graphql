const authors = [
    {
        id: '1',
        name: 'Albert',
        surname: 'Camus',
        age: 58,
    },
    {
        id: '2',
        name: 'Martin',
        surname: 'Heidegger',
        age: 58,
    },
];

const books = [
    {
        id: '1',
        title: '1984',
        author_id: "1",
        score: 7.8,
        isPublished: true,
    },
    {
        id: '2',
        title: 'Deneme',
        author_id: "2",
        score: 1.8,
        isPublished: false,
    },
];

module.exports={
    authors,
    books
}