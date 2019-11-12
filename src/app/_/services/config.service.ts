// Copyright 2019 The Bitum developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Injectable } from '@angular/core';
import { bitumConfig } from '../../config/bitum.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

	constructor() {
	}

	setLanguage(langue) {
		localStorage.setItem(bitumConfig.name + '-languge', langue);
	}

	getLanguage() {
		return localStorage.getItem(bitumConfig.name + '-languge') || 'en';
	}
}
