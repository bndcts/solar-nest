import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { open } from 'sqlite';
const sqlite3 = require('sqlite3').verbose();
const MUNICIPALITIES =[101, 147, 201];
const MUNICIPALITIES_DICT = {101: 0, 147: 1, 201: 2};

@Injectable()
export class DataCollectorService {
    async fetchDataFromAPI() {
        const response = await axios.get('https://api.energidataservice.dk/dataset/ConsumptionIndustry?limit=100').then(response => response.data);
        return response.records;
    }
    async saveDataToDatabase(timestamp: string, municipality: number, consumption: number) {
        const parsed_timestamp = Math.floor(new Date(timestamp).getTime() / 1000) * 10 + MUNICIPALITIES_DICT[municipality];
        console.log(parsed_timestamp, municipality, consumption); 
        (async () => {
            const db = await open({
              filename: '../general.db',
              driver: sqlite3.Database
            })
            let sql = `INSERT OR IGNORE INTO consumption_data VALUES(${parsed_timestamp}, ${municipality}, ${consumption});`;
            const result = await db.run(sql);
        })()

    }


    async splitData(data) {
        for (let i = 0; i < data.length; i++) {
            const timestamp : string = data[i].HourUTC;
            const municipality : number = Number(data[i].MunicipalityNo);
            const consumption : number = data[i].ConsumptionkWh;
            if (MUNICIPALITIES.includes(municipality)) {
                await this.saveDataToDatabase(timestamp, municipality, consumption);
            }
        }
    }
      
    @Cron('0 10 * * * *') 
    async handleCron() {
      const data = await this.fetchDataFromAPI();
      await this.splitData(data);
    }
    
}
