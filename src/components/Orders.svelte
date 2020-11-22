<script>
  import { onMount } from 'svelte'
  
  export let grid
  let ordersArr = [
    {
        "slug": "pending",
        "name": "Pending payment",
        "total": 7
    },
    {
        "slug": "processing",
        "name": "Processing",
        "total": 5
    },
    {
        "slug": "on-hold",
        "name": "On hold",
        "total": 1
    },
    {
        "slug": "completed",
        "name": "Completed",
        "total": 72
    },
    {
        "slug": "cancelled",
        "name": "Cancelled",
        "total": 1
    },
    {
        "slug": "refunded",
        "name": "Refunded",
        "total": 2
    },
    {
        "slug": "failed",
        "name": "Failed",
        "total": 1
    }
]

  const handler = async () =>
    await fetch("/.netlify/functions/orders", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then((res) => {
      // ordersArr = res.msg
    })

    onMount(() => {
      handler();
    });
</script>

<div class="component" style="grid-area:{ grid };">
  <h2>Orders</h2>
  {#each ordersArr as total}
    <div class="total">
      <h3>{ total.name }: <span>{ total.total }</span></h3>
    </div>
  {/each}
</div>

<style>
  .total {
    text-align: left;
    padding-left: 1rem;
  }
</style>