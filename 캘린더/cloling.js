import axios from 'axios'
import cheerio from 'cheerio'
// const axios = require('axios');
// const cheerio = require('cheerio');

const getHTML = async (number) => {
  try {
    return await axios.get("https://youth.seoul.go.kr/site/main/customSupp/cityList?cp="+number+"&pageSize=5&polyBizSecd1=CT&csYear=2022");
  } catch (error) {
    console.error(error);
  } 
}

const parsing = async (number) => {
  const html = await getHTML(number);
  const $ = cheerio.load(html.data);
  const $servicepolicy1=$(".service-policy1").children("li")

  let  courses =[];

  $servicepolicy1.each((idx,node) =>{
   courses.push({
    title :$(node).find("a").text(),
    detail :$(node).find("p").text(),
   })
  });
  console.log(courses);
  return courses;
}

parsing(1);
parsing(2);
parsing(3);


// const dataset = async (number) =>{
//   const data = await parsing(number);
//   const texting = document.getElementById("page1");
//   texting.innerHTML = data;
// }

// const firstdata = async (page) => {
//   let first = await Json.parse(parsing(page))
//   document.getElementById("page"+page).innerHTML = first.title;
// };
//firstdata(1)

// let retData1 = async(page)=>{

// await parsing(1).then(data => JSON.stringify(retData1)).then(data => {data});
// console.log(retData1);
// }


// function 

// const promise = getPromise(parsing(3));

// const getData = () => {
//     promise.then((appData) => {
//         console.log(appData);
//     });
// };

// getData();



