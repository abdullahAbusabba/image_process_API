import express from "express";
import { promises as fs } from 'fs';
const sharp = require("sharp");

const images = express.Router();
const glob = require("glob");




images.get("/", (req: express.Request , res: express.Response) => {
  res.send("good")
  res.status(200);


const dir:string = __dirname.split("/").slice(0,-2).join("/")+"/assets";

const filename:string = (req.query.filename ?? undefined) as string;
const width:string = (req.query.width ?? undefined) as string;
const hight:string = (req.query.hight ?? undefined) as string;
const queries = [filename,width,hight]
const isUndefined = queries.every( (element) => typeof element == 'undefined');



glob( `${dir}/full/*.*`, async function( err:Error, files:string[]):Promise<void> {
  
 
  if(!isUndefined && files.includes(`${dir}/full/${filename}`)){
      // processImage(`${dir}/full/${filename}`,dir);

      try {

  const info = await sharp(`${dir}/full/${filename}`).png().toFile(dir+"/thump/test.png");
  console.log(info);

} catch(err){

  console.log({error:err instanceof Error ? err.message : "Failed to do something exceptional" })
 
  };
      
    // files.forEach(function(item:string, index:number):void{
    //     const file:string = item.split("/")[item.split("/").length-1];
    //     console.log(index,file);
    //   });
  };

  
 
});


  
  // if (!isUndefined){
  //   // process image 
  //   // if(req.query.filename)
  // };

});

async function processImage(path:string,dir:string):Promise<void>{

try {

  const info = await sharp(path).png().toFile(dir+"/thump/test.png");
  console.log(info);

} catch(err){

  console.log({error:err instanceof Error ? err.message : "Failed to do something exceptional" })
 
  }

};


export default images;
