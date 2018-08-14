export class InviteServiceClient {
    URL = 'https://web-dev-project-client-node.herokuapp.com/api/';

  addToInvitation(invite) {
    const url = this.URL + 'invite/property';
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findAllInvites(){
    const url = this.URL + 'invite';
    return fetch(url)
      .then(response => response.json());
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
    const url = this.URL + 'invite/update';
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(invite),
      headers: {
        'content-type': 'application/json'
      }
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
