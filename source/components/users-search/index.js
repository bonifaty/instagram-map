import { h, Component } from 'preact';

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
            this.props.searchByName(e.target.value).then((users) => {
                this.setState({
                    usersToRender: users
                });
            })
        }
    };

    renderUsers () {

    }

    render(props, state) {
        return <div>
            <input placeholder='Enter username' type="text" onInput={this.updateInput} />
            <ul>
                {state.usersToRender.map((user, index) => {
                    return <li>
                        Here comes user
                    </li>;
                })}
            </ul>
        </div>
    }
}

export default UsersSearch;