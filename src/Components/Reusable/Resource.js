import React, { Component } from "react";
import Axios from "axios";
import fetch from 'node-fetch'
import qs from 'qs'

export default class Resource extends Component {
  state = {
    loading: true,
    error: false,
    payload: "",
  };

  static defaultProps = {
    url: "",
    params: {},
    method: 'get'
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url != this.props.url) {
      this.fetchData()
    }
  }

  fetchData = async () => {
    let { url, params, method } = this.props;
    method = method.toLowerCase()

    this.setState({ loading: true });
    try {
      let { data } = await Axios[method](url, params);

      this.setState({ payload: data, loading: false, error: false })
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    return this.props.children({ ...this.state, refetch: this.fetchData });
  }
}
