var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET blog page. */
router.get('/blog.vnd', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});

/* GET post page. */
router.get('/*.:idsanpham', function(req, res, next) {
  var idsp = req.params.idsanpham;
  if(!req.session.sanphamdaxem){
    req.session.sanphamdaxem = [];
  }
  req.session.sanphamdaxem.push(idsp);

  res.render('post', {idsanpham:req.params.idsanpham});
});

/* Mang chua san pham da xem */
router.get('/ds', function(req, res, next) {
  res.render('ds', {danhsach:req.session.sanphamdaxem});
});

module.exports = router;
