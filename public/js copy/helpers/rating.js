class Rating {
    _generateRatingsMarkup(rating) {
        const number = +`${rating}`.slice(0, 1);
        const maxRating = 5;
        const starMarkup = `
            <svg class="feather star">
                <use href="images/icons/feather-sprite.svg#star">
            </svg>    
        `;
        const starsArr = [];

        for (let i = 0; i < maxRating; i += 1) {
            let markup = starMarkup;

            if (i < number) {
                markup = markup.replace('feather star', 'feather star filled');
                starsArr.push(markup);
            } else starsArr.push(starMarkup);
        }

        return starsArr.join('');
    }
}

export default Rating;
