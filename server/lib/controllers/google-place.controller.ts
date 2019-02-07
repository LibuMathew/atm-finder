
import { Request, Response, NextFunction } from 'express';
import * as request from "request-promise-native";
import * as googleConfig from "../config/google";
const request = require('request');

export class GooglePlaceController {
    static secretKey;

    constructor() {
        GooglePlaceController.secretKey = googleConfig.config.key;
    }

    public getPlaces(req: Request, res: Response) {
        let location = '12.8886712,77.6238103';
        let keyword = '';
        if (req.query && Object.keys(req.query).length > 0) {
            location = `${req.query.latitude},${req.query.longitude}`;
            keyword = req.query.keyword || ''
        }
        const requestParams = {
            location: location,
            radius: 500,
            rankBy: 'distance',
            type: 'atm',
            keyword: keyword
        };
        let __query = `location=${requestParams.location}&radius=${requestParams.radius}&rankBy=${requestParams.rankBy}&type=${requestParams.type}&key=${GooglePlaceController.secretKey}`;
        if (requestParams.keyword) {
            __query += `&keyword=${requestParams.keyword}`;
        }
        const placeRequestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${__query}`;
        request(placeRequestUrl, function (error, response, response_body) {
            if (response_body) {
                response_body = JSON.parse(response_body);
                const __response = response_body.error_message ? { "success": false, "error": response_body.error_message } : { "success": true, "body": response_body };
                res.json(__response);
            } else {
                res.json({ "success": false, "error": error });
            }
        });
    }

}