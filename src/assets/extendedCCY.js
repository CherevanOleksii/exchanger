import ukrainianFlag from './img/ukraine.png'
import europeFlag from './img/europe.png'
import usaFlag from './img/USA.png'
import russianFlag from './img/russian.png'
import bitcoinFlag from './img/bitcoin.jpeg'

const extendedCCY = {
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

const info = (ccy) => {
    switch (ccy) {
        case 'UAH':
            return {
                ...extendedCCY.UAH
            }
        case 'USD':
            return {
                ...extendedCCY.USD
            }
        case 'EUR':
            return {
                ...extendedCCY.EUR
            }
        case 'RUR':
            return {
                ...extendedCCY.RUR
            }
        case 'BTC':
            return {
                ...extendedCCY.BTC
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

export { info, getListCCY }