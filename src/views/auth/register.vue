<template>
  <div class="signup-form">
    <form @submit.prevent="submitForm">
      <div class="form-header">
        <h2>Sign Up</h2>
        <p>Fill out this form to register!</p>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" name="name" required="required" placeholder="Enter your name" v-model="form.name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" name="email" required="required" placeholder="Enter your email" v-model="form.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password" required="required" placeholder="Enter your password" v-model='form.password'>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password_confirmation" required="required" placeholder="Enter confirm password" v-model='form.password_confirmation'>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-sm btn-secondary text-left" :disabled="!isChanged" @click="resetForm">Clear</button>
        <button type="submit" class="btn btn-primary btn-sm text-right" :disabled="isUnfilled">Register</button>
      </div>
    </form>
    <div class="text-center small">Already have an account?
      <router-link to="login">Login here</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'register',
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
     * @return void
     */
    submitForm: async function () {
      this.request('post', 'register', this.form, (response) => {
        if (response.success) {
          this.$router.push('login')
          this.notify().success('Yay! You are successfully registered')
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
     * @return {{password: null, name: null, email: null, password_confirmation: null}}
     */
    initialForm: function () {
      return {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  }
}
</script>
