import React, { Component } from 'react';

class Gif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: props.still,
            isSelected: false,
        }
    }
    onImageLoad = () => {
        const { imageSrc } = this.state;
        const {
            original,
        } = this.props;
        //replacing still image with gif after loading
        if ( imageSrc !== original ) {
            this.setState({ 
                imageSrc: original, 
                isLoaded: true 
            });
        }
    }

    render() {
        const { imageSrc } = this.state;
        const {
            alt,
            style,
            onClick
        } = this.props;
        return (
            <img
                onClick={onClick}
                src={imageSrc}
                alt={alt || ''}
                onLoad={this.onImageLoad}
                style={style}
            />
        );
    }
}

export default Gif;