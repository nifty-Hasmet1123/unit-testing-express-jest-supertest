import express from "express";

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// global data sample
const data = [
    {
        id: 1,
        name: "john_doe",
        email: "john.doe@example.com"
    },
    {
        id: 2,
        name: "sarah_doe",
        email: "sarah.doe@example.com"
    },
]


// sample get and request function from express
app.get("/api/get", (req, res) => {
    return res.status(200).json(data)
});


// sample get by pk
app.get("/api/get/:pk", (req, res) => {
    const { pk } = req?.params
    
    const filter = data.filter(item => item?.id === Number(pk));

    // assuming id number is unique
    if (filter.length > 0) {
        const foundItem = filter[0];

        return res.status(200).json({
            id: foundItem?.id,
            name: foundItem?.name,
            email: foundItem?.email
        })
    }

    return res.status(404).json({ error: "item does not exist" })
});

// sample post api
app.post("/api/post", (req, res) => {
    const { id, name, email } = req?.body;

    if (!id || !name || !email) {
        return res.status(400).json({ error: "id, name and email should be included" })
    } else {
        const newData = { id: id, name: name, email: email };
        data.push(newData);
        
        return res.status(201).json(newData);
    };
})


export default app;