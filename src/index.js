import {h, Component} from "preact";
import * as _ from 'lodash';
import * as $ from 'jquery';

class HoverBox extends Component {
    constructor() {
        super();
        this.state = {
            hover: false,
        };
        this.displayName = 'HoverBox';
    }

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

    render() {
        return (
            <div className={this.state.hover ? 'hover' : 'not-hover'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver} style={this.props.style}>
                {this.props.render(this.state.hover)}
            </div>
        );
    }
}

export default HoverBox;