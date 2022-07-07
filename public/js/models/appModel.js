class AppModel {
    state = {};

    find(options) {
        if (options.location) return this.state.location;
    }

    set(option, value) {
        if (option === 'preferences') {
            const preferences = { theme: 'light' };

            localStorage.setItem('preferences', JSON.stringify(preferences));
        }

        if (option === 'theme') {
            const storage = this.get('preferences');
            const newStorage = { ...storage, [option]: storage.theme === 'light' ? 'dark' : 'light' };

            localStorage.setItem('preferences', JSON.stringify(newStorage));
        }
    }

    get(option) {
        if (option === 'preferences') {
            const storage = localStorage.getItem('preferences');

            if (!storage) {
                this.set('preferences');
                return;
            }

            return JSON.parse(storage);
        }
    }
}

export default new AppModel();
