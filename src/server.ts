import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async function (req, res) {
    try {
        // Pega a API
        const response = await axios.get('https://api.weather.gov/gridpoints/TOP/31,80/forecast');
        const test = response.data.properties.periods
        
        // Filtro geral dos dados
        const filtered = test.map((element: { number: any; name: any; temperature: any; windSpeed: any; }) => {
            return {
                id: element.number,
                dayName: element.name,
                temp: element.temperature,
                wind: element.windSpeed
            }
        });

        // Filtro por dia
         const result = filtered.filter((obj: { id: any; }) => {
             return obj.id == '1';
        });
        console.log(filtered);
        res.json(filtered)

        // Erro
    } catch (error) {
        console.error(error);
        res.status(500)
    }
  })

app.listen(PORT);
