import { LitElement, html, css } from "lit";
import { Chart } from "chart.js/auto";

export class MyChart extends LitElement {
  static get properties() {
    return {
      myChart: { type: Object },
      chartType: { type: String, reflect: true },
      label: { type: String, reflect: true },
      myStoredUsers: { type: Array },
      myLabels: { type: Array, reflect: true },
      myData: { type: Array, reflect: true },
      username: { type: String, reflect: true },
      totalCoinResult: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    this.chartType = "pie";
    this.label = "Kies een label";
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.username = localStorage.getItem("name");
    this.totalCoinResult;
    this.getChartData();
    this.getChartLabels();
  }

  connectedCallback() {
    super.connectedCallback();
    this.firstUpdated();
    this.getTotalCoin();
    // this.getChartData();
    // this.getChartLabels();
    this.myLabels.push("Total");
    this.myData.push(this.totalCoinResult);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.firstUpdated();
    this.getTotalCoin();
    // this.getChartData();
    // this.getChartLabels();
    this.myLabels.push("Total");
    this.myData.push(this.totalCoinResult);
  }

  getChartData() {
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        this.myData = user.coins.map((coin) => {
          return (coin.price = coin.price);
        });
      }
    });
  }
  getChartLabels() {
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        this.myLabels = user.coins.map((coin) => {
          return (coin.coinName = coin.coinName);
        });
      }
    });
  }
  getTotalCoin() {
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        return (this.totalCoinResult = user.coins.reduce((total, item) => {
          return total + parseInt(item.price);
        }, 0));
      }
    });
  }

  firstUpdated() {
    const MyCustomChart = this.renderRoot.querySelector("#customChart");
    this.myChart = new Chart(MyCustomChart, {
      type: this.chartType,
      data: {
        labels: this.myLabels,
        datasets: [
          {
            label: this.label,
            data: this.myData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Your Crypto Balance is ${this.totalCoinResult} `,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  static get styles() {
    return css`
      .myChart {
        width: 400px;
        height: auto;
        float: left;
        margin: 10px;
        padding: 5px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
    `;
  }

  render() {
    return html`
      <div class="myChart">
        <canvas id="customChart" ${this.chartType} ${this.label}> </canvas>
      </div>
    `;
  }
}

customElements.define("my-chart", MyChart);
