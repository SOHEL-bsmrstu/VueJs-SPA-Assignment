<template>
  <div class="signup-form">
    <form @submit.prevent="submitForm">
      <div class="form-header">
        <h2>Create A Product</h2>
        <p>Fill out this form to create a product!</p>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" required placeholder="Enter product title" v-model="form.title">
      </div>
      <div class="form-group">
        <input type="number" class="form-control" required placeholder="Enter product price" v-model="form.price">
      </div>
      <div class="form-group">
        <textarea class="form-control" required placeholder="Enter product description" v-model='form.description'></textarea>
      </div>
      <div class="form-group">
        <input type="file" class="form-control" required @change="handleProductImageUpload($event)">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-sm btn-secondary text-left" :disabled="!isChanged" @click="resetForm">Clear</button>
        <button type="submit" class="btn btn-primary btn-sm text-right" :disabled="isUnfilled">Create</button>
      </div>
    </form>
  </div>
</template>
<script>

export default {
  name: 'product-create',
  data: function () {
    return {
      isChanged: false,
      isUnfilled: true,
      form: this.initialForm()
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        this.formChanged()
      }
    }
  },
  methods: {
    /**
     * @param event
     * @return void
     */
    handleProductImageUpload: function (event) {
      this.form.image = event.target.files[0]
    },
    /**
     * @return void
     */
    submitForm: async function () {
      let data = new FormData()
      data.append('title', this.form.title)
      data.append('price', this.form.price)
      data.append('image', this.form.image)
      data.append('description', this.form.description)

      this.request('post', 'products/create', data, (response) => {
        if (response.success) {
          this.$router.push({ name: 'products' })
          this.notify().success('Yay! You are successfully create a product')
        } else {
          this.notify().error('Oops! Something went wrong')
        }
      })
    },
    /**
     * Check whether something in the form has been changed
     */
    formChanged: function () {
      this.isChanged = true
      this.isUnfilled = false
      let form = Object.entries(this.form)
      // eslint-disable-next-line no-unused-vars
      for (let [name, value] of form) {
        if (this.empty(value)) {
          this.isUnfilled = true
          break
        }
      }
    },
    /**
     * Reset form data
     * @return void
     */
    resetForm: function () {
      this.isChanged = false
      this.isUnfilled = true
      this.form = this.initialForm()
    },
    /**
     *
     * @return {{image: null, price: null, description: null, title: null}}
     */
    initialForm: function () {
      return {
        title: null,
        price: null,
        image: null,
        description: null
      }
    }
  }
}
</script>
