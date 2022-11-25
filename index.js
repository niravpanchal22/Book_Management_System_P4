const express = require("express");

const {users} = require('./data/usrs.json');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(500).json({
    message: "Server is up and running",
  });
});

app.get("/users", (req, res) => {
    res.status(200).json({
      success: true,
      data: users,
    });
  });

app.get('/users/:id', (req, res) => {
    const  { id } = req.params;
    const user = users.find((each ) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    }); 
});

app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

    const user = users.find((each) => each.id === id);

    if (user) {
       return res.status(404).json({
        success: false,
        message: "user exist with this id",
       });
    }
    
    user.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
      success: true,
      data: users,
    });
});

app.get("*", (req, res) => {
    res.status(200).json({
      message: "This route does not exist",
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});