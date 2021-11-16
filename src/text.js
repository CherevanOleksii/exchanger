class Cat {
    constructor (name, roar) {
        this.name = name, 
        this.roar = roar
    }

    signal () {
        console.log(this.name + ' does ' + this.roar)
    }
}

let vasa =new Cat('vasa', 'mrmrm')

vasa.signal();