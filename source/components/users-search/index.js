import { h, Component } from 'preact';
import './users-search.styl';

const b = require('b_').with('users-search');

class UsersSearch extends Component {
    constructor () {
        super();
        this.updateInput = this.updateInput.bind(this);
        this.state = {
            usersToRender: []
        }
    }

    updateInput (e) {
        if (e.target.value.length > 0) {
            this.props.searchByName(e.target.value).then(({data}) => {
                if (data) {
                    this.setState({
                        usersToRender: data
                    });
                }
            })
        } else {
            this.setState({
                usersToRender: []
            })
        }
    };

    render(props, state) {
        return <div className={b()}>
            <input placeholder='Enter username' type="text" onInput={this.updateInput} />
            <ul>
                {state.usersToRender.map((user, index) => {
                    return <li onClick={props.renderUser.bind(this, user.id)}>
                        {user.full_name}
                    </li>;
                })}
            </ul>
        </div>
    }
}

export default UsersSearch;