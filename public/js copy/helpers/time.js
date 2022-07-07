class Time {
    getReviewTimestamp(date) {
        const past = new Date(date).getTime();
        const present = new Date().getTime();
        const seconds = (present - past) / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30.4;
        const years = days / 365;
        const unitsOfTime = new Map([
            [0, { unit: 'year', number: years }],
            [1, { unit: 'month', number: months }],
            [2, { unit: 'day', number: days }],
            [3, { unit: 'hour', number: hours }],
            [4, { unit: 'minute', number: minutes }],
            [5, { unit: 'second', number: seconds }]
        ]);

        for (let i = 0; i < unitsOfTime.size; i += 1) {
            const unitOfTime = unitsOfTime.get(i);
            const number = Math.trunc(unitOfTime.number);

            if (number) {
                return `${number} ${unitOfTime.unit}${number > 1 ? 's' : ''} ago`;
            }
        }
    }
}

export default new Time();
