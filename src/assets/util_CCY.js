import ukrainianFlag from './img/ukraine.png'
import europeFlag from './img/europe.png'
import usaFlag from './img/USA.png'
import russianFlag from './img/russian.png'
import bitcoinFlag from './img/bitcoin.jpeg'

const imageFromCCY = {
    UAH: {
        image: ukrainianFlag,
        title: 'Ukriane'
    },

    USD: {
        image: usaFlag,
        title: 'United States'
    },

    RUR: {
        image: russianFlag,
        title: 'Russian Federation'
    },

    EUR: {
        image: europeFlag,
        title: 'Europe Nation'
    },

    BTC: {
        image: bitcoinFlag,
        title: 'Bitcoin'
    },

}
export { imageFromCCY as ImageFromCCY }