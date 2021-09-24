const BaseRepository = require('../repository/base/baseRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
    };

    async getAvailableCar(carCategory) {
        const selectedCarId = this.chooseRandomCar(carCategory);

        return this.carRepository.find(selectedCarId);
    }

    getRandomPositionFromArray(list) {
        const listLength = list.length;

        return Math.floor(
            Math.random() * listLength
        );
    };

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

        const selectedCar = carCategory.carIds[randomCarIndex];

        return selectedCar;
    }
};

module.exports = CarService;