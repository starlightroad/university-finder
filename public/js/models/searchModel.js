import University from './universityModel.js';

class SearchModel {
    state = {};

    get getDataForMap() {
        return this.state.searchResults.data.businesses.map((university) => ({
            name: university.name,
            coordinates: university.coordinates,
            id: university.id
        }));
    }

    find(options) {
        if (options.id) {
            const results = this.state.searchResults.data.businesses;

            for (let i = 0; i < results.length; i += 1) {
                if (results[i].id === options.id) {
                    return results[i];
                }
            }
        }
    }

    set(data) {
        this.state.searchResults = data;

        this.state.searchResults.data.businesses = data.data.businesses.map((business) => {
            const newBusiness = business;
            const university = University.find({
                name: business.name.toLowerCase()
            });

            if (university.name) newBusiness.webPage = university.webPage;

            return newBusiness;
        });
    }
}

export default new SearchModel();
