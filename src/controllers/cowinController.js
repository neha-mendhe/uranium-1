let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getDistrictsByDate = async function (req, res) {
  try {
      let district_id = req.query.district_id
      let date = req.query.date
      var options = {
          method: "get",
          url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
      }
      let result = await axios(options)
      console.log(result.data)
      res.status(200).send({ msg: result.data })
  }
  catch (err) {
      console.log(err)
      res.status(500).send({ msg: err.message })
  }
}

let getMemeList = async function(req,res){
  try {
      let options={
          method:"get",
          url:`https://api.imgflip.com/get_memes`
      }
      let result = await axios(options);
      console.log(result);
      let data = result.data;
      console.log(data);
      res.status(200).send({msg:data,status:true})
  } catch (error) {
      console.log(error)
      res.status(500).send({msg:error.message})
  }
}

let createMeme = async function(req,res){

  try {
      let id = req.query.id
      let text0 = req.query.text0
      let text1 =req.query.text1
      let username = req.query.username
      let password = req.query.password

     let options={
         method:"post",
         url:`https://api.imgflip.com/caption_image?template_id=${id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
     } 

     let result= await axios(options);
     console.log(result)
     let data= result.data
     res.status(200).send({msg:data,status:true})
  } catch (error) {
      console.log(error)
      res.status(500).send({msg:error.message})
  }
}
let getSortedcities = async function (req, res) {
  try {
      let cityObjArry = [ ]
      let cities =["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
      for (let i = 0; i < cities.length; i++) {
          let obj = {city:cities[i]}
          let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=396a08da0216fb31a7c0c3bb55821d41`)
          console.log(resp.data.main.temp)
          obj.temp= resp.data.main.temp
          cityObjArry.push(obj)
      }
      let sorted = cityObjArry.sort (function(a,b){
          return a.temp-b.temp})
          console.log(sorted)
          res.status(200).send({status:true,data:sorted})
      
  }
  catch (error) {
      console.log(error)
      res.status(500).send({ status:false,msg: "server error"})
  }
}
// const getWether = async function(req,res){
//     const {city, api_key} =req.body
//     const options={
//         method: "get",
//         url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
//     }
//     let result = await axios(options);
//     let temp = result.data.main.temp
//     res.status(200).send({data:temp})
// }

// let getAllCountry = async function (req, res) {

//     try {
//         let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
//         let tempOfCities=[];
//         for(let i=0;i<cities.length;i++)
//         {
//         let checkCity= {city:cities[i]};
        
       
//         let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=1b8cbf61cf91c404345a72ea98a3c238`);
//         console.log(result);
//         let gettingTemp=result.data.main.temp;
//         console.log(gettingTemp);
//         checkCity.temp=gettingTemp;
//         tempOfCities.push(checkCity);
//     }
//        let tempSortedCities=tempOfCities.sort(function(x,y){return x.temp-y.temp});

//         res.status(200).send({ status: true ,data : tempSortedCities })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }




//module.exports.getWether=getWether
//module.exports.getAllCountry=getAllCountry
module.exports.getMemeList=getMemeList
module.exports.createMeme=createMeme
module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrictsByDate=getDistrictsByDate
module.exports.getSortedcities = getSortedcities