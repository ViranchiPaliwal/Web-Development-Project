export class UniversityServiceClient {
    URL = 'https://web-dev-project-client-node.herokuapp.com/api/';

    findAllUniversities() {
        return fetch(this.URL + 'university')
            .then(response => response.json());
    }
}
