
const getCurrencyCode = () => {

    console.log('It doesnt work with other IP becouse you need to use key =) 1500 per month for free')
    return 'UAN'

    // try {
    //     async function json(url) {
    //         return await fetch(url).then(res => res.json());
    //     }

    //     let apiKey = '0afa76839ff59d39f4c8ec37e4617523b88127c664f7a5e37d091d89';
    //     json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
            // console.log(data.ip);
            // console.log(data.city);
            // console.log(data.country_code);
    //         console.log(data.currency.code)
    //         // so many more properties
    //     });
    // }
    // catch (err) {
    //     console.log(err)
    // }
}

export { getCurrencyCode }