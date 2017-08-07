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
            this.props.searchByName(e.target.value).then(({data}) => {
                if (data) {
                    console.log(data);
                    this.setState({
                        usersToRender: data
                    });
                }
            })
        }
    };

    render(props, state) {
        return <div>
            <input placeholder='Enter username' type="text" onInput={this.updateInput} />
            <ul>
                {state.usersToRender.map((user, index) => {
                    return <li>
                        {user.full_name}
                    </li>;
                })}
            </ul>
        </div>
    }
}

export default UsersSearch;