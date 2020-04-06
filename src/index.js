import {h, Component} from "preact";

const _ = require('lodash');
const $ = require('jquery');

export default class HoverBox extends Component {
    state = {
        hover: false,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state) || !_.isEqual(nextContext, this.context);
    }

    isHovered(element) {
        try {
            return element && $(element).is(':hover');
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.isMounted = true;
        setTimeout(() => {
            if (this.isMounted) {
                let element = ReactDOM.findDOMNode(this);
                this.setState({ hover: !!(this.isHovered(element)) });
            }
        }, 1);
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        setTimeout(() => {
            if (this.isMounted) {
                let element = ReactDOM.findDOMNode(this);
                this.setState({ hover: !!(this.isHovered(element)) });
            }
        }, 1);
    }

    displayName = 'HoverBox';

    render() {
        return (
            <div className={this.state.hover ? 'hover' : 'not-hover'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver} style={this.props.style}>
                {this.props.render(this.state.hover)}
            </div>
        );
    }

    onMouseEnter() {
        if (this.state.hover === false) {
            this.setState({hover: true});
        }
    }

    onMouseOver() {
        if (this.state.hover === false) {
            this.setState({hover: true});
        }
    }

    onMouseLeave() {
        if (this.state.hover === true) {
            this.setState({hover: false});
        }
    }
}
