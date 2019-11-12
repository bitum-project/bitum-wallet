// Copyright 2019 The Bitum developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { Pipe, PipeTransform } from '@angular/core';

import { bitumConfig } from '../../config/bitum.config';

@Pipe({
  name: 'cryptoAmount'
})
export class CryptoAmountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value / bitumConfig.unit;
  }
}
