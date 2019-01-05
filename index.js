const app = require('./src/app');

app.listen(process.env.PORT, () => {
    console.log(`Server is running at localhost:${process.env.PORT}`);
});