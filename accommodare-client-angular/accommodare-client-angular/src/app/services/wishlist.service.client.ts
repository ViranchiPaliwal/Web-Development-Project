export class WishlistServiceClient {
    URL = 'http://localhost:4000/api/';

  findWishListedPropertiesForUser() {
    const url = this.URL + 'tenant/property';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  addPropertyToWishlist(propertyId) {
    const url = this.URL + 'tenant/property/' + propertyId;
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  removePropertyFromWishlist(propertyId) {
    const url = this.URL + 'tenant/property/' + propertyId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

}
