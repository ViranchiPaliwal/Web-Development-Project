export class InviteServiceClient {
    URL = 'http://localhost:4000/api/';

  addToInvitation(propertyId) {
    const url = this.URL + 'invite/property/' + propertyId;
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  findInvitationByCredentials(propertyId) {
    const url = this.URL + 'invite/tenant/property/'+propertyId;
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  findInvitationByPropertyId(propertyId) {
    const url = this.URL + 'invite/property/'+propertyId;
    return fetch(url)
      .then(response => response.json());
  }

  updateInvitationStatus(invite) {
    const url = this.URL + 'invite/property';
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(invite),
      credentials: 'include'
    })
      .then(response => response.json());
  }

  removeFromInvitation(propertyId) {
    const url = this.URL + 'invite/property/' + propertyId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
}
