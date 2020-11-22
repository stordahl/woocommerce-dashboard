<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  export let grid

  let ctx 
  let totalSalesChart

  // let average_sales
  let net_sales = 8000.57
  let total_customers = 81
  let total_orders = 89
  let total_sales = 1054.68
  let total_shipping = 196.13
  let total_tax = 50.73
  let expense = total_tax + total_shipping;
  let adjusted_sales = total_sales - expense;

  

  const handler = async () =>
    await fetch("/.netlify/functions/sales", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then((res) => {
      // average_sales  = res.msg[0].average_sales
      // net_sales = res.msg[0].net_sales
      // total_customers = res.msg[0].total_customers
      // total_orders = res.msg[0].total_orders
      // total_sales = res.msg[0].total_sales
      // total_shipping = res.msg[0].total_shipping
      // total_tax = res.msg[0].total_tax
  })

  onMount( () => {
    handler();

    const data = {
      labels: [
          'Total Shipping',
          'Total Tax',
          'Adjusted Sales'
        ],
        datasets: [{
          label: 'USD',
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
          ],
          data: [total_shipping, total_tax, adjusted_sales]
        }],
    };
    const options = {
      scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            }
        }]
      }
    };

    totalSalesChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });
  });
</script>

<div class="component" style="grid-area:{ grid };">
  <h2>net sales: { net_sales }</h2>
  <h3>You've sold <strong>${ total_sales }</strong>, from { total_orders } orders by { total_customers } customers</h3>
  <canvas bind:this={ctx}>{ totalSalesChart }</canvas>
</div>

<style>
  canvas {
    transform: scale(0.9);
  }
</style>