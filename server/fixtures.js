if (Farmers.find().count() === 0) {
    Farmers.insert({
        title: 'Napa Farms',
        location: 'California'
    });

    Farmers.insert({
        title: 'Stowe Farms',
        location: 'Maine'
    });
}