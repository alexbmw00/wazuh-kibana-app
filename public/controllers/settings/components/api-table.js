import React, { Component } from 'react';
import { RIGHT_ALIGNMENT } from '@elastic/eui/lib/services';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiBasicTable,
  EuiPanel,
  EuiButtonIcon,
  EuiToolTip,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiFieldNumber,
  EuiButton,
  EuiSpacer,
  EuiButtonEmpty
} from '@elastic/eui';

export class ApiTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdToExpandedRowMap: {},
      user: '',
      password: '',
      url: '',
      port: 55000
    };
  }

  onChangeEdit(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  toggleDetails(item) {
    const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMap[item._id]) {
      delete itemIdToExpandedRowMap[item._id];
    } else {
      itemIdToExpandedRowMap[item._id] = (
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Username">
              <EuiFieldText
                onChange={e => this.onChangeEdit(e, 'user')}
                placeholder="foo"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Password">
              <EuiFieldPassword
                onChange={e => this.onChangeEdit(e, 'password')}
                placeholder="bar"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Host">
              <EuiFieldText
                onChange={e => this.onChangeEdit(e, 'url')}
                placeholder="http://localhost"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Port">
              <EuiFieldNumber
                max={99999}
                onChange={e => this.onChangeEdit(e, 'port')}
                placeholder={55000}
              />
            </EuiFormRow>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiFormRow label="Actions">
              <EuiButtonEmpty
                iconType="save"
                color="primary"
                onClick={() =>
                  this.props
                    .updateSettings({ ...this.state, _id: item._id }, true)
                    .then(result => result !== -1 && this.toggleDetails(item))
                }
              >
                Save
              </EuiButtonEmpty>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    }
    this.setState({ itemIdToExpandedRowMap });
  }

  render() {
    const { itemIdToExpandedRowMap } = this.state;
    const items = [...this.props.apiEntries];
    const columns = [
      {
        field: '_source.cluster_info.cluster',
        name: 'Cluster',
        align: 'left'
      },
      {
        field: '_source.cluster_info.manager',
        name: 'Manager',
        align: 'left'
      },
      {
        field: '_source.url',
        name: 'Host',
        align: 'left'
      },
      {
        field: '_source.api_port',
        name: 'Port',
        align: 'left'
      },
      {
        field: '_source.api_user',
        name: 'User',
        align: 'left'
      },
      {
        name: 'Actions',
        render: item => (
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiToolTip position="bottom" content={<p>Set as default</p>}>
                <EuiButtonIcon
                  iconType="starEmpty"
                  aria-label="Set as default"
                  onClick={() => this.props.setDefault(item)}
                />
              </EuiToolTip>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiToolTip position="bottom" content={<p>Check connection</p>}>
                <EuiButtonIcon
                  iconType="refresh"
                  onClick={() => this.props.checkManager(item)}
                  color="success"
                />
              </EuiToolTip>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiToolTip position="bottom" content={<p>Remove</p>}>
                <EuiButtonIcon
                  iconType="trash"
                  onClick={() => this.props.removeManager(item)}
                  color="danger"
                />
              </EuiToolTip>
            </EuiFlexItem>
          </EuiFlexGroup>
        )
      },

      {
        align: RIGHT_ALIGNMENT,
        width: '40px',
        isExpander: true,
        render: item => (
          <EuiButtonIcon
            onClick={() => this.toggleDetails(item)}
            aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
            iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
          />
        )
      }
    ];
    return (
      <EuiPanel>
        <EuiBasicTable
          itemId="_id"
          items={items}
          columns={columns}
          itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
          isExpandable={true}
        />
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          <EuiFlexItem />
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              iconType="plusInCircle"
              onClick={() => this.props.switch()}
            >
              Add new
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>
      </EuiPanel>
    );
  }
}
