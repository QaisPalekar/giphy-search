import React, { Component } from 'react';
import { withRouter } from "react-router";
import Gif from '../../components/Gif';
import './index.css';
import { apiCall } from '../../api';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifDetails: {}
        }
    }
    componentDidMount() {
        const { gif_id } = this.props.match.params
        apiCall(`/${gif_id}`)
            .then(({ data }) => {
                this.setState({ gifDetails: data })
            })
    }

    render() {
        const { gifDetails } = this.state;
        return (
            <div className='gif-details'>
                <div>
                    {gifDetails.images && <Gif
                        key={gifDetails.title}
                        original={gifDetails.images.original.url}
                        still={gifDetails.images.downsized_still.url}
                        alt={gifDetails.title}
                    />}
                </div>
                <div>
                    {gifDetails.id && <div style={{ margin: 10, textAlign: 'left' }}>
                        <div style={{ marginBottom: 10 }}><b>Id : </b>{gifDetails.id}</div>
                        <div style={{ marginBottom: 10 }}><b>Title : </b>{gifDetails.title}</div>
                        <div style={{ marginBottom: 10 }}><b>Slug : </b>{gifDetails.slug}</div>
                        <a href={gifDetails.url}>Visit Website</a>
                    </div>}
                </div>
            </div>
        );
    }
}

export default withRouter(Details);