// Copyright 2019 The Bitum developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoorgetsTranslateService } from 'doorgets-ng-translate';
import { SettingsProfileService } from '../../../../../account/settings/settings-profile/settings-profile.service';

import { bitumConfig } from '../../../../../config/bitum.config';

@Component({
  selector: 'app-profile-export',
  templateUrl: './profile-export.component.html',
  styleUrls: ['./profile-export.component.scss']
})
export class ProfileExportComponent implements OnInit {

	config = {
		wallets: true,
		contacts: true,
		channels: true,
		nodes: true,
		filename: '',
		password: ''
	}

  constructor(
    private toastrService: ToastrService,
  	private settingsProfileService: SettingsProfileService,
    private doorgetsTranslateService: DoorgetsTranslateService,
  	private ngbActiveModal: NgbActiveModal,) { }

  ngOnInit() {}

  close() {
  	this.ngbActiveModal.close();
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }

  exportProfile() {
  	let filename = this.config.filename.toLowerCase() + '_' + bitumConfig.name + '_profile_' + Date.now();
  	let data = localStorage;
  	let password = this.config.password;

  	let backup: any = {}

  	if (this.config.wallets) {
  		backup[bitumConfig.name + '-home'] = localStorage.getItem(bitumConfig.name + '-home');
  		backup[bitumConfig.name + '-wallets'] = localStorage.getItem(bitumConfig.name + '-wallets');

  		let accountRegexp = new RegExp(`${bitumConfig.name}-account`, 'i')
  		for(let storageKey of Object.keys(localStorage)) {
  			if (accountRegexp.test(storageKey)) {
  				backup[storageKey] = localStorage.getItem(storageKey);
  			}
  		}
  	}

  	if (this.config.nodes) {
  		backup[bitumConfig.name + '-nodes'] = localStorage.getItem(bitumConfig.name + '-nodes');
  	}

  	if (this.config.contacts) {
  		backup[bitumConfig.name + '-contacts'] = localStorage.getItem(bitumConfig.name + '-contacts');
  	}

  	if (this.config.channels) {
  		backup[bitumConfig.name + '-messenger-history'] = localStorage.getItem(bitumConfig.name + '-messenger-history');

  		let messagesRegexp = new RegExp(`${bitumConfig.name}-messenger-messages`, 'i')
  		for(let storageKey of Object.keys(localStorage)) {
  			if (messagesRegexp.test(storageKey)) {
  				backup[storageKey] = localStorage.getItem(storageKey);
  			}
  		}
  	}

  	this.settingsProfileService.save(filename, backup, password);
    this.toastrService.success(this.doorgetsTranslateService.instant('#Profile exported!'));

  	this.dismiss();
  }
}
