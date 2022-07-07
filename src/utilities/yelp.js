import fetch from 'node-fetch';

class Yelp {
    getOptions() {
        return {
            headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
        };
    }

    radius(num) {
        return (40000 / 25) * num;
    }

    async fetch(data) {
        let url = `${process.env.YELP_API_URL}/businesses/search?categories=collegeuniv&limit=20`;
        url += `&${
            data.university
                ? `&location=${data.university}`
                : `&radius=${this.radius(25)}&latitude=${data.latitude}&longitude=${data.longitude}`
        }`;
        const universities = await fetch(url, this.getOptions());

        return universities.json();
    }

    async fetchReviews(id) {
        const url = `${process.env.YELP_API_URL}/businesses/${id}/reviews`;
        const reviews = await fetch(url, this.getOptions());

        return reviews.json();
    }
}

export default Yelp;
