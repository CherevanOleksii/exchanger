import axios from "axios"
import { useEffect, useState } from "react"

var apiData = []

const fetchActualData = () => {
    let api = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
     
    return axios.get(api)
        .then(res => {
            apiData = res.data
            console.log(apiData)
        })

}

fetchActualData()

const getData = () => {
    return apiData
}

const getCCY = (data) => {
    return data.map(item => item.ccy)
}

const getBaseCCY = (data=[]) => {
    return data.map(item => item.base_ccy)
}

const getAllCCY = (data = []) => {
    if (data.length < 1) {
        data = apiData
    }
    return [...new Set([...getCCY(data), ...getBaseCCY(data)])]
}






export { getAllCCY , getData}