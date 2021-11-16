import ukrainianFlag from './img/ukraine.png'
import europeFlag from './img/europe.png'
import usaFlag from './img/USA.png'

const info = (ccy) => {
    switch (ccy) {
        case 'UAN':
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
    }
}

export { info  }