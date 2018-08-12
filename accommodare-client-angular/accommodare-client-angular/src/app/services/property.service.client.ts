export class PropertyServiceClient {
    URL = 'http://localhost:4000/api/';

  createProperty(property) {
    return fetch(this.URL + 'owner/property', {
      body: JSON.stringify(property),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateProperty(property) {
    return fetch(this.URL + 'property', {
      body: JSON.stringify(property),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findPropertiesForOwner(userId){
    return fetch(this.URL + 'owner/property/'+userId,{
        credentials: 'include'
      }
      )
      .then(response => response.json());
  }

  findAllProperties(){
    return fetch(this.URL + 'property',{
        credentials: 'include'
      }
    )
      .then(response => response.json());
  }


  findPropertiesForUniversity(universityId){
    return fetch(this.URL + 'property/university/'+universityId,
    )
      .then(response => response.json());
  }

    findPropertyById(propertyId) {
        return fetch(this.URL + 'property/' + propertyId)
            .then(response => response.json());
    }

  deleteProperty(propertyId){
    return fetch(this.URL + 'property/' + propertyId, {
      method: 'delete'
    }).then(response => response.json());
  }



}
