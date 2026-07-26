const express = require('express');
const app = express()
const port = 3000

// // Rquery parameters: /sum?a=5&b=10

// app.get('/sum', (req, res) => {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   const sum  = a + b;

//   res.json({
//     Ans : sum
//   })
// })

// app.get('/sub', (req, res) => {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   const sub  = a - b;

//   res.json({
//     Ans : sub
//   })
// })

// app.get('/mul', (req, res) => {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   const mul  = a * b;

//   res.json({
//     Ans : mul
//   })
// })

// app.get('/div', (req, res) => {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   const div  = a / b;

//   res.json({
//     Ans : div
//   })
// })

// ................................................................




// Path parameters: /sum/5/10

app.get('/sum/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const sum = a + b;

  res.json({
    Ans: sum
  });
});

app.get('/sub/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const sub = a - b;

  res.json({
    Ans: sub
  });
});

app.get('/mul/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const mul = a * b;

  res.json({
    Ans: mul
  });
}
);

app.get('/div/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const div = a / b;

  res.json({
    Ans: div
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})