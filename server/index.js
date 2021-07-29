var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

var store = [];

const PORT = 3001;

app.get("/getAll", (req, res) => {
  try {
    res.send({data: store});
  } catch (error) {
    console.log('error getAll',error);
  }
});

app.post("/add", function(req, res)  {
  try {
    if(req.body!=null){
      store.push(req.body);
    }
    res.send({data: store});
  } catch (error) {
    console.log('error add',error);
  }
});

app.post("/markComplete", (req, res) => {
  try {
      store.map(task => {
        if (task.id === req.body.id) {
          task.isCompleted = !task.isCompleted;
        }
      })
      res.send({data: store});
  } catch (error) {
    console.log('error markComplete',error);
  }
});

app.post("/delete", (req, res) => {
  try {
    if(req.body.id!=null){
      store = store.filter(task => task.id !== req.body.id);
    }
    res.send({data: store});
  } catch (error) {
    console.log('error delete',error);
  }
});

app.post("/clearCompleted", (req, res) => {
  try {
    store = store.filter(task => !task.isCompleted);
    res.send({data: store});
  } catch (error) {
    console.log('error clearComplete',error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});