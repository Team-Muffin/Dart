var express = require('express');
var router = express.Router();

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', async (req, res, next) => {
  console.log(req.params.id)
  let corpId = req.params.id
  console.log(corpId)
  try {
    const corpDetail = await getCorpDetail(corpId, '2023', '11011', 'M210000');
    res.json(corpDetail);
  } catch (error) {
    next(error);
  }
});

async function getCorpDetail(id, bsns_year, reprt_code, idx_cl_code){
  let crtf_key = process.env.CRTF_KEY;

  const resp = await axios.get(`https://opendart.fss.or.kr/api/fnlttSinglIndx.json?crtfc_key=${crtf_key}&corp_code=${id}&bsns_year=${bsns_year}&reprt_code=${reprt_code}&idx_cl_code=${idx_cl_code}`);
  console.log(resp.data)
  return resp.data;
}


module.exports = router;
