var React = require('preact');
var ReactDOM = require('preact-compat');
var _ = require('lodash');
var $ = require('jquery');
import { createClass } from 'preact-compat/dist/preact-compat.min'
var PropTypes = require('prop-types');

module.exports = createClass({
    propTypes: {
        render: PropTypes.func,
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    getInitialState: function() {
        return {
            hover: false,
        };
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state) || !_.isEqual(nextContext, this.context);
    },

    isHovered: function(element) {
        try {
            return element && $(element).is(':hover');
        } catch (err) {
            console.error(err);
        }
    },

    componentDidMount: function() {
        this.isMounted = true;

        var This = this;

        setTimeout(function() {
            if (This.isMounted) {
                var element = ReactDOM.findDOMNode(This);
                This.setState({ hover: !!(This.isHovered(element)) });
            }
        }, 1);
    },

    componentWillUnmount: function() {
        this.isMounted = false;
    },

    componentDidUpdate: function(prevProps, prevState, prevContext) {
        var This = this;
        setTimeout(function() {
            if (This.isMounted) {
                var element = ReactDOM.findDOMNode(This);
                This.setState({ hover: !!(This.isHovered(element)) });
            }
        }, 1);
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    displayName: 'HoverBox',

    render: function() {
        return (
            <div className={this.state.hover ? 'hover' : 'not-hover'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
                {this.props.render(this.state.hover)}
            </div>
        );
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    onMouseEnter: function() {
        if (this.state.hover == false) {
            this.setState({hover: true});
        }
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    onMouseOver: function() {
        if (this.state.hover == false) {
            this.setState({hover: true});
        }
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    onMouseLeave: function() {
        if (this.state.hover == true) {
            this.setState({hover: false});
        }
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
});
