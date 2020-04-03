/*
 * Wazuh app - Integrity monitoring table component
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiText,
  EuiFlexGroup,
  EuiTitle,
  EuiButtonEmpty
} from '@elastic/eui';
import { EuiHorizontalRule } from '@elastic/eui';
import { Discover } from '../../../common/modules/discover'

export class FileDetails extends Component {
  state: {
  };

  props!: {
    currentFile: {}
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  generalColumns() {
    return [
      {
        field: 'date',
        name: 'Last analysis',
        grow: 2
      },
      {
        field: 'mtime',
        name: 'Last modified',
        grow: 2
      },
      {
        field: 'uname',
        name: 'User',
      },
      {
        field: 'uid',
        name: 'User ID',
      },
      {
        field: 'gname',
        name: 'Group',
      },
      {
        field: 'gid',
        name: 'Group ID',
      },
      {
        field: 'perm',
        name: 'Permissions',
      },
      {
        field: 'size',
        name: 'Size',
      },
      {
        field: 'inode',
        name: 'Inode',
      },
    ]
  }

  extraColumns() {
    return [
      {
        field: 'md5',
        name: 'MD5',
      },
      {
        field: 'sha1',
        name: 'SHA1',
      },
      {
        field: 'sha256',
        name: 'SHA256',
      }
    ]
  }


  getDetails() {
    const columns = this.generalColumns();
    const generalDetails = columns.map((item, idx) => {
      const value = this.props.currentFile[item.field] || '-';
      const grow = item.grow || 1;
      return (
        <EuiFlexItem key={idx} grow={grow}>
          <EuiText className="detail-title">
            {item.name}
          </EuiText>
          <EuiText>
            {value}
          </EuiText>
        </EuiFlexItem>
      )
    });
    const extraColumns = this.extraColumns();
    const extraDetails = extraColumns.map((item, idx) => {
      const value = this.props.currentFile[item.field] || '-';
      return (
        <EuiFlexItem key={idx} >
          <EuiText className="detail-title">
            {item.name}
          </EuiText>
          <EuiText size="xs">
            {value}
          </EuiText>
        </EuiFlexItem>
      )
    });

    return (
      <span>
        <EuiFlexGroup gutterSize="m">{generalDetails}</EuiFlexGroup>
        <EuiFlexGroup gutterSize="m">{extraDetails}</EuiFlexGroup>
      </span>);
  }

  render() {
    return (
      <Fragment>
        <div className='details-row'>
          {this.getDetails()}
        </div>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiTitle >
              <h2>File events</h2>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={() => alert("clicked")}>
              View in Events
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup>
          <EuiFlexItem>
            <Discover filters={{ 'syscheck.path': this.props.currentFile.file }} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    )
  }
}