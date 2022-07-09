import ukrainianFlag from './img/ukraine.png'
import europeFlag from './img/europe.png'
import usaFlag from './img/USA.png'
import russianFlag from './img/russian.png'
import bitcoinFlag from './img/bitcoin.jpeg'

const extendedCCYList = {
    UAH: {
        img: ukrainianFlag,
        title: 'Ukriane'
    },

    USD: {
        img: usaFlag,
        title: 'United States'
    },

    RUR: {
        img: russianFlag,
        title: 'Russian Federation'
    },

    EUR: {
        img: europeFlag,
        title: 'Europe Nation'
    },

    BTC: {
        img: bitcoinFlag,
        title: 'Bitcoin'
    },

}

const getInfoFromCCY = (ccy) => {
    switch (ccy) {
        case 'UAH':
            return {
                ...extendedCCYList.UAH
            }
        case 'USD':
            return {
                ...extendedCCYList.USD
            }
        case 'EUR':
            return {
                ...extendedCCYList.EUR
            }
        case 'RUR':
            return {
                ...extendedCCYList.RUR
            }
        case 'BTC':
            return {
                ...extendedCCYList.BTC
            }
        default:
            return ''
    }
}

const getListCCY = (list) => {
    try {
        return list.map(item => item.ccy)
    } catch {
        throw " You have trouble with list "
    }
}

export { getInfoFromCCY, getListCCY }