<template>
  <div class="mainPage">
  <h1>Stocks {{ stock_name }}</h1>

    <div class="row" v-if="loaded">
   

    <div class="col-md-5 ml-10">
      <b-table id="mytable" sticky-header fix hover :items="stocks" :fields="fields" primary-key="_id" @row-clicked="handleRowClick" :per-page="10">
        <template #cell(updated_at)="data">
         <timeago :datetime="data.item.updated_at"></timeago>
      </template>
      </b-table>
    </div>

    <div class="col-md-5">
      <toggle-switch :options="switchOptions" @change="updateSwitch($event.value)"/>
      <line-chart  :chartData="chartdata" :options="options"></line-chart>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from "socket.io-client";
var socket = io.connect("http://localhost:4000");

export default {
  name: 'mainPage',
  props: {
    msg: String
  },
  data() {
    return {
      url: 'http://localhost:4000',
      switchValue:'',
      stock_name:'',
      stocks:[],
      fields:[],
      loaded:'',
      stock: '',
      ChartOptionsBar: {},
      stockprice: '',
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Yearly',
            data: [40, 20]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      switchOptions: {
        size: {
          fontSize: 1,
        },
        items: {
          delay: .4,
          preSelected: 'Yearly',
          disabled: false,
          labels: [
            {name: 'Monthly', color: 'white', backgroundColor: 'green'}, 
            {name: 'Yearly', color: 'white', backgroundColor: 'green'}
          ]
        }
      }
    }
  },
  mounted() {
    this.listStocks();
    this.subscribe();
  },
  computed: {
        chartData: function() {
            return this.chartdata;
        }
    },
 methods: {
    listStocks() {
      axios.get(this.url + '/stocks?type=' + this.switchValue)
      .then(res => {
        this.stocks = res.data;
        this.fields = ['name','price','updated_at'];
        this.loaded = true;
      })
      .catch(err => console.log(err));
    },
    handleRowClick(record){
      this.stock_name = record.name;
      axios.get(this.url + '/stocks/' + record._id + '?type=' + this.switchValue)
      .then(res => {
        console.log('data received :' , res.data)
        this.chartdata = res.data;
      })
      .catch(err => console.log(err));

    },
    updateSwitch(value) {
      this.switchValue = value;
    },
    subscribe() {
      socket.on("newdata", fetchedData => {
        //console.log('socket data :',fetchedData);
        this.stocks = fetchedData;
      })
    },
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

stock_name {
  padding: 10px;
  
}
</style>