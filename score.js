let  Cheerio  = require("cheerio");
let request= require("request");
//processingSingleMatch("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard");
function processingSingleMatch(url)
{
    request(url+"",match);
}
//request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",match);
function match(error,response,html){
    if(error)
    {
        console.log(error);
    }
    else if (response.statuscode==404)
    {
        console.log("page not found");
    }
    else
    {
        //console.log(html);
        dataExtracter(html);
      
    }
}
function dataExtracter(html)
{
    let searchtool= Cheerio.load(html);
    let bothInningElement = searchtool(".Collapsible");
    let decription=searchtool(".event .description");
    let win=searchtool(".event .status-text").text();
    
    let decriptionArr=decription.text().split(",");
  let venue=decriptionArr[1];
  let date=decriptionArr[2];


    
   for(let i=0;i<bothInningElement.length;i++)
   {   
        
       
    
       //match ki handing lane ke lia
       let teamNameElem=searchtool(bothInningElement[i]).find("h5").text();
       
       teamNameElem=teamNameElem.split("INNINGS")[0];
       console.log(venue+"|"+date+"|"+teamNameElem+"|"+win);
       console.log();
       
       console.log(teamNameElem);
       let bothInningElementWithoutHanding = searchtool(bothInningElement[i]).find(".table.batsman tbody tr");
       
       for(let j=0;j<bothInningElementWithoutHanding.length;j++)
       {    
           let NumberOfCols=searchtool(bothInningElementWithoutHanding[j]).find("td");
           
           if(NumberOfCols.length==8)
           {
               let PlayerName=searchtool(NumberOfCols[0]).text();
               let R=searchtool(NumberOfCols[2]).text();
               
               let B=searchtool(NumberOfCols[3]).text();
               
               let Fours=searchtool(NumberOfCols[5]).text();
               let Sixs=searchtool(NumberOfCols[6]).text();
               let SR=searchtool(NumberOfCols[7]).text();
               process.stdout.write("PlayerName"+ "    "+PlayerName+"\t");
               
               process.stdout.write("Runs"+ "   "+R+"|");
               process.stdout.write("Ball"+ "  "+B+"|");
               process.stdout.write("Fours"+ "   "+Fours+"|");
               process.stdout.write("Sixs"+ "   "+Sixs+"|");
              process.stdout.write("SR"+ "   "+SR+"|");
             console.log()
               console.log("................................................................................................");
               
           }
           
       }
       console.log();
     
   }
    

  
    
}


module.exports ={
    processingSingleMatch
}