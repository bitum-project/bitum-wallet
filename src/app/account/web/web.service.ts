// Copyright 2019 The Bitum developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable, EventEmitter } from '@angular/core';
import { CryptoJsService } from '../../_/services/crypto/crypto-js.service';
import { HttpService } from '../../_/services/http/http.service';

import { bitumConfig } from '../../config/bitum.config';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  domain = {};
  website = {};

  onDomainLangueAdded = new EventEmitter();
  onDomainLangueRemoved = new EventEmitter();

  constructor(
    private cryptoJsService: CryptoJsService,
    private httpService: HttpService) {

      let domain = localStorage.getItem(bitumConfig.name + '-domain');
      if (!domain || domain == 'undefined') {
        this.saveToStorage();
      } else {
        this.domain = JSON.parse(domain);
      }
  }

  saveToStorage() {
    localStorage.setItem(bitumConfig.name + '-domain', JSON.stringify(this.domain))
  }

  saveWebsiteToStorage(url, website) {
    localStorage.setItem(bitumConfig.name + '-domain-website-' + url, JSON.stringify(website))
  }

  getFromStorage() {
    let domain = localStorage.getItem(bitumConfig.name + '-domain');
    if (domain) {
      return JSON.parse(domain);
    }

    return {};
  }

  getWebsiteFromStorage(url) {
    let website = localStorage.getItem(bitumConfig.name + '-domain-website-' + url);
    if (website) {
      return JSON.parse(website);
    }

    return;
  }

  getWalletAdressesInfos(addresses) {
    return this.httpService.post('get-wallet-addresses-domain', {
      walletAddresses: addresses
    })
  }

  getUrlInfos(url) {
    return this.httpService.post('get-domain-url', {
      url: url
    })
  }
}
