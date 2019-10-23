import React, { Component } from 'react';
import Gif from '../../components/Gif';
import { withRouter } from "react-router";
import queryString from 'query-string';
import { apiCall } from '../../api';
import { Link } from "react-router-dom";
import './index.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifRecords: [],
            searchKeyword: '',
            displayKeyword: '',
            selectedGif: {},
        }
    }

    componentDidMount() {
        const { q } = queryString.parse(this.props.location.search);
        if (q) {
            this.searchGif(q);
        } else {
            this.getTrending();
        }
    }

    searchGif = (q) => {
        console.log({ q });
        apiCall('/search', { q })
            .then(({ data }) => {
                this.setState({
                    gifRecords: data,
                    displayKeyword: q,
                    searchKeyword: q,
                })
            })
    }

    getTrending = () => {
        apiCall('/trending')
            .then(({ data }) => {
                this.setState({
                    gifRecords: data,
                    displayKeyword: '',
                })
            })
    }

    onSearchClick = () => {
        const { searchKeyword } = this.state;
        this.props.history.push('/?q=' + searchKeyword)
        this.searchGif(searchKeyword);
    }

    onSearchChange = (e) => {
        this.setState({ searchKeyword: e.target.value });
    }

    render() {
        const { gifRecords, displayKeyword } = this.state;
        return (
            <div>
                <div className='search'>
                    <input
                        type='text'
                        onChange={this.onSearchChange}
                        className='search__input'
                        value={this.state.searchKeyword}
                    />
                    <button
                        onClick={this.onSearchClick}
                        className='search__button'
                    >
                        Search
                    </button>
                </div>
                <div className='gif-grid'>
                    <span className='title'>
                        {displayKeyword ? `showing results for ${displayKeyword}` : 'Trending GIFs'}
                    </span>
                    {gifRecords && gifRecords.map(gif => (
                        <Link
                            key={gif.id}
                            to={`/details/${gif.id}`}
                        >
                            <Gif
                                original={gif.images.original.url}
                                still={gif.images.downsized_still.url}
                                alt={gif.title}
                                style={{
                                    width: 300,
                                    margin: 10,
                                }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(Home);