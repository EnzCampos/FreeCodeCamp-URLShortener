require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

var urlList = ["https://boilerplate-project-urlshortener.enzocampos1.repl.co"]

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req,res) => {
  if (/(https?):[\/]{2}[w]{3}\.\S+.com/g.test(req.body.url)) {
    urlList.push(req.body.url)
    console.log(urlList)
    return res.json({
      original_url: req.body.url,
      short_url: urlList.indexOf(req.body.url)
  })}
  return res.json({ error: 'invalid url' })
})

app.get('/api/shorturl/:short', (req,res) => {
  if (urlList[req.params.short]) {
    return res.redirect(urlList[req.params.short])
  }
  return res.json({error: "Invalid Short Url"})
})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
