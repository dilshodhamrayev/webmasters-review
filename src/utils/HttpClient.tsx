import {TOKEN} from "./constants";
import axios from 'axios'
import {config} from "./config";

export default class HttpClient {

    static headers = {'Access-Control-Allow-Origin': '*'};

    static doRequest() {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            HttpClient.headers = {
                ...HttpClient.headers,
                // @ts-ignore
                Authorization: token
            };
        }

        return axios.create({
            baseURL: config.BASE_URL,
            headers: {...HttpClient.headers}
        });
    }

    static doGet(url: string, params = {}) {
        return HttpClient.doRequest().get(url, params)
    }

    static doPost(url: string, data: any) {
        return HttpClient.doRequest().post(url, data)
    }

    static doPut(url: string, data: any) {
        return HttpClient.doRequest().put(url, data)
    }

    static doPatch(url: string, data: any) {
        return HttpClient.doRequest().patch(url, data)
    }

    static doDelete(url: string, params = {}) {
        return HttpClient.doRequest().delete(url, params)
    }

}