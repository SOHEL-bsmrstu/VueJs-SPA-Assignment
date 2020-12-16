<template>
  <div class="limiter">
    <div class="container pt-5">
      <div class="wrap-table100">
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1"></th>
                  <th class="cell100 column2">Title</th>
                  <th class="cell100 column3">Price</th>
                  <th class="cell100 column4">Description</th>
                  <th class="cell100 column4">Created At</th>
                  <th class="cell100 column5"></th>
                </tr>
              </thead>
            </table>
          </div>

          <div class="table100-body">
            <table>
              <tbody>
                <tr class="row100 body" v-for="(product, key) in products.data" :key="key">
                  <td class="cell100 column1 text-left">
                    <img :src="product.link" alt="thumbnail" width="45" height="45">
                  </td>
                  <td class="cell100 column2 text-left">{{ truncate(product.title, 15) }}</td>
                  <td class="cell100 column3 text-left">{{ number_format(product.price, 2) }}</td>
                  <td class="cell100 column4 text-left">{{ truncate(product.description, 15) }}</td>
                  <td class="cell100 column4 text-left">{{ product.created_at }}</td>
                  <td class="cell100 column5 text-right text-center">
                    <router-link class="btn btn-primary btn-circle btn-sm" :to="'products/' + product.id +'/edit'"><i class="fa fa-pencil text-white"></i></router-link>
                    <button class="btn btn-danger btn-circle btn-sm" type="button" @click="deleteData(product.id)"><i class="fa fa-trash"></i></button>
                  </td>
                </tr>
                <tr class="row100 body" v-if="emptyData()">
                  <td class="cell100" colspan="6">
                    <div class="text-center m-5"><h4 class="font-weight-bold">No Records Found!</h4></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="align-items-center justify-content-between mt-5">
        <div>
          <div class="align-items-center">
            <span class="m-datatable__pager-detail" v-if="!emptyData()">
                     Displaying {{ products.meta.first }} - {{ products.meta.last }} of {{ products.meta.total }} records
                  </span>
          </div>
        </div>
        <paginate :meta="products.meta" @page-change="changePage"></paginate>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from '../../helpers/pagninate'

export default {
  name: 'product-manage',
  components: { Paginate },
  data: function () {
    return {
      products: {
        data: {},
        meta: {}
      },
      currentPage: 1
    }
  },
  methods: {
    /**
     * Fetch product list
     * @return void
     */
    fetchRecords: function () {
      this.request('get', 'products', { page: this.currentPage }, (response) => {
        if (response.success) {
          this.products.meta = response.meta
          this.products.data = response.data
        }
      })
    },
    /**
     * @param id
     * @return void
     */
    deleteData: function (id) {
      this.confirm(() => {
        let path = 'products/' + id + '/delete'
        this.request('delete', path, null, (response) => {
          if (response.deleted) {
            this.fetchRecords()
            this.notify().success('Yay! 1 product has been successfully deleted')
          } else {
            this.notify().error('Oops! Something went wrong')
          }
        })
      })
    },
    /**
     * Check if there is any data?
     */
    emptyData: function () {
      return (this.products.data.length < 1)
    },
    /**
     * Handle page change request
     * @param page
     */
    changePage: function (page) {
      this.currentPage = page
      this.fetchRecords()
    }
  },
  mounted: function () {
    this.fetchRecords()
  }
}
</script>
