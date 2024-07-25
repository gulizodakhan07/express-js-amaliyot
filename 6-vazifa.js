// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Xotirada saqlanadigan ma'lumotlar
// let data = [
//   { id: 1, title: "hello world", is_done: false },
//   { id: 2, title: "node js is awesome", is_done: true },
// ];

// // Barcha vazifalarni olish
// app.get("/tasks", (req, res) => {
//   res.send(data);
// });

// // ID bo'yicha bitta vazifani olish
// app.get("/tasks/:taskId", (req, res) => {
//   const taskId = parseInt(req.params.taskId);
//   const task = data.find((t) => t.id === taskId);

//   if (task) {
//     res.send(task);
//   } else {
//     res.status(404).send({ message: "Task not found" });
//   }
// });

// // Yangi vazifa yaratish
// app.post("/tasks", (req, res) => {
//   const newTask = req.body;
//   newTask.id = data.length ? data[data.length - 1].id + 1 : 1;
//   data.push(newTask);

//   res.status(201).send(newTask);
// });

// // Vazifani yangilash (PUT) - to'liq yangilash
// app.put("/tasks/:taskId", (req, res) => {
//   const taskId = parseInt(req.params.taskId);
//   const taskIndex = data.findIndex((t) => t.id === taskId);

//   if (taskIndex !== -1) {
//     data[taskIndex] = { ...req.body, id: taskId };
//     res.send(data[taskIndex]);
//   } else {
//     res.status(404).send({ message: "Task not found" });
//   }
// });

// // Vazifani qisman yangilash (PATCH) - qisman yangilash
// app.patch("/tasks/:taskId", (req, res) => {
//   const taskId = parseInt(req.params.taskId);
//   const taskIndex = data.findIndex((t) => t.id === taskId);

//   if (taskIndex !== -1) {
//     data[taskIndex] = { ...data[taskIndex], ...req.body };
//     res.send(data[taskIndex]);
//   } else {
//     res.status(404).send({ message: "Task not found" });
//   }
// });

// // Vazifani o'chirish
// app.delete("/tasks/:taskId", (req, res) => {
//   const taskId = parseInt(req.params.taskId);
//   const taskIndex = data.findIndex((t) => t.id === taskId);

//   if (taskIndex !== -1) {
//     const deletedTask = data.splice(taskIndex, 1)[0];
//     res.send(deletedTask);
//   } else {
//     res.status(404).send({ message: "Task not found" });
//   }
// });

// // Serverni ishga tushirish
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// 2-misol

const express = require("express");
const cors = require("cors");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: false, 
    uploadDir: path.join(__dirname, 'uploads'), 
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send({ message: "File upload failed", error: err });
    }

    const fileUrl = `/uploads/${path.basename(files.file.filepath)}`;
    res.send({
      message: "File uploaded successfully",
      fileUrl: fileUrl,
    });
  });
})
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
