const http = require('http');
const fs = require('fs');
const requests = require('requests');
const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal=(tempval,orgval)=>{
let temperture=tempval.replace("{%tempVal%}",Math.floor(orgval.main.temp-270));
temperture=temperture.replace("{%tempminVal%}",Math.floor(orgval.main.temp_min-270));
temperture=temperture.replace("{%tempmaxVal%}",Math.floor(orgval.main.temp_max-270));
temperture=temperture.replace("{%location%}",orgval.name);
temperture=temperture.replace("{%lon%}",orgval.coord.lon);
temperture=temperture.replace("{%sunny%}",orgval.weather[0].description);
temperture=temperture.replace("{%lat%}",orgval.coord.lat.toFixed(2));
temperture=temperture.replace("{%visibility%}",orgval.visibility);
temperture=temperture.replace("{%humidity%}",orgval.main.humidity);
temperture=temperture.replace("{%presure%}",orgval.main.pressure);
temperture=temperture.replace("{%felt%}",Math.floor(orgval.main.feels_like-270));
temperture=temperture.replace("{%country%}",orgval.sys.country);
temperture=temperture.replace("{%sunrise%}",orgval.sys.sunrise);
temperture=temperture.replace("{%sunset%}",orgval.sys.sunset);
return temperture;
 
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('http://api.openweathermap.org/data/2.5/weather?q=kichha&appid=a817891760a86255eb0f2b2b61006bbc')
        .on('data',  (chunk)=> {
        const objData=JSON.parse(chunk);
        const arrData=[objData];
        //   console.log(arrData[0].main.temp);
        const realTimeData=arrData.map((val)=> replaceVal(homeFile,val)).join(" ");
         res.write(realTimeData);
        // console.log(realTimeData);
        })
        .on('end',  (err) =>{
          if (err) return console.log('connection closed due to errors', err);
         res.end();
        });
    }
})
server.listen(8000,"127.0.0.1",()=>{
console.log("server started");
})
