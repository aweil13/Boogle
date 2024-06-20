import React from "react";


class RoundTimer extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            seconds: 0,
            minutes: 1
        }
        
        this.target = new Date().getTime() + this.state.minutes*60000 + this.state.seconds*1000;
        this.updateTime = this.updateTime.bind(this);
    }

    updateTime = () => {
        const timeLeft = this.target - (new Date());
    
        if (timeLeft <= 0) {
            this.setState({
                seconds: 0,
                minutes: 0
            });
            this.props.timeUp();
        }
        else {
            this.setState({
                minutes: Math.floor((timeLeft/60000)%60),
                seconds: Math.floor((timeLeft/1000)%60)
            });
            this.timeout = setTimeout(this.updateTime, 1000);
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
            <div className='timer-container'>
                <div className='timer-header'>Timer</div>
                <span>{this.state.minutes}:{this.stringify(this.state.seconds)}</span>
            </div>
        )
    }
}



export default RoundTimer;