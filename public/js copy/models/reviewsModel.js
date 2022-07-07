class ReviewsModel {
    state = {
        reviews: [],

        isReviewsViewVisible: false,

        lastReviewId: null
    };

    sort(option) {
        if (option === 'recent') {
            return this.state.reviews.data.reviews.sort(
                (a, b) => new Date(b.time_created).getTime() - new Date(a.time_created).getTime()
            );
        }

        if (option === 'highest') {
            return this.state.reviews.data.reviews.sort((a, b) => b.rating - a.rating);
        }

        if (option === 'lowest') {
            return this.state.reviews.data.reviews.sort((a, b) => a.rating - b.rating);
        }
    }

    set(data) {
        this.state.reviews = data;
    }

    saveLastId(id) {
        this.state.lastReviewId = id;
    }
}

export default new ReviewsModel();
