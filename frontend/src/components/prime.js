import React from "react";

const total = 100;

class Prime extends React.Component {

    state = {
        data: total + 1,

    };

    handleOnClick = (e) => {
        fetch("http://localhost:3002/secondary")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json.users,
                });
            });
        this.setState({
            data: Math.floor(Math.random * total + 1),
        });
    };
    componentDidMount() {
        this.interval = setInterval(
            () => this.handleOnClick({ time: Date.now }),
            5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Prime