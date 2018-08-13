export class UniversityServiceClient {
    URL = 'http://localhost:4000/api/';

    findAllUniversities() {
        return fetch(this.URL + 'university')
            .then(response => response.json());
    }
}
