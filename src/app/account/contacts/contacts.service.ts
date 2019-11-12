// Copyright 2019 The Bitum developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { bitumConfig } from '../../config/bitum.config';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  onUpdated = new EventEmitter();

	contacts = [];

  constructor() {
  	let contacts = localStorage.getItem(bitumConfig.name + '-contacts');
  	try {
	    if (!contacts || contacts == 'undefined') {
	      this.saveToStorage();
	    } else {
	      this.contacts = JSON.parse(contacts);
	    }
  	} catch(e) {}
  }

  saveToStorage() {
    localStorage.setItem( bitumConfig.name + '-contacts', JSON.stringify(this.contacts));
    this.onUpdated.emit(true);
  }

  add(contact) {

  	this.contacts.push({
      id: uuid.v4(),
      label: contact.label,
      address: contact.address,
      publicKey: contact.publicKey,
      walletId: contact.walletId,
  	});

  	this.saveToStorage();
  }
}
