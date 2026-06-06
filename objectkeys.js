let obj = {
    name: "John",
    age: 22,
    city: "Hyderabad"
};

for (let key in obj) {
    console.log(key + ": " + obj[key]);
}