export class WishlistServiceClient {
    URL = 'https://web-dev-project-client-node.herokuapp.com/api/';

  findWishListedPropertiesForUser(tenanId) {
    const url = this.URL + 'tenant/property/'+tenanId;
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

  addTenantPropertyToWishlist(tenantId, propertyId) {
    const url = this.URL + 'tenant/'+tenantId+'/property/' + propertyId;
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  removePropertyFromWishlist(tenantId, propertyId) {
    const url = this.URL + 'tenant/'+tenantId+'/property/' + propertyId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

}
