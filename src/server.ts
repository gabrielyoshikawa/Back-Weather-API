import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async function (req, res) {
    try {
        const response = await axios.get('https://api.weather.gov/gridpoints/TOP/31,80/forecast');
        const test = response.data.properties.periods
        
        const filtered = test.map((element: { name: any; temperature: any; windSpeed: any; }) => {
            return {
                day: element.name,
                temp: element.temperature,
                wind: element.windSpeed
            }
        });
        console.log(filtered);

        res.json(filtered)
    } catch (error) {
        console.error(error);
        res.status(500)
    }
  })

app.listen(PORT);
