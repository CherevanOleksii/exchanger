import ukrainianFlag from './img/ukraine.png'
import europeFlag from './img/europe.png'
import usaFlag from './img/USA.png'

const info = (ccy) => {
    switch (ccy) {
        case 'UAH':
            return {
                img: ukrainianFlag,
                title: 'Ukriane'
            }
        case 'USD':
            return {
                img: usaFlag,
                title: 'United States'
            }
        case 'EUR':
            return {
                img: europeFlag,
                title: 'United States'
            }
        default:
            return ''
    }
}

const getCCY = (data=[]) => {
    return data.map(item => item.ccy)
}

export { info, getCCY }