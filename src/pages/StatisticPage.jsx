import React, { Component } from 'react'
import BitcoinChart from '../cmps/Chart'
import { Sparklines, SparklinesLine } from 'react-sparklines';


export class StatisticPage extends Component {

  state = {
    sampleData: []
  }

  async componentDidMount() {
    const response = await fetch(
      'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'
    );
    const data = await response.json();
    const sampleData = [1, 5];
    data.values.forEach((value) => sampleData.push(value.y));
    this.setState({ sampleData });
  }

  render() {
    return (
      <div>
        <BitcoinChart />
        <Sparklines data={this.state.sampleData} width={100} height={20}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    )
  }
}

export default StatisticPage;
