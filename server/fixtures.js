if (Posts.find().count() === 0) {
    Posts.insert({
        produce: 'Kale',
        price: '4.99',
        author: 'baeFarms',
    });

    Posts.insert({
        produce: 'Bananas',
        price: '0.99',
        author: 'Chiquita',
    });
}