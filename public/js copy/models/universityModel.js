class UniversityModel {
    state = {};

    find(options) {
        if (!this.state.universities) return {};

        if (options.name) {
            const searchResults = [];

            for (let i = 0; i < this.state.universities.length; i += 1) {
                const { name } = this.state.universities[i];
                const str = name.toLowerCase().includes(options.name);

                if (str) {
                    return this.state.universities[i];
                }
            }

            return searchResults;
        }

        if (options.query) {
            const searchResults = [];

            for (let i = 0; i < this.state.universities.length; i += 1) {
                const { name } = this.state.universities[i];
                const str = name.toLowerCase().includes(options.query);

                if (str) searchResults.push(name);
            }

            return searchResults;
        }
    }

    set(data) {
        const newData = this.modifyUrls(data);
        this.state.universities = newData;
    }

    modifyUrls(data) {
        return data.map((entry) => {
            let webpage = entry.webPages[0];

            if (webpage) {
                webpage = webpage.replace('http://', '');
                webpage = webpage.replace('https://', '');
                webpage = webpage.replace('www.', '');
                webpage = webpage.endsWith('/') ? webpage.slice(0, -1) : webpage;

                entry.webPage = `https://${webpage}`;
            }

            if (!webpage) entry.webPage = null;

            return entry;
        });
    }
}

export default new UniversityModel();
