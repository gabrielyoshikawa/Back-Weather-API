import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

let objData: any = {}

let dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

app.get('/', async function (req, res) {
    try {
        // Pega a API
        const response = await axios.get('https://api.weather.gov/gridpoints/TOP/31,80/forecast');
        const test = response.data.properties.periods
        
        // Filtro geral dos dados
        const filtered = test.map((element: { number: any; name: any; startTime: any; temperature: any; windSpeed: any; }) => {
            return {
                id: element.number,
                dayName: element.name,
                startTime: element.startTime,
                temp: element.temperature,
                wind: element.windSpeed
            }
        });

        // Define o dia como chave
        filtered.forEach((obj: {

            tempMax: number; id: any; dayName: any; startTime: any; temp: any; wind: any; tempMin: number; diaSemana: string;  windMin: any; windMax: any;
        }) => {

            objData[obj.dayName] = obj
            obj.diaSemana = dias[new Date(obj.startTime).getDay()]
            obj.tempMax = obj.temp + 5
            obj.tempMin = obj.temp - 5

            var res = obj.wind.split(',').map((el: any) => {
                let n = Number(el);
                return n === 0 ? n : n || el;
            });

            console.log(res)
            console.log(res[0][0])
            // var splitted = obj.wind.split("")
            // console.log(splitted)
            // var splitted2 = splitted.split(",")
            // console.log(splitted2)
            // if (splitted.includes('t', 'o')){
            //     obj.windMin = (splitted[0], splitted[1])
                
            //     // obj.windMax = (splitted[]) Fazer Vento Máximo
            // } else {

            // }

        }); 


        console.log(objData);
        res.json(objData)

        // Temperatura
        // console.log(objData['Wednesday Night'].id)
        // var tempMaxToday = objData.Tonight.temp = objData.Tonight.temp + 5
        // console.log(tempMaxToday)

        // Erro
    } catch (error) {
        console.error(error);
        res.status(500)
    }
  });
  
app.listen(PORT);

    