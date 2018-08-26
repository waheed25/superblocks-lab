// Copyright 2018 Superblocks AB
//
// This file is part of Superblocks Studio.
//
// Superblocks Studio is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Studio is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Studio.  If not, see <http://www.gnu.org/licenses/>.

import { h, Component } from 'preact';
import classnames from 'classnames';
import style from './style';
import classNames from 'classnames';
import RenderTransactions from './rendertransactions';

export default class TransactionLogFloat extends Component {
    constructor(props) {
        super(props);

        setInterval(()=>this.setState(),1000);
    }

    _getRender = (txlog) => {
        if (this.renderTransactions) {
            return this.renderTransactions;
        }
        this.renderTransactions = new RenderTransactions(txlog, true, () => {
            this.setState();
        });
        return this.renderTransactions;
    };

    _getTxLog = () => {
        if (!this.props.router.control) return;
        const project=this.props.router.control.getActiveProject();
        if (!project) return;
        return project.props.state.txlog;
    };

    render() {
        const txlog = this._getTxLog();
        if (!txlog) return;
        const env=this.props.router.control.getActiveProject().props.state.data.env;
        const network = env;

        const renderTransactions = this._getRender(txlog);
        const transactions=renderTransactions.renderTransactionsFloat(network, 5, 30);
        return (
            <div class={style.float}>
                {transactions}
            </div>
        );
    }
}