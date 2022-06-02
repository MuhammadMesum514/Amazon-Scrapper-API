const express=require('express');
const request=require('request-promise');
require('dotenv').config();

// console.log(process.env.SCRAPPER_API_KEY);
const APIKEY=process.env.SCRAPPER_API_KEY;
// const generateScrapperURL(APIKEY)=`http://api.scraperapi.com?api_key=${APIKEY}&autoparse=true`;

const generateScrapperURL=(APIKEY)=`http://api.scraperapi.com?api_key=${APIKEY}&autoparse=true`;

const app=express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/',(req,res) => {

    res.send("Amazon Scrapping api !");
});

// product details
app.get('/product/:productId',async (req,res)=>{
    const {APIKEY}=req.query;
    const {productId}=req.params;
    
    try {
        const response=await request(`${generateScrapperURL(APIKEY)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//product reviews
app.get('/product/:productId/reviews',async (req,res)=>{
    const {productId}=req.params;
    const {APIKEY}=req.query;

    try {
        const response=await request(`${generateScrapperURL(APIKEY)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//Product Offers 
app.get('/product/:productId/offers',async (req,res)=>{
    const {productId}=req.params;
    const {APIKEY}=req.query;

    try {
        const response=await request(`${generateScrapperURL(APIKEY)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//Product Offers 
app.get('/search/:searchQuery',async (req,res)=>{
    const {searchQuery}=req.params;
    const {APIKEY}=req.query;

    try {
        const response=await request(`${generateScrapperURL(APIKEY)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`);})