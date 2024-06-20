import React from 'react';


class ModalTimer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            seconds: 20
        }

        this.target = new Date().getTime() + this.state.seconds*1000;
        this.updateTime = this.updateTime.bind(this);
    }

    updateTime = () => {
        const timeLeft = this.target - (new Date());

        if (timeLeft <= 0) {
            this.setState({
                seconds: 0
            });
            this.props.closeModal();
        } else {
            this.setState({
                seconds: Math.floor((timeLeft/1000) % 60)
            });
            this.timeout = setTimeout(this.updateTime, 950);
        }
    }

    componentDidMount() {
        this.timeout = setTimeout(this.updateTime, 950);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    stringify = num => {
        if (num < 10){
            return "0" + num.toString();
        } else {
            return num;
        }
    }

    render() {
        return (
            <div className='modal-timer-container'>
                <div className='modal-timer-header'>New Round</div>
                <span>{this.stringify(this.state.seconds)}</span>
            </div>
        )
    }

}

export default ModalTimer;
