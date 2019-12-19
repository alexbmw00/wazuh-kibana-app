/*
 * Wazuh app - React component for show search and filter in the rules,decoder and CDB lists.
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, {
  Component,
} from 'react';
import { EuiBadge } from '@elastic/eui';
import { date } from 'joi';

interface filter { field:string, value:string }
export class WzSearchBadges extends Component {
  props!: {
    filters: filter[]
    onChange: Function
  }
  constructor(props) {
    super(props);
  }

  buildBadge(title:filter) {
    return (
      <EuiBadge
        key={Date.now()}
        iconType="cross"
        iconSide="right"
        iconOnClickAriaLabel="Remove"
        iconOnClick={() => this.props.onChange(title)}>
        {`${title.field}:${title.value}`}
      </EuiBadge>
    );
  }

  render() {
    const { filters } = this.props;
    const badges = filters.filter((item) => item.field !== 'q').map((item) => this.buildBadge(item))
    return (
      <div>
        {badges}
      </div>
    );
  }
}