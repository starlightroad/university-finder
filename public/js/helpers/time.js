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
        const data = [
            { unit: 'year', number: years },
            { unit: 'month', number: months },
            { unit: 'day', number: days },
            { unit: 'hour', number: hours },
            { unit: 'minute', number: minutes },
            { unit: 'second', number: seconds }
        ];

        for (let i = 0; i < data.length; i += 1) {
            const unitOfTime = data[i];
            const number = Math.trunc(unitOfTime.number);

            if (number) {
                return `${number} ${unitOfTime.unit}${number > 1 ? 's' : ''} ago`;
            }
        }
    }
}

export default Time;
